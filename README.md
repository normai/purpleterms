Pages : &nbsp;
 • ReadMe &nbsp;
 • [API Doc](./docs/apidoc.md) &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [ChangeLog](./docs/changelog.md) &nbsp;
 • [License](./docs/license.md)

# Terminal.js &nbsp; <sup><sub>v0.2.9~~ &nbsp; <sup><sup>[v 20210505°1752~~]</sup></sup></sub></sup>

Below :
 • [Synopsis](#synopsis)
 • [Usage](#usage)

<a name="synopsis"></a>
## Synopsis

Slogan : Terminal.js is a single-file JavaScript library for emulating a shell environment.

License : The MIT License

Status : In renovation. 

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

---

<sup><sub>[project ~20190208°1711 file 20190213°0211]</sub></sup>
