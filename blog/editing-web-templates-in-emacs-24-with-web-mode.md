---
date: 2013-03-22
slug: editing-web-templates-in-emacs-24-with-web-mode
title: Editing web templates in Emacs 24 with web-mode
tags:
- web development
- web-mode
---

[web-mode](http://web-mode.org) for Emacs by [François-Xavier Bois](https://github.com/fxbois) is the latest addition to my Emacs arsenal. It is a major mode that takes off all the pain in editing web template files in Emacs.

To the uninitiated, web template files are used in generating "views" in websites and web applications, and usually consist of different languages mixed in the same file. For example, a normal view file for a PHP application can include PHP code intermixed with HTML, CSS and Javascript.

In my experience, web-mode works far better and way faster than MuMaMo, multi-web-mode and other multi-modes for Emacs. This is because, unlike those major modes, web-mode does not keep changing between major modes within the same buffer, but handles different languages by itself, _without_ switching modes. The result is a smooth writing experience, and more importantly, zero flicker when entering, say a PHP block within HTML.

Further, given that web-mode handles different languages internally, it has been extended to support various templating engines like Twig, Smarty, Velocy, and more recently, Laravel's Blade templating engine.

All in all, web-mode has greatly improved the ease of using Emacs 24 for web development.

Kudos to fxbois and the team of contributors behind web-mode :-)
