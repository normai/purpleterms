# terminaljs

terminal.js is a dead simple JavaScript library for emulating / simulating a shell environment.

![terminaljs demo](assets/demo.gif)

## Getting Started

Getting started is super easy.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8"/>
		<title>terminal.js example</title>
		<script src="terminal.js"></script>
	</head>
	<body>
		<h1>terminal.js example</h1>

		<br>
		<br>

		<script>
			let t = new Terminal();
			t.setHeight("200px");
			t.setWidth('600px');
			document.body.appendChild(t.html);

			t.print('Hello, world!');

			t.input(function (input) {
				if (input !== "") {
					t.print("I received the following : " + input);
				}
			});
		</script>

	</body>
</html>
```

## Initialization

	let myTerminal = new Terminal(id)

## Properties and methods

	.html
This is the top DOM element of the terminal instance. If you want to modify styling via CSS, all instances belong to a .Terminal class. The element will also get the ID from the constructor argument.

	.print(message)
Prints the message on a new line.

	.input(callback)
Prints shows a prompt where the user can write. When the user presses enter, the callback function fires. The callback takes one argument, which is the user input.

	.clear()
Clears the screen.

	.setTextSize()
	.setTextColor()
	.setBackgroundColor()
	.setWidth()
	.setHeight()
All the ".set" methods accepts any CSS-compliant value.

	.blinkingCursor(boolean)
Set to true by default.
