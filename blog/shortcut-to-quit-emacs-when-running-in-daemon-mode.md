---
author: kaustav
comments: true
date: 2013-06-22
layout: post
slug: shortcut-to-quit-emacs-when-running-in-daemon-mode
title: Shortcut to quit Emacs when running in daemon mode
tags:
- emacs
---

If your Emacs is running in daemon mode, you most likely do `M-x save-buffers-kill-emacs` to exit Emacs. Here is a short tip which will bind `C-c C-q` to `(save-buffers-kill-emacs)`:



    ;; Shortcut to daemon shutdown
    (global-set-key (kbd "C-c C-q") (lambda ()
                                      (interactive)
                                      (when (y-or-n-p "Quit Emacs?")
                                        (save-buffers-kill-emacs))))



<!-- more -->

Add this to your `.emacs`, `init.el` or if you use Prelude, in a separate file .el file in the "personal" directory.

This keybinding works for major modes where "C-c C-q" hasn't been defined already, for instance, in ERC, it will quit ERC instead of quitting Emacs. But, it is quite a useful shortcut if you are a regular user of Emacs in daemon mode.

