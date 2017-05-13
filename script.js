var casper = require('casper').create();
var env    = require('system').env;
var fs     = require('fs');

// make sure to turn on the debugger if the user wants them
if (casper.cli.get('g')) {
  casper.options.verbose = true;
  casper.options.logLevel = 'debug';

  // dev mode to broadcast the console.log error message
  casper.on('remote.message', function(msg) {
    this.echo("remote message caught: " + msg);
  });
}

var username = env['PROUNLIMITED_USERNAME'];
var password = env['PROUNLIMITED_PASSWORD'];

if (casper.cli.get('username')) {
  username = casper.cli.get('username');
} else if (username == null) {
  casper.echo("No username passed, aborting...");
  this.exit();
}

if (casper.cli.get('password')) {
  password = casper.cli.get('password');
} else if (password == null) {
  casper.echo("No password passed, aborting...");
  this.exit();
}

if (casper.cli.get('file')) {
  // seems like user would like to have customized work hours
  var fileContents = fs.read(casper.cli.get('file')).split('\n');
  var timeInLines = [];

  for (var i = 0; i < fileContents.length; i++) {
    var line = fileContents[i].split(',');
    timeInLines.push({
      MS: line[0],
      ME: line[1],
      LS: line[1],
      LE: line[2],
      AS: line[2],
      AE: line[3]
    });
  }
}

casper.start("https://prowand.pro-unlimited.com/login.html");

// fill out the login form
casper.waitForSelector('form[method="post"]', function() {
  this.fillSelectors('form[method="post"]', {
    'input[name="username"]': username,
    'input[name="password"]': password
  }, true);
}, function proUnlimitedWebsiteIsNotAvailable() {
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

    // submit the form to get to the edit work hours page
    document.forms[0].action='/worker/standard/standard_home.html?_finish&_page=0';
    document.forms[0].submit();
  });
});

casper.then(function() {
  this.waitForUrl(/cntrl_time_create_edit_hourly-4\.html/, function() {
    if (casper.cli.get('file') == undefined) {
      var workHours = {};
      for (var i = 0; i < 5; i++) {
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.startHourM"]'] = '8';
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.startMinute"]'] = '45';
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.startMeridiem"]'] = '0';
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.endHourM"]'] = '4';
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.endMinute"]'] = '45';
        workHours['select[id="billingDetailItems' + i + '.billingTimeSpans0.endMeridiem"]'] = '1';
        workHours['input[id="billingDetailItems' + i + '.noBreakTaken1"]'] = true;
      }
      // fill out the edit work hours form
      this.fillSelectors('form[method="post"]', workHours, false);
    } else {
      // this is for customized work hours
      // this.evaluate(function() {
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.startHourM"]').selectedIndex = 8;
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.startMinute"]').selectedIndex = 45;
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.startMeridiem"]').selectedIndex = 1;
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.endHourM"]').selectedIndex = 4;
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.endMinute"]').selectedIndex = 45;
      //   document.querySelector('select[id="billingDetailItems4.billingTimeSpans0.endMeridiem"]').selectedIndex = 2;
      //   document.querySelector('input[id="billingDetailItems4.noBreakTaken1"]').checked = true;
      // });
    }

    // submit the edit work hours form
    this.evaluate(function() {
      document.querySelectorAll('input.gray-button')[1].click();
    });

    // take a screenshot of the edit work hours submitted form
    this.waitForUrl(/\?\_page=0\&\_target2/, function() {
      this.viewport(1000, 1080);
      this.capture('./screenshot_' + new Date().getTime() + '.png', {top: 0,left: 0,width: 1000, height: 2000});
    });
  });
});

casper.run();
