---
date: 2013-06-20
slug: multiple-php-versions-arch-linux-php-fpm-nginx
title: Multiple PHP versions on Arch Linux with php-fpm and Nginx
tags:
- arch linux
- nginx
- php
---

This document will help in installing multiple PHP versions on Arch Linux when you have PHP 5.4 or the latest PHP installed through Pacman.





PHP 5.4 is the default version available in Arch Linux's repositories. If your PHP applications do not work properly with PHP 5.4, e.g., for Drupal 7 as of now, you would need PHP 5.3. There is a PHP5.3 build in the [AUR](https://aur.archlinux.org/), but I've personally found building PHP5.3 from source is more sustainable and can be better customized to your needs.





This setup uses [PHP-FPM](http://php-fpm.org) and [Nginx](http://wiki.nginx.org) as mentioned in the [Arch Wiki page for Nginx](https://wiki.archlinux.org/index.php/Nginx). It can be extended to cover multiple different PHP versions operating simultaneously.
<!-- more -->





For this piece, we will cover installing PHP 5.3.26, currently the "old stable" release of PHP. Here is how I did it:





## Overview





There are three main steps involved in installing multiple PHP versions:







  1. Compile PHP from source,


  2. Configure PHP-FPM and PHP-FPM's systemd script, and


  3. Configure Nginx to use the newly installed PHP-FPM's connection socket.





## Prerequisites





PHP 5.3.26 complete source code can be downloaded in either [tar.bz2](http://php.net/get/php-5.3.26.tar.bz2/from/a/mirror) or in [tar.gz](http://php.net/get/php-5.3.26.tar.gz/from/a/mirror) format from the [PHP downloads](http://php.net/downloads.php) page.





Compiling PHP from source needs automake, autoconf, libtool, re2c, flex, bison, along with an ANSI C compiler and any custom modules like GD etc installed as mentioned [here](http://www.php.net/manual/en/install.unix.php). For Arch Linux, the `base-devel` package provides most of these tools. The rest need to be installed manually. Assuming MySQL/Mariadb, GD library etc are installed, the build toolchain can be installed using:





    # pacman -S base-devel re2c






## Compile PHP





Extract the archive and proceed with configure. Let us assume the archive has been extracted to `~/build/php/php-5.3.26/`. We have two important considerations here:





  * We will need to provide a custom `--prefix` path to PHP so that the new version is installed in a separate directory so that it doesn't interfere with existing PHP versions.


  * To make our compiled version of PHP work with PHP-FPM, we shall need to configure it with the `--enable-fpm` flag.




For this example, we will install PHP 5.3.26 to `/usr/local/php/php5.3.26`. Also, I need MySQL, cURL, mbstring for my development. So here is the configure command I used:





    $ ./configure \
    --prefix=/usr/local/php/php5.3.26 \
    --with-zlib-dir \
    --with-freetype-dir \
    --enable-mbstring \
    --with-libxml-dir=/usr \
    --enable-soap \
    --enable-calendar \
    --with-curl \
    --with-mcrypt \
    --with-zlib \
    --with-gd \
    --disable-rpath \
    --enable-inline-optimization \
    --with-bz2 \
    --with-zlib \
    --enable-sockets \
    --enable-sysvsem \
    --enable-sysvshm \
    --enable-pcntl \
    --enable-mbregex \
    --with-mhash \
    --enable-zip \
    --with-pcre-regex \
    --with-mysql \
    --with-pdo-mysql \
    --with-mysqli \
    --with-jpeg-dir=/usr \
    --with-png-dir=/usr \
    --enable-gd-native-ttf \
    --with-openssl \
    --with-fpm-user=http \
    --with-fpm-group=http \
    --enable-ftp \
    --with-gettext \
    --enable-fpm






Note that, on my local setup, I do not need IMAP, Kerberos etc. If you need those, go ahead and add the configure flags.





After that, do the actual compiling:





    $ make





The only reason the compile would fail at this point is if you do not have a library installed but some of the configure flags need them. If the build succeeds, and if you have loads of time on your hands, run a build test using `make test`. Otherwise install the code:





    $ sudo make install





PHP should now be installed to `/usr/local/php/php5.3.26` and the PHP5.3.26 binary should be available at `/usr/local/php/php5.3.26/bin/php`. Try the following and see if it gives you proper version output:





    $ /usr/local/php/php5.3.26/bin/php --version





For easy access to the PHP 5.3.26 binary from command line, symlink to it from the `/usr/bin` directory:





    $ sudo ln -s /usr/local/php/php5.3.26/bin/php /usr/bin/php5.3





Now you should be able to call `$ php5.3 --version` and get the same result. To check if the original PHP installation through pacman is intact, run `$ php --version` and see the difference.





Next, we need to copy over a `php.ini` file to the `lib` subdirectory. PHP ships with a development and a production sample of `php.ini`. You can find them in your build directory, that is where you had extracted the files and ran the compile. Taking our example, and using the development sample, do:





    $ sudo cp -v ~/build/php/php-5.3.26/php.ini-development /usr/local/php/php5.3.26/lib/php.ini





Edit this php.ini and change the values as necessary.





## Configure PHP-FPM





The PHP-FPM binary is installed in the `sbin` directory. Let us symlink it as well to have it available on the path:





    $ sudo ln -s /usr/local/php/php5.3.26/sbin/php-fpm /usr/bin/php-fpm5.3





Run PHP-FPM's version to ensure it has been properly linked:





    $ php-fpm5.3 --version





Next, create a custom PHP-FPM configuration in the `etc` directory. PHP provides a sample config file that we can use:





    $ cd /usr/local/php/php5.3.26
    $ sudo cp etc/php-fpm.conf.default etc/php-fpm.conf





Edit `etc/php-fpm.conf` and modify the following information:





  * In `[global]` hange `pid` to `/run/php-fpm/php-fpm5.3.pid`


  * Change `syslog.ident` to `php-fpm5.3`


  * Change `user` and `group` to `http`


  * Change `listen` to `/run/php-fpm/php-fpm5.3.sock`. Using UNIX sockets are always faster than TCP sockets. Nginx will connect to this socket.





Assign ownership `/run/php-fpm` to `http`:





    $ sudo chown -R http:http /run/php-fpm





### Configure systemd scripts to start PHP-FPM 5.3





Create a new file, `/etc/systemd/system/php-fpm5.3.service` and add the following information:





    [Unit]
    Description=The PHP 5.3 FastCGI Process Manager
    After=syslog.target network.target

    [Service]
    Type=forking
    PIDFile=/run/php-fpm/php-fpm5.3.pid
    PrivateTmp=true
    ExecStart=/usr/bin/php-fpm5.3 --pid /run/php-fpm/php-fpm5.3.pid
    ExecReload=/bin/kill -USR2 $MAINPID

    [Install]
    WantedBy=multi-user.target






I have used `Type=forking` to let php-fpm fork happily in the background. The PIDFile keeps track of the process generated. Using `Type=notify` as Arch's PHP 5.4's PHP-FPM does resulted in timeouts when starting the service.





Next, try starting the php-fpm5.3.service and see if the PHP-FPM process has started:





    $ sudo systemctl daemon-reload
    $ sudo systemctl start php-fpm5.3.service
    $ sudo systemctl status php-fpm5.3.service





Two files, "php-fpm5.3.pid" and "php-fpm5.3.sock" should be generated in `/run/php-fpm` when the service has started. To make the PHP-FPM 5.3 service load on reboots, do `$ sudo systemctl enable php-fpm5.3.service`.





## Configure Nginx





You should already have Nginx configured by now, and if you had used Arch Linux Wiki's steps, you would have a `Location` block in Nginx's config file. We need to tell Nginx to use php-fpm5.3's socket instead of original php-fpm's socket.





So, replace `fastcgi_pass` in:





     location ~ \.php$ {
          fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
          fastcgi_index  index.php;
          include        fastcgi.conf;
     }





with:





     location ~ \.php$ {
          fastcgi_pass   unix:/run/php-fpm/php-fpm5.3.sock;
          fastcgi_index  index.php;
          include        fastcgi.conf;
     }





Save configuration and restart Nginx. After restart, Nginx should process PHP scripts for that site using PHP 5.3 instead of PHP 5.4. Other sites would continue using PHP 5.4.





That's all!





* * *





## Tip





To avoid changing the path to PHP-FPM each time you have some change, you can set an `upstream` in the `http` of the default `nginx.conf`:





        # Upstream connection to php-fpm unix socket
        upstream php {
            server unix:/run/php-fpm/php-fpm.sock;
        }

        # Upstream connection to php-fpm5.3 unix socket
        upstream php5.3 {
            server unix:/run/php-fpm/php-fpm5.3.sock;
        }






Now, edit the site's Nginx configuration file and modify `fastcg_pass` to:





    <code>    fastcgi_pass php5.3</code>





For an app running on PHP 5.4, change it to:





    <code>    fastcgi_pass php</code>





Now even if you have a thousand site configurations, updating PHP-FPM path is easy by simply editing the `upstream` in `nginx.conf`!



