Pages : &nbsp;
 • ReadMe &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [ChangeLog](./docs/changelog.md) &nbsp;
 • [Contributing](./docs/contributing.md) &nbsp;
 • [License](./license.md)

# Terminal.js &nbsp; <sup><sub>v0.2.8.7 &nbsp; <sup><sup>[v 20210503°1817]</sup></sup></sub></sup>

Below :
 • [Usage](#usage)
 • [API Documentation](#api_doc)
 ◦ [Initialization](#api_initialization)
 ◦ [Methods](#api_methods)
 ◦ [Accessors](#api_accessors)
 ◦ [Properties](#api_properties)


```
Oops. Currently nags a prompt-bug, prepending all input by '$'.
```

Slogan : Terminal.js is a single-file JavaScript library for emulating a shell environment.

License : The MIT License

Status : In renovation

_The present fork is by Norbert C. Maier 2019 - 2021._

_Here are the **changes** compared to the
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

<a name="usage"></a>
## Usage

Include Terminal.js into your page header,
either the minified version or the source version.
The both operate equal, except for debugging.
As a user, you prefer the minified version,
which looks like this&nbsp;:

```
   <head>
      <script src="terminaljs/terminal.min.js"></script>
   </head>
```

As a developer, you prefer the source version :

```
      <script src="terminaljs/terminal.js"></script>
```

Now Terminal.js is ready to operate, and you can call it in the page's body.

<a name="usage_simple"></a>
##### Simple Use Case

*<span style="color:LightGray;">.. Todo: Fill in content. ..</span>*

&nbsp;

<a name="usage_advanced"></a>
##### Advanced Use Case

*<span style="color:LightGray;">.. Todo: Fill in content. ..</span>*

&nbsp;

<a name="api_doc"></a>
## API Documentation

<a name="api_initialization"></a>
### Initialization

    var myTerminal = new Terminal(id)

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

<a name="api_properties"></a>
### Properties

    .html

This is the top DOM element of the terminal instance.
If you want to modify styling via CSS, all instances belong to a Terminal class.
The element will also get the ID from the constructor argument.

---

<sup><sub>[project ~20190208°1711 file 20190213°0211]</sub></sup>
