# iCn3D menu_parser

## Getting Started
The purpose of this project is to create a simple and convenient method of identifying all the menu items in iCn3D to create a custom menu configuration file. When everything is downloaded and ready to go, run an instance of iCn3D on your local server and simply run the program.

## Prerequisites
* Python
* selenium
* bs4
* Chrome webdriver

## Installing
Head over to [Python.org](https://www.python.org/) to download the latest version of Python if you haven't already. Make sure to enable pip in  `Optional Features` when installing. After installing, head over to Advanced System Settings -> Environment Variables and add Python into PATH. 
* This instance of selenium webdriver uses Chrome
* To install selenium - run `pip3 install selenium`
* To install bs4 - run `pip3 isntall bs4`
* From `https://chromedriver.chromium.org/downloads` install the current version of Chrome you have on your computer
* If you don't have Chrome - `https://www.google.com/chrome/`
  * On macs install in a path that is in your enviroment - eg. /usr/bin, /usr/local/bin or Users/username/bin (if in ENV PATH)
  * Make sure that The version of Chrome matches the version of the webdriver otherwise you will get an error
  * On Mac OS you may get a "chromedriver” cannot be opened because the developer cannot be verified. Unable to launch the chrome browser" error. To fix run: `xattr -d com.apple.quarantine /$PATH/chromedriver` 
  * In my case this was `xattr -d com.apple.quarantine /Users/todd/bin/chromedriver`
 
## Running
Add the script to the directory with the web files <br>
First need an http server running, NPM http-server is best <br>
http-server & <br>
hit return to get the commmand line <br>
then run menuparser.py <br>
python menuparser.py


## Built With
* Python
* selenium
* bs4
* Chrome webdriver
  
## Authors
th3linja
