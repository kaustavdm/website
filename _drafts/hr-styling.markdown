---
layout: post
slug: hr-styling
title: Styling your &lt;hr&gt; tags
subheader: Create a horizontal separator like Medium.com using <hr> tags and some CSS
tags:
- css
---

You can use `<hr>` tags in your HTML as dividers to visually distinguish sections. I use it in my blog posts to split content into distinct sections. I like how Medium styles its separators &mdash; 3 gray dots, center-aligned, with margin to indicate content separation.

Here is a small piece of CSS that lets you style your `<hr>` tags to achieve a similar result:

```css
hr:after {
    display: block;
    text-align: center;
    content: "...";
    color: #333333;
    font-size: 2rem;
    height: 2rem;
    line-height: 2rem;
    clear: both;
    border: none;
}

hr {
    border: none;
    margin: 2rem;
    background: transparent;
}
```

---

The separator above is how it looks.
