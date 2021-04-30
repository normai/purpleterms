﻿# TerminalJs <sup><sub>v0.2.6</sub></sup>

_The present fork is by Norbert C. Maier 2019 - 2021._

_The **changes** compared to the
 [original project](https://github.com/eosterberg/terminaljs) are :_

- _Supplement a **prompt sign** at the beginning of an input line to signal readiness to receive input_

- _Integrate Österberg's **`beep.mp3` as base64 variable** inside the code.
   Pro: No more external link needed for beeping.
   Con: Incompatible with IE<10_

- _Make it work with Google-Closure-Compiler in **advanced mode**_

- _Adjust coding and documentation **style** to my personal taste_

_The description in below box is the original one, left **unchanged**
except for striking the now invalid link to the read-more-page._

_In the meanwhile, below description may deviate from the facts in the current fork.
But [`terminal.js`](./terminal.js)
should still be fully **backward-compatible** for any use cases.
At least the unchanged original page [`test.html`](./test.html) still works fine with it._

---

terminal.js by Erik Österberg is a dead simple JavaScript library for emulating a shell environment.

### Initialization

    var myTerminal = new Terminal(id)

### Properties and methods

    .html
This is the top DOM element of the terminal instance. If you want to modify styling via CSS, all instances belong to a .Terminal class. The element will also get the ID from the constructor argument.

    .print(message)
Prints the message on a new line.

    .input(message, callback)
Prints the message, and shows a prompt where the user can write. When the user presses enter, the callback function fires. The callback takes one argument, which is the user input.

    .password(message, callback)
The same as input but the input of the user will be hidden just like an old-fashioned terminal.

    .confirm(message, callback)
Displays a confirm message, with a " (y/n)" automatically appended at the end. The callback receives the yes/no value as a boolean.

    .clear()
Clears the screen.

    .sleep(milliseconds, callback)
Works exactly like the JavaScript "setTimeout" function. Waits for the number of milliseconds given, then executes the callback.

    .beep()
Plays a retro digital tone.

    .setTextSize()
    .setTextColor()
    .setBackgroundColor()
    .setWidth()
    .setHeight()
All the ".set" methods accepts any CSS-compliant value.

    .blinkingCursor(boolean)
Set to true by default.

Read more at: <del>http://www.erikosterberg.com/terminaljs</del>

### License

The MIT License (MIT)

Copyright (c) 2014 Erik Österberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<sup><sub>[project 20190213°0211 file 20190208°1941]</sub></sup>
