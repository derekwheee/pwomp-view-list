# exemplar-view-list
[![Build Status](https://travis-ci.org/frxnz/exemplar-view-list.svg?branch=master)](https://travis-ci.org/frxnz/exemplar-view-list)

A helper for listing Exemplar views

Usage
-----

```handlebars
{{#view-list path="path/to/views" className="listing"}}
    <h1>{{title}}</h1>
    <h2>{{subtitle}}</h2>
{{/view-list}}
```