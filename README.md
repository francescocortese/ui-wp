# ui-wp SCSS



# scss-starter-pack
SCSS Starterkit working with scss, gulp, browsersync, gulp-file-include. Version 2.0

### Main Dependencies
* browser-sync
* gulp
* gulp-file-include
* gulp-sass
* gulp-uglify
* stylelint
* autoprefixer
* gulp-cssmin

## Quick Start

First, make sure that you have installed Node.js, npm and gulp globally:

### Install Node.js and npm
https://nodejs.org/en/


### Install Gulp
```shell
npm install --global gulp
```
### Install

Set the var pathProject in gulpfile.js
Set the var ThemeName in gulpfile.js
Set the var port (the same of MAMP localhost) es.: 8888

gulp ui for UI
gulp wp for wordpress

run together cmd+t on terminal

For installation, clone or download the package and open the terminal to run:
```shell

# Go to the root folder of your project, or just type cd, space and drag n drop the folder in terminal
cd /main-folder-of-your-project

# Install browserSync and all the node dependencies that we need
npm install

# Start the gulp task and browserSync
npm start

# Gulp run generate the front-end/UI folder and run browserSync
gulp ui

# Gulp run generate the wordpress theme folder and run browserSync
gulp wp

```
* run together cmd+t on terminal
* The folder ./assets/js/ is just for compile and build the file plugins.js and main.js. For other plugins or scripts, put .js files into the ./ui/build/js/ and ./theme-name/js/

### Gulp file inlcude
You can include files thanks to gulp-file-include for UI. All the included files are in the ./ui/inc folder.
``` html
<!-- just put this code inside your .html files -->
@@include('inc/_name-file.html')
```

### Stylelint
Stylelint is included for SCSS. You can install on your own editor via this guide:
https://stylelint.io/user-guide/complementary-tools/#editor-plugins

### Other documentation
* BrowserSync: https://www.browsersync.io/
* SCSS: https://sass-lang.com/guide
* Stylelint: https://stylelint.io/
* BEM CSS: http://getbem.com/introduction/
