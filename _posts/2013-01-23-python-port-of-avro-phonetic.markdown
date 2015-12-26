---
author: kaustav
comments: true
date: 2013-01-23 19:43:11+00:00
layout: post
slug: python-port-of-avro-phonetic
title: Python port of Avro Phonetic
categories:
- Avro
tags:
- Avro
- Python
---

I have started working on a Python port of Avro Phonetic that I call pyAvroPhonetic. My main inspiration here has been [Rifat Nabi](https://github.com/torifat)'s [jsAvroPhonetic](https://github.com/torifat/jsAvroPhonetic), and I owe a good deal of code and ideas to him for this project. The project is on Github at [kaustavdm/pyAvroPhonetic](https://github.com/kaustavdm/pyAvroPhonetic). It is also listed on PyPi as [PyAvroPhonetic](http://pypi.python.org/pypi/PyAvroPhonetic).<!-- more -->This is my second attempt at writing something useful in Python. So, the code can be expected to evolve a lot in future. As of now, I've planned to implement a basic text parser as a Python library so that other Python applications can use it to do Avro Phonetic-style transliteration.

I'm writing this in Python 2, specifically from 2.5 to 2.7. Porting this to Python 3 will be easy enough once simplejson for Py3 is stable. Getting Unicode to work in Python 2 was a good enough challange. I feel I've conquered it mostly. I'm writing extensive tests to ensure proper parsing.

The code is far from stable now. It doesn't parse vowels properly. I'll need to fix that.

[Update]: It is fixed now in 0.1.3.
