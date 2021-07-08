---
author: kaustav
comments: true
date: 2014-03-31
layout: post
slug: add-locally-installed-npm-package-executables-path
title: Add locally installed NPM package executables to PATH
tags:
- nodejs
- npm
---

If you install packages from [npm](http://npmjs.org) locally, i.e. without using `-g` option, the packages are downloaded to `./node_modules` folder in your current directory. Some of these packages, like [JSDoc](https://www.npmjs.org/package/jsdoc) and [JSHint](https://www.npmjs.org/package/jshint), come with an executable file that you can execute from the command line. When installing these packages globally, `npm` puts their executables on `PATH` so that you can call the package executables from anywhere on your computer. When doing a local install, you may often need to call these executables from the current directory.

On OSX, `npm` automatically exposes these locally installed binaries on path. So, if you are at the root of your [NodeJS](http://nodejs.com/) project, you can call the binaries or executables of the packages you have installed locally. But, for multiple Linux distributions, like Debian, Ubuntu or Arch Linux, the local binaries are not available from the root of the NodeJS project.

The way out is to add `./node_modules/.bin` folder to `PATH`. `npm` puts all executables in that folder when doing a local install.<!-- more -->

To do that, run this command on the command line:




    $ PATH="node_modules/.bin":$PATH




To make the change permanent, edit `~/.bashrc` and add this to it:



``` bash
export PATH="node_modules/.bin":$PATH
```



You will need to do `source ~/.bashrc` to load it for the current session.

This trick is particularly useful if you have multiple versions of the same NodeJS package installed per project. That way, even if you have a different global version, the local version of the package will take precedence.
