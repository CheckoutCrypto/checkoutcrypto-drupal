#!/bin/bash
clear

siteDir="/var/www/site"

# CheckoutCrypto Menu
Exit=0
until [ $Exit -eq 1 ]; do

echo "CheckoutCrypto Menu"
echo " Choices:"
echo "         1)  Install Drush"
echo "         2)  Install Drupal quick"
echo "         3)  Download Dependency Modules"
echo "		   4) Install Dependency Modules"
echo "         5)  Read Configure Guide"
echo " 			6) Exit"
read choice


case $choice in

#check if drush is installed - if not install
1)

type drush >/dev/null 2>&1 && echo "Drush installed." || sudo apt-get install drush

;;

#drush install quick site - change site to whatever you prefer
2)
echo "Enter the site directory to install to e.g. /var/www/site"
read siteDir
sudo mkdir $siteDir
cd $siteDir

echo "you are about to install drupal in this present directory. \n Hit y to all the questions. If it fails to install that database, don't worry, you can configure it after. "

echo "\n press any key to continue"  
read choice

sudo drush core-quick-drupal
sudo cp ./quick-drupal-*/drupal/* . -R
cd ./sites/default/
sudo rm settings.php
sudo cp default.settings.php ./settings.php
sudo chmod 777 $siteDir/sites/default/files
sudo chmod 777 $siteDir/sites/default/settings.php

echo "\n\n\n visit https://yoursite/install.php to setup the database configuration n\n\n"

;;

# git clone repository
3)
echo "Checking if git is installed........."

type git >/dev/null 2>&1 && echo "Git installed." || sudo apt-get install git

echo "Downloading the CheckoutCrypto Drupal dependencies to your home folder"
cd ~
git clone https://github.com/CheckoutCrypto/checkoutcrypto-drupal
;;

4)
echo "Do you want to use a different site directory[y/n] ? \n (Hint: If you didn't install drupal using drush in previous menu steps, use this option)"
read newsiteChoice
 if [ $newsiteChoice = "y" ]
         then
                echo "Enter the site directory to install to e.g. /var/www/site"
				read siteDir
fi

for i in ./checkoutcrypto-drupal/ccStore_extend/ccStore_modules/*.tar.gz; do sudo tar xvzf $i  -C  $siteDir/sites/all/modules; done
for i in ./checkoutcrypto-drupal/ccStore_extend/ccStore_theme/*.tar.gz; do sudo tar xvzf $i  -C  $siteDir/sites/all/themes; done

;;
5) sudo tail -n 200 ~/checkoutcrypto-drupal/README.md

;;


6) Exit=1 ;;
esac
done

