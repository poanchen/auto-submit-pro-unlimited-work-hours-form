var casper = require('casper').create();

// make sure to turn on the debugger if the user wants them
if (casper.cli.get('g')) {
  casper.options.verbose = true;
  casper.options.logLevel = 'debug';
}

// dev mode only
casper.on('remote.message', function(msg) {
  this.echo('remote message caught: ' + msg);
});

var username;
var password;

if (casper.cli.has(0)) {
  username = casper.cli.get(0);
  if (casper.cli.has(1)) {
    password = casper.cli.get(1);
  } else {
    casper.echo("No password passed, aborting...").exit();
  }
} else {
  casper.echo("No username passed, aborting...").exit();
}

var proUnlimitedLoginPageUrl = "https://prowand.pro-unlimited.com/login.html";

casper.start(proUnlimitedLoginPageUrl);

// fill out the login form
casper.waitForSelector('form[method="post"]', function() {
  this.fillSelectors('form[method="post"]', {
    'input[name="username"]': username,
    'input[name="password"]': password
  }, true);
}, function usernameOrPasswordSeemsToBeInvalid() {
  this.echo("pro-unlimited website is not available, aborting...").exit();
});

// wait till the billing type dropdown to show up
casper.waitForSelector('select[id="selectedBillingType"]', function() {
  this.evaluate(function() {
    // select time in billing type dropdown
    var billingTypeDropdown = document.querySelector('select[id="selectedBillingType"]');
    billingTypeDropdown.selectedIndex = 1;
  });
}, function usernameOrPasswordSeemsToBeInvalid() {
  this.echo("Invalid username/password, aborting...").exit();
});

// wait till the data range dropdown to show up
casper.waitForSelector('select[id="dateRangeString"]', function() {
  this.evaluate(function() {
    // select latest date in data range dropdown
    var dataRangeDropdown = document.querySelector('select[id="dateRangeString"]');
    dataRangeDropdown.selectedIndex = 1;
  });
  // submit the form to get to the edit work hours page
  this.click('div#addNewDiv a');
});

casper.then(function() {
  this.waitForUrl(/cntrl_time_create_edit_hourly-4\.html/, function() {
    this.evaluate(function() {
      document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.startHourM"]').selectedIndex = 1;
      document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.endHourM"]').selectedIndex = 2;
      document.querySelector('input[id="billingDetailItems4.noBreakTaken1"]').checked = true;
    });
    // this.fillSelectors('form[method="post"]', {
    //   'select[id="billingDetailItems4.billingTimeSpans0.startHourM"]': '1',
    //   'select[id="billingDetailItems4.billingTimeSpans0.endHourM"]': '2',
    //   'input[id="billingDetailItems4.noBreakTaken1"]': true
    // }, false);
    // submit the edit work hours form
    this.evaluate(function() {
      document.querySelectorAll('input.gray-button')[1].click();
    });
    // this is not the best way of doing it
    this.wait(2000, function() {
      this.viewport(1000, 1080);
      this.capture('./screenshot.png', {top: 0,left: 0,width: 1000, height: 2000});
    })
  });
});

casper.run();
