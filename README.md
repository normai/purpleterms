Other pages : &nbsp;
 • ReadMe &nbsp;
 • [API Doc](./docs/api-doc.md) &nbsp;
 • [Dev Doc](./docs/dev-doc.md) &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [Issues](./docs/issues.md) &nbsp;
 • [Changes](./docs/changes.md) &nbsp;
 • [Credits](./docs/credits.md)

<img src="./docs/20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="256" height="256" alt="Purple-Bellied Lory">

# Purple Terminals &nbsp;<sup><sub><sup>v0.3.1.2~~</sup></sub></sup>

Subsections :
 • [Synopsis](#synopsis)
 • [Usage](#usage)

<a name="synopsis"></a>
## Synopsis

Slogan : Single-file JavaScript to put up terminals on a web page

License : BSD 3-Clause License

Status : Applicable.

Here are the changes since forking from the
 [original project](https://github.com/eosterberg/terminaljs) :

- Integrate **beep** file as base64. Pro: No external file. Con: Breaks IE<10

- Build it with [Closure Compiler](https://developers.google.com/closure/compiler/) in **advanced** mode

- Adjust code **style** to my needs

- Process all **pending pull request**

- Rename repository branch 'master' to '**main**'

- Supplement **prompts** by dynamic CSS rules

- Supplement dedicated **debug** features

- Giving the project a **new dress**

- Numerous small improvements 

I have stirred the code violently but maintained **backward-compatibility**.
 Just replace your old by the new [`terminal.js`](./terminal.js)
 or by [`terminal.min.js`](./terminal.min.js) — And bingo (hopefully).

The project got a bit inflated with files. Don't let this distract you.
 All that matters and all you need, is one single file: `terminal.js`.

<a name="usage"></a>
## Usage

Include `terminal.js` or `terminal.min.js` with a `script` tag into your
 page header. The both files operate equal, except for debugging.
 As a user, you will prefer the minified version, which looks like this&nbsp;:

```
   <head>
      <script src="terminaljs/terminal.min.js"></script>
   </head>
```

As a developer, you will prefer the source version :

```
      <script src="terminaljs/terminal.js"></script>
```

Now PurpleTerms is ready to operate, and you can call it in the page's body.

And what was `terminal.pretty.js` good for? It is of no runtime use, though
 of course it runs. It is an intermediary transformation, just as a convenience
 for source code readers, who may like to read the JavaScript code without the
 heavy comment clutter. Inspect `build.py` to learn the exact transformation
 techniques.

<a name="usage_simple"></a>
##### Simple Use Case

Until content here arrives, please inspect file
[`docs/simple.html`](./docs/simple.html)

*<span style="color:LightGray;">Todo: Fill in content. ..</span>*

&nbsp;

<a name="usage_advanced"></a>
##### Advanced Use Case

<img src="./docs/20210512o1743.waving-astronaut.v2.p12.png" align="right" width="96" height="96" alt="Waving Astronaut">

Until content here arrives, please inspect file
[`aloha.html`](./aloha.html)

*<span style="color:LightGray;">Todo: Fill in content. ..</span>*

&nbsp;

---

<sup><sub>*project 20190208°1711 file 20190213°0211*</sub></sup>
