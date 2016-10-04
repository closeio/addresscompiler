# Address compiler

`addresscompiler` is a UMD module that allows you to compile name-addr e-mail addresses in node and the browser.

## Usage

### node.js and AMD

```js
require('addresscompiler');
```

### Global context

```html
<!-- exposes global variable addresscompiler -->
<script src="addresscompiler.js"></script>
```

### addresscompiler.compile

Compiles name-address e-mail addresses into a single string.

#### Examples

A single address:

```js
addresscompiler.compile({
    name: "John Smith",
    address: "john@example.com"
});

// returns
'John Smith <john@example.com>'
```

Or a list:

```js
addresscompiler.compile([{
    name: "Bach, Sebastian",
    address: "sebu@example.com"
}, {
    name: "Mozzie",
    address: "mozart@example.com"
}]);

// returns
'"Bach, Sebastian" <sebu@example.com>, Mozzie <mozart@example.com>'
```

And when using groups

```js
addresscompiler.compile([{
    name: "Composers",
    group: [{
        address: "sebu@example.com",
        name: "Bach, Sebastian"
    }, {
        address: "mozart@example.com",
        name: "Mozzie"
    }]
}]);

// returns
'Composers:"Bach, Sebastian" <sebu@example.com>, Mozzie <mozart@example.com>;'
```

## See also

 - [addressparser](https://github.com/whiteout-io/addressparser) - similar library to do the inverse
 - [Source partially extracted from whiteout-io/mailbuild](https://github.com/whiteout-io/mailbuild/blob/1a77037e6c2438ee12b6d3e12f1f29c487147bbc/src/mailbuild.js#L661-L713)
 - [Python implementation](https://github.com/python-git/python/blob/715a6e5035bb21ac49382772076ec4c630d6e960/Lib/email/utils.py#L83-L98)

## MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
