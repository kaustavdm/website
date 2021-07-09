---
date: 2012-08-17
slug: use-emacs-for-web-development
title: Use Emacs for web development
tags:
- emacs
---

I have been searching for lots of ways of turning Emacs into a
full-featured web development tool. Recently I found Bozhidar Batsov's
emacs-dev-kit and it felt pretty good a starter kit. I like the
customizations he did to the Emacs interface, particularly, the choice
of plugins were excellent. Running emacs 23 in daemon mode gave me a huge
performance boost on my 1GiG laptop running on Debian 6. I added some more spice to make a pretty neat Emacs web development kit.

As a web developer, the only thing I felt missing was multi-web-mode. So I simply
forked out Bozhidar's repo on GitHub and added multi-web-mode support to
it. The whole setup now works smoothly, with emacs daemon using up less
than 30 MB of RAM.

The emacs developer kit with my customizations can be downloaded from:
[emacs-dev-kit GitHub repository](https://github.com/kaustavdm/emacs-dev-kit).
