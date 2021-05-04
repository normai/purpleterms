# TerminalJs <sup><sub>v0.2.8</sub></sup>

Below :
• [API Documentation](#api_doc)
◦ [Initialization](#api_initialization)
◦ [Properties](#api_properties)
◦ [Methods](#api_methods)
◦ [Accessors](#api_accessors)
• [License](#license)

Slogan : Terminal.js is a dead simple JavaScript library for emulating a shell environment.

_The present fork is by Norbert C. Maier 2019 - 2021._

_This are the **changes** compared to the
 [original project](https://github.com/eosterberg/terminaljs) :_

- _Integrate **`beep.mp3`** as base64 variable.
   Pro: No more external link for beeping.
   Con: Breaks IE<10_

- _Adjust coding and documentation **style** to my personal taste_

- _Build with [Closure Compiler](https://developers.google.com/closure/compiler/) in **advanced mode**_

- _Refactor **key codes** (inspired by pull request [#12](https://github.com/eosterberg/terminaljs/pull/12))_

- _Integrate **XHR** feature (after pull request [#11](https://github.com/eosterberg/terminaljs/pull/11)).
  Not yet tested._

- _Rename repository branch 'master' to '**main**'_

_I have stirred the code violently but kept it fully **backward-compatible**.
Just replace your old by the new [`terminal.js`](./terminal.js)
or by [`terminal.min.js`](./terminal.min.js) — Bingo (hopefully)._

<a name="api_doc"></a>
## API Documentation

<a name="api_initialization"></a>
### Initialization

    var myTerminal = new Terminal(id)

<a name="api_properties"></a>
### Properties

    .html

This is the top DOM element of the terminal instance.
If you want to modify styling via CSS, all instances belong to a Terminal class.
The element will also get the ID from the constructor argument.

<a name="api_methods"></a>
### Methods

    .beep()

Plays a retro digital tone.

    .blinkingCursor(boolean)

Set to true by default.

    .clear()

Clears the screen.

    .clearHistory()

Clears the history.

    .confirm(message, callback)

Displays a confirm message, with a " (y/n)" automatically appended at the end. The callback receives the yes/no value as a boolean.

    .connect(url)

You can set an URL address to get all responses with the XHR.
When you are running the terminal with connect(), things become real
— It means that now your backend is in charge of the terminal output.

    .input(message, callback)

Prints the message, and shows a prompt where the user can write. When the user presses enter, the callback function fires. The callback takes one argument, which is the user input.

    .password(message, callback)

The same as input but the input of the user will be hidden just like an old-fashioned terminal.

    .print(message)

Prints the message on a new line.

    .sleep(milliseconds, callback)

Works exactly like the JavaScript "setTimeout" function.
Waits for the number of milliseconds given, then executes the callback.

<a name="api_accessors"></a>
### Accessors

    .setBackgroundColor()
 
Accepts CSS-compliant color value

    .setHeight()

Accepts CSS-compliant dimension value

    .setTextColor()

Accepts CSS-compliant color value

    .setTextSize()

Accepts CSS-compliant dimension value

    .setWidth()

Accepts CSS-compliant dimension value

<a name="license"></a>
## License

<pre style="border:1px solid LightSlateGrey; border-radius:0.7em;">
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
</pre>
---

<sup><sub>[project ~20190208°1711 file 20190213°0211]</sub></sup>
