# pwomp-view-list
[![Build Status](https://travis-ci.org/frxnz/pwomp-view-list.svg?branch=master)](https://travis-ci.org/frxnz/pwomp-view-list)

A helper for listing Pwomp views

Usage
-----

```handlebars
{{#view-list path="path/to/views" className="listing"}}
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>
{{/view-list}}
```