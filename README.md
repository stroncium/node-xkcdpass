# xkcdpass - XKCD-style password generation for node.js

  Inspired by [XKCD comic](http://xkcd.com/936/).

  From command line, just use xkcdpass to generate a single password with default plan.

  Programmatically, use this example:

``` js
var xkcdpass = require('xkcdpass');

var pass = xkcdpass.generate(); // 'throw-unit-face-chile'
var passDetailed = xkcdpass.generateDetailed(); //{ password: 'race-floor-word-themselves', entropyBits: 44, ebtropyBitsExact: 41.906984815757866 }

```

Both methods also accept optional config whic currently can have only one working option: `plan`. You can use it to generate passwords which differ from original XKCD form.
Currently a plan is array of elements and each of elements can be a string or `['word']`. String means literall addition of string, `['word']` means generation of random word.
The default(same as mentioned in XKCD) plan is `[ ['word'], '-', ['word'], '-', ['word'], '-', ['word'] ]`.
