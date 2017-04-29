# auto-submit-pro-unlimited-work-hours-form
Custom script to automatically submit the pro-unlimited work hours form.

## Why is this useful?
Filling the work hours form can be a pain in the ass. A way to automate this would be really nice. This script will do all the hard work for us.

## Installation

CasperJS can be installed on Mac OSX, Windows and most Linuxes. Please head over [here](http://docs.casperjs.org/en/latest/installation.html) to install CasperJS.
```
git clone https://github.com/poanchen/auto-submit-pro-unlimited-work-hours-form.git
cd auto-submit-pro-unlimited-work-hours-form
```

## Usage

```
casperjs script.js yourUsername yourPassword
```

Or, to enable debugging mode

```
casperjs script.js yourUsername yourPassword --g
```

## Note
In default, work hours will be set to start from 8:45AM to 4:45PM with no lunch break for everyday except Saturday and Sunday. In addition, once the script is completed, a screenshot of the result will be saved along with the script.
