Pages : &nbsp;
 • ReadMe &nbsp;
 • [API Doc](./docs/apidoc.md) &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [Todos](./docs/todos.md) &nbsp;
 • [ChangeLog](./docs/changelog.md) &nbsp;
 • [License](./docs/license.md)

# Termjnal &nbsp; <sup><sub>v0.2.9.9~ &nbsp; <sup><sup>20210509°1111~</sup></sup></sub></sup>

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

- Adjust **style** to my personal taste

- Refactor **key codes** inspired by pull request [#12](https://github.com/eosterberg/terminaljs/pull/12)

- Integrate **XHR** after pull request [#11](https://github.com/eosterberg/terminaljs/pull/11).
  Not yet tested.

- Integrate **history** after pull request [#2](https://github.com/eosterberg/terminaljs/pull/2).
  Not yet functional.

- Rename repository branch 'master' to '**main**'

- Supplement **input prompt** by dynamic CSS rules

I have stirred the code violently but kept it **backward-compatible**.
 Just replace your old by the new [`terminal.js`](./terminal.js)
 or by [`terminal.min.js`](./terminal.min.js) — And bingo (hopefully).

The project got a bit inflated with files. Don't let this distract you.
 All that matters and all you need, is one single file: `terminal.js`.

<a name="vision"></a>
## Vision

A terminal seems a toy today. But still e.g. in Windows many system
 tasks are not available from Explorer, only from console. Why?
 Because computers natively do communicate in terms of commands.

The word **console** I find an even more concise designation than 'terminal',
 because it carries the term 'solid' in it. A console represents the
 system, it must be reliable under all circumstances. If it wobbles,
 the system breaks.

Of course, Termjnal may never reach such solid state. Nevertheless shall
 this be the direction to look. And as for guideline keywords, the top one
 shall stay '*dead simple*' from Terminal.js original slogan.

Last not least, imagine speach recognition applied, and suddenly further
 interesting aspects show up.

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
