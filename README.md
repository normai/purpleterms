Pages : &nbsp;
 • ReadMe &nbsp;
 • [API](./docs/api.md) &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [Issues](./docs/issues.md) &nbsp;
 • [Changes](./docs/changelog.md) &nbsp;
 • [Credits](./docs/credits.md)

# Termjnal &nbsp; <sup><sub>v0.3.0.5~~ &nbsp; <sup><sup>20210512°1411~~</sup></sup></sub></sup>

Below :
 • [Synopsis](#synopsis)
 • [Vision](#vision)
 • [Usage](#usage)

<a name="synopsis"></a>
## Synopsis

Slogan : A JavaScript single-file to provide a terminal in the browser.

License : BSD 3-Clause License

Status : Under overhaul.

_The present fork is by Norbert C. Maier 2019 - 2021._

Here are the **changes** since forking from
 [original project](https://github.com/eosterberg/terminaljs) :

- Integrate **`beep.mp3`** as base64.
   Pro: No external link. Con: Breaks IE<10

- Build it with [Closure Compiler](https://developers.google.com/closure/compiler/) in **advanced mode**

- Adjust code and documentation **style** to my needs

- Refactor **key codes** inspired by pull request [#12](https://github.com/eosterberg/terminaljs/pull/12)

- Integrate **XHR** after pull request [#11](https://github.com/eosterberg/terminaljs/pull/11).
  Not yet tested.

- Integrate **history** after pull request [#2](https://github.com/eosterberg/terminaljs/pull/2).
  Not yet functional.

- Rename repository branch 'master' to '**main**'

- Supplement **input prompt** by dynamic CSS rules

I have stirred the code violently but maintained **backward-compatibility**.
 Just replace your old by the new [`terminal.js`](./terminal.js)
 or by [`terminal.min.js`](./terminal.min.js) — And bingo (hopefully).

Incompatibility : The prompt setters are not yet implemented, you are forced
 to live with the default prompts. This should not affect functionality.

The project got a bit inflated with files. Don't let this distract you.
 All that matters and all you need, is one single file: `terminal.js`.

<a name="vision"></a>
## Vision

Today a terminal seems a toy. But still e.g. in Windows many system
 tasks are not available from Explorer, only from console. Why?
 Because computers natively do communicate in terms of commands.

The word 'console' I find an even more concise designation for such box,
 than terminal, because it carries the term 'solid' in it. A console represents
 the system and must be extra reliable. If it wobbles, the system wobbles.

'Solid' shall be the top guideline keyword for Termjnal development. And the
 next important keyword is '*dead simple*', from Terminal.js' original slogan.
 Dead simple for the library users, not necessarily for the library developers.

Last not least, imagine speach recognition applied to the box, and out of
 nothing further interesting aspects show up.

<a name="usage"></a>
## Usage

Include `terminal.js` or `terminal.min.js` into your page header.
The both operate equal, except for debugging.
As a user, you prefer the minified version, which looks like this&nbsp;:

```
   <head>
      <script src="terminaljs/terminal.min.js"></script>
   </head>
```

As a developer, you prefer the source version :

```
      <script src="terminaljs/terminal.js"></script>
```

Now Termjnal is ready to operate, and you can call it in the page's body.

<a name="usage_simple"></a>
##### Simple Use Case

Until content here arrives, please inspect file
[`docs/demo3.html`](./docs/demo3.html)

*<span style="color:LightGray;">Todo: Fill in content. ..</span>*

&nbsp;

<a name="usage_advanced"></a>
##### Advanced Use Case

Until content here arrives, please inspect file
[`aloha.html`](./aloha.html)

*<span style="color:LightGray;">Todo: Fill in content. ..</span>*

&nbsp;

---

<sup><sub>*project 20190208°1711 file 20190213°0211*</sub></sup>
