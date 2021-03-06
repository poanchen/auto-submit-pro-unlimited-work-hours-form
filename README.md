# auto-submit-pro-unlimited-work-hours-form

A custom script that will automate the process of filling out and submission of the [pro-unlimited WAND work hours form](https://prowand.pro-unlimited.com/login.html). (In [here](https://www.quora.com/What-software-or-script-have-you-created-that-made-a-difference-to-your-co-workers/answer/PoAn-Baron-Chen-1), I briefly talked about how this script will save my co-workers ~130 minutes of their time every month)

## Why is this useful?

Filling out the work hours form can be a pain in the ass as it is very repetitive. A way to automate this would be really helpful (As a programmer, I am always looking for a way to automate the repetitive tasks). This script will do all the hard/repetitive/hideous work for us.

# Getting Started

## Installation

CasperJS can be installed on Mac OSX, Windows and most Linuxes. Please head over [here](http://docs.casperjs.org/en/latest/installation.html) to install CasperJS. The source code are provided in two format (zip and tar.gz), please download the [files](https://github.com/poanchen/auto-submit-pro-unlimited-work-hours-form/releases) to your computer to start your automated journey.

## Environment
Tested on Windows 10, OS X 10.11 El Capitan, and Ubuntu 14.04.X LTS Server.

## Usage

You can pass your username and password as parameter when you run the script, like this

```
casperjs script.js --username=username --password=password
```

Or, to enable debugging mode

```
casperjs script.js --username=username --password=password --g
```

Another way to set your username and password is to use environment variables, like this

```
# used in `script.js`
PROUNLIMITED_USERNAME=admin@example.com
PROUNLIMITED_PASSWORD=password

# used in `sendEmail.py`
GMAIL_USERNAME=example@gmail.com
GMAIL_PASSWORD=password
```

If you need help setting up the environment variables, links here should help you. [Windows](https://superuser.com/questions/949560/how-do-i-set-system-environment-variables-in-windows-10), [Mac OSX](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion), and [Linux](https://www.cyberciti.biz/faq/set-environment-variable-linux/).

Now, with the environment variables set up, you may run the script like this,

```
casperjs script.js
```

Or, to enable debugging mode

```
casperjs script.js --g
```

## Cron jobs

```sh
# Runs `script.js` on every friday at 3:00PM and send an email to the user. (pass username and password 
# as parameter)
0 15 * * 5 sudo casperjs /path/to/script.js --username=username --password=password --g > 
/path/to/auto-submit-pro-unlimited-work-hours-form.log; python /path/to/sendEmail.py >> 
/path/to/auto-submit-pro-unlimited-work-hours-form.log

# Runs `script.js` on every friday at 3:00PM and send an email to the user. (use environment variables)
0 15 * * 5 sudo casperjs /path/to/script.js --g > 
/path/to/auto-submit-pro-unlimited-work-hours-form.log; python /path/to/sendEmail.py >> 
/path/to/auto-submit-pro-unlimited-work-hours-form.log
```
Hint: Use command 'crontab -e' to modify your cron jobs.

## Note
In default, work hours will be set to start from 8:45AM to 4:45PM with no lunch break for everyday except Saturday and Sunday. In addition, once the script is completed, a screenshot of the result will be saved along with the script.

## Next steps/ideas
* Instead of having the default time everyday, user should have the ability to customized their time for every single day.
* Ability to skip statutory holidays for Canada and USA. (statutory holidays should be getting from a API endpoint)
* Ability to skip a specific days or weeks. (useful for company-wide holidays with no pay)
* Ability to select Req# instead of the default one (first one) using paramter like --req=123456789.
