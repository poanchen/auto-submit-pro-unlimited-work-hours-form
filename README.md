# auto-submit-pro-unlimited-work-hours-form
Custom script to automatically submit the pro-unlimited work hours form.

## Why is this useful?
Filling out the work hours form can be a pain in the ass. A way to automate this would be really helpful. This script will do all the hard work for us.

## Installation

CasperJS can be installed on Mac OSX, Windows and most Linuxes. Please head over [here](http://docs.casperjs.org/en/latest/installation.html) to install CasperJS.
```
git clone https://github.com/poanchen/auto-submit-pro-unlimited-work-hours-form.git
cd auto-submit-pro-unlimited-work-hours-form
```

## Usage

```
casperjs script.js username password
```

Or, to enable debugging mode

```
casperjs script.js username password --g
```

## Cron jobs

```sh
# Runs `script.js` on every friday at 3:00PM and send an email to the user.
0 15 * * 5 sudo casperjs /path/to/script.js username password --g > 
/path/to/auto-submit-pro-unlimited-work-hours-form.log; python /path/to/sendEmail.py >> 
/path/to/auto-submit-pro-unlimited-work-hours-form.log
```

## Note
In default, work hours will be set to start from 8:45AM to 4:45PM with no lunch break for everyday except Saturday and Sunday. In addition, once the script is completed, a screenshot of the result will be saved along with the script.

## Next steps/ideas
* Instead of having the default time everyday, user should have the ability to customized their time for every single day.
* Added the ability to promote user input for their username and password to improve the security.
