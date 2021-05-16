Other pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • API Doc &nbsp;
 • [Dev Doc](./dev-doc.md) &nbsp;
 • [Notes](./notes.md) &nbsp;
 • [Issues](./issues.md) &nbsp;
 • [Changes](./changes.md) &nbsp;
 • [Credits](./credits.md)

<img src="./20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="128" height="128" alt="Purple-Bellied Lory">

# API Documentation

Subsections : &nbsp;
 • [Initialization](#api_initialization) &nbsp;
 • [Methods](#api_methods) &nbsp;
 • [Accessors](#api_accessors) &nbsp;
 • [Properties](#api_properties)

<a name="api_initialization"></a>
## Initialization

The constructor can be called without or with an ID. If you call it without,
 then an automatic ID is generated. If you provide an ID, that one is used.

- `var myTerminal = new Terminal()             // without ID parameter `
- `var myTerminal = new Terminal(id)           // with ID parameter`

A given ID must be of maximum lenght 32, must consist only of letters, digits
 and underlines. An empty string is treated like no parameter. If you pass
 an invalid ID, one is automatically generated, as if you have given nothing.

<a name="api_methods"></a>
## Methods

#### beep()

Plays a retro digital tone.

#### blinkingCursor(boolean)

Set to true by default.

#### clear()

Clears the screen.

#### clearHistory()

Clears the history.

#### confirm(message, callback)

Displays a confirm message, with a " (y/n)" automatically appended at the end. The callback receives the yes/no value as a boolean.

#### connect(url)

You can set an URL address to get all responses with the XHR.
 When you are running the terminal with connect(), things become real
 — It means that now your backend is in charge of the terminal output.

_Not tested. May not work as expected._

#### input(message, callback)

Prints the message, and shows a prompt where the user can write. When the user presses enter, the callback function fires. The callback takes one argument, which is the user input.

#### password(message, callback)

The same as input but the input of the user will be hidden just like an old-fashioned terminal.

#### print(message)

Prints the message on a new line.

#### sleep(milliseconds, callback)

Works exactly like the JavaScript "setTimeout" function.
Waits for the number of milliseconds given, then executes the callback.

<a name="api_accessors"></a>
## Accessors

#### t.getId()

Returns the terminal's ID string.

See subchapter [Initialization](#api_initialization) to learn more about the box ID.

#### t.getVersion()

Returns the JavaScript file's version string

#### setBackgroundColor()

Accepts CSS-compliant color value

#### setDebugBorders(boolean)

If this is set, specific elements (input prompt) will be shown with colored
borders to better see the behaviour of the text components. Default = false.

#### setHeight()

Accepts CSS-compliant dimension value

#### setInputPrompt(string)

Lets you set the input prompt.

Note, that instead a blank, you may want pass CSS entity '\00a0' non-breaking-space.

_No validation may be implemented yet, so be careful what you pass._

#### setHeight()

Lets you set an output prompt. Feature is not yet implemented.

#### setOutputPrompt(string)

Lets you set the output prompt.

Note, that instead a blank, you may want pass CSS entity '\00a0' non-breaking-space.

_No validation may be implemented yet, so be careful what you pass._

#### setTextColor()

Accepts CSS-compliant color value

#### setTextSize()

Accepts CSS-compliant dimension value

#### setVolume()

Sets the beep volume. Must be a number or string in the range from 0.0 to 1.0

#### setWidth()

Accepts CSS-compliant dimension value

<a name="api_properties"></a>
## Properties

<img src="./20210512o1743.waving-astronaut.v2.p12.png" align="right" width="96" height="96" alt="Waving Astronaut">

#### html

This is the top DOM element of the terminal instance.
If you want to modify styling via CSS, all instances belong to a Terminal class.
The element will also get the ID from the constructor argument.

---

<sup><sub>[file 20210504°0911] ܀Ω</sub></sup>
