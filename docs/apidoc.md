Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • API Doc &nbsp;
 • [Notes](./notes.md) &nbsp;
 • [ChangeLog](./changelog.md) &nbsp;
 • [License](./license.md)

Below : &nbsp;
 • [API Doc](#api_doc) &nbsp;
 ◦ [Initialization](#api_initialization) &nbsp;
 ◦ [Methods](#api_methods) &nbsp;
 ◦ [Accessors](#api_accessors) &nbsp;
 ◦ [Properties](#api_properties)

<a name="api_doc"></a>
# API Docmentation

<a name="api_initialization"></a>
## Initialization

    var myTerminal = new Terminal(id)

<a name="api_methods"></a>
## Methods

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
## Accessors

    .setBackgroundColor()

Accepts CSS-compliant color value

    .setDebugBorders(boolean)

If this is set, specific elements (input prompt) will be shown with colored
borders to better see the behaviour of the text components. Default = false.

    .setHeight()

Accepts CSS-compliant dimension value

    .setInputPrompt()

Lets you set an input prompt. This setter was a quick fix for
 *[issue 20210502°1121](./docs/notes.md#id20210502o1121)* 'Input prepended by dollar'.
 The prompt feature is not consolidated nor tested.
 If you use this, your input values will be prepended with the prompt value.

    .setHeight()

Lets you set an output prompt. Feature is not yet implemented.

    .setTextColor()

Accepts CSS-compliant color value

    .setTextSize()

Accepts CSS-compliant dimension value

    .setWidth()

Accepts CSS-compliant dimension value

<a name="api_properties"></a>
## Properties

    .html

This is the top DOM element of the terminal instance.
If you want to modify styling via CSS, all instances belong to a Terminal class.
The element will also get the ID from the constructor argument.

---

<sup><sub>[file 20210504°0911] ܀Ω</sub></sup>
