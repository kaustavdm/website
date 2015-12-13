---
author: kaustav
comments: true
date: 2013-12-15 15:35:11+00:00
layout: post
slug: introducing-css-variables-making-css-dynamic
title: Introducing CSS variables - Making your CSS dynamic
wordpress_id: 773
categories:
- Mozilla
tags:
- css
- css variables
- mozilla
---

CSS variables just landed in Firefox 29 (Nightly) a few days back. This exciting new addition to the CSS specifications is all set to change the perception of CSS as a static language for defining style sheets. The formal W3C specification driving this feature is called [CSS Custom Properties](http://www.w3.org/TR/css-variables-1/), aka, CSS variables, and is currently in the stage of "Working Draft". Currently, there is no known support for this in browsers apart from the latest builds of Firefox. Let us quickly check what this is all about.<!-- more -->

[Christian Heilmann](http://christianheilmann.com/) posted a screencast recently highlighting the interesting aspects of CSS variables. He quickly shows how we can utilize variables to store data and reuse those variables in our CSS.





## Declaring and using a variable



Declaring variables is as easy as prefixing them with a `var-` keyword. Say, you want to store the hex code of a background colour in a variable, you would do:


    
    
    body {
      background-color: #333;
      var-containerBg: #ccc;
    }
    



Then, to use that variable later on in the CSS, you would call the `var()` function, and pass the name of the variable without the `var-` prefix as the argument:


    
    
    .container {
      background-color: var(containerBg);
    }
    



This will produce:


    
    
    .container {
       background-color: #ccc;
    }
    





## Cascading inheritance



The inheritance of CSS variables is cascading as well. That is, you can override the value of a parent variable in its children. For example:


    
    
    body {
      var-bgColor: #333;
      var-fontSize: 14px;
    }
    .container {
      background-color: var(bgColor);
      var-fontSize: 16px;
    }
    .container p {
      font-size: var(fontSize);
    }
    p {
      font-size: var(fontSize);
    }
    



In the above code, the value of `var-fontSize` is set once in `body` but is overriden by `.container`. So, all children of `.container` will inherit the overriden value, but the selectors which are not children of `.container` will retain the original value defined by `body`. So the output will be:


    
    
    body {
      var-fontSize: 14px;
    }
    .container {
      var-fontSize: 16px;
    }
    .container p {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
    





## Know more



This is just the basics of CSS variables. You can do lot more with them, like performing calculations using the `calc()` function. To know more, read the [Using CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) page on [Mozilla Developer Network](https://developer.mozilla.org/), or the post on [CSS Variables in Firefox Nightly](https://hacks.mozilla.org/2013/12/css-variables-in-firefox-nightly/) on the Mozilla Hacks blog.

