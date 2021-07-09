---
date: 2015-12-27
slug: javascript-loop-arrays-with-map
title: JavaScript - Loop Arrays with .map()
tags:
- javascript
---

JavaScript has a neat [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method that you can use to perform an action on all the members of the array.

The `.map()` method returns a new array with the mapped function applied to all of the members. You will not need to write a loop using `for` or `forEach`.

For example, this is what you would do to increment all of the numbers in an array:

``` javascript
var numArray = [5, 10, 15, 20, 25, 30];

var addedArray = numArray.map(function (num) {
  return num++;
});

// addedArray = [6, 11, 16, 21, 26, 31];
```
