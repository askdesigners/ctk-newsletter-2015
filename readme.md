
# CTK Newsletter for 2015

Created by Askdesigners.

Built with Wintersmith.

___

## Deployment instructions

The directory `/build` contains all the built files which are ready to be deployed in their final location. This directory is the root directory of the site. Do not deploy anything but that directory.
Please double check that all the links and images are working correctly, as we are not able to fully test them without access to the production server. 

*Please note that there is a `.htaccess` file in that directory that has caching disabled. This is for development and most likely should not be deployed to production. Use your own judgement.*

___

## Making updates

All source files for the site are in the `/contents` directory, and can be built using the static site generator [Wintersmith](http://wintersmith.io/). 

Install Wintersmith, and run the command `wintersmith build` to compile the files. 

___

## Support  

If you have any issues please dont hesitate to mail me at ryan@askdesigners.eu