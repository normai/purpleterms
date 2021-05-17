Other pages : &nbsp;
 • ReadMe &nbsp;
 • [API Doc](./docs/api-doc.md) &nbsp;
 • [Dev Doc](./docs/dev-doc.md) &nbsp;
 • [Notes](./docs/notes.md) &nbsp;
 • [Issues](./docs/issues.md) &nbsp;
 • [Changes](./docs/changes.md) &nbsp;
 • [Credits](./docs/credits.md)

<img src="./docs/20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="256" height="256" alt="Purple-Bellied Lory">

# Purple Terminals &nbsp;<sup><sub><sup>v0.3.2</sup></sub></sup>

Subsections :
 •&nbsp;[Synopsis](#id20210514o1511)
 •&nbsp;[Usage](#id20210514o1521)
 ◦&nbsp;[1&nbsp;Link&nbsp;the&nbsp;library](#id20210514o1531)
 ◦&nbsp;[2&nbsp;Put&nbsp;box&nbsp;on&nbsp;page](#id20210514o1541)
 ◦&nbsp;[3&nbsp;Output&nbsp;lines](#id20210514o1551)
 ◦&nbsp;[4&nbsp;Gather&nbsp;input](#id20210514o1611)
 ◦&nbsp;[5&nbsp;Sense&nbsp;y/n&nbsp;keypress](#id20210514o1621)
 ◦&nbsp;[6&nbsp;Get&nbsp;sophisticated](#id20210514o1631)

<a name="id20210514o1511"></a>
## Synopsis

Slogan : Single-file JavaScript to put up terminals on a web page

License : BSD 3-Clause License

Status : Applicable.

Here are the changes since forking from the
 [original project](https://github.com/eosterberg/terminaljs) :

- Integrate **beep** file as base64. Pro: No external file. Con: Breaks IE<10

- Build it with [Closure Compiler](https://developers.google.com/closure/compiler/) in **advanced** mode

- Process all **pending pull request**

- Rename repository branch 'master' to '**main**'

- Supplement **prompts** by dynamic CSS rules

- Supplement dedicated **debug** features

- Giving the project a **new dress**

- Numerous small improvements 

- <a href="https://www.trekta.biz/svn/terminaljsdev/trunk/terminaljs/aloha.html">
<img src="./docs/20210512o1713.purple-bellied-lory.v2.x0256y0256.png" width="32" height="32""/></a>
**[Comprehensive demo pages](https://www.trekta.biz/svn/terminaljsdev/trunk/terminaljs/aloha.html)**

I have stirred the code violently but maintained **backward-compatibility**.
 Just replace `terminal.js` by [`purpleterms.js`](./purpleterms.js) or
 by [`purpleterms.min.js`](./purpleterms.min.js) — And bingo.

The project got a bit inflated with files. Don't let this distract you.
 All that matters and all you need, is one single file: `purpleterms.js`.


## Usage <a name="id20210514o1521"></a>

Here are the steps for a first simple PurpleTerms use case.

### Step 1 — Link the library <a name="id20210514o1531"></a>

Include `purpleterms.js` or `purpleterms.min.js` with a `script` tag into
 your page header. The both files operate equal, except for debugging.
 As a user, you will prefer the minified version, which looks like this&nbsp;:

```
   <head>
      <script src="./terminaljs/purpleterms.min.js"></script>
   </head>
```

Developers will prefer the source version :

```
      <script src="./terminaljs/purpleterms.js"></script>
```

And what is that `purpleterms.pretty.js`? It is an intermediary
 transformation for source code readers, who like to read the JavaScript code,
 but without the heavy comment clutter. This would work as well.

After the library is linked, PurpleTerms is ready to operate, and you can
 call it in the page's body, or from a dedicated JavaScript file.


### Step 2 — Put a box on the page <a name="id20210514o1541"></a>

Somewhere on your page, provide a div with a distinctive ID, e.g.:

```
   <body>
      ...
      <div id="PLACE_FOR_TERMINAL_ONE"></div>
      ...
   </body>
```

Below that, place a JavaScript sequence like this :

```
   <body>
      ...
      <script>
         var t1 = new Terminal();
         var e1 = document.getElementById('PLACE_FOR_TERMINAL_ONE');
         e1.appendChild(t1.html);
      <script>
      ...
   </body>
```

The three code lines do the following: (1) Create a new
 PurpleTerms object and give you the handle `t1` to access it
 (2) Search the prepared div by the ID and give you a handle `e1` to access
 that element (3) Tell the element `e1`, that it shall include the HTML
 property from the Terminal `t1`.

Now a terminal box should appear on the page. The box is empty, not even
 a prompt in it. You have to tell it what to do.

### Step 3 — Output lines <a name="id20210514o1551"></a>

The first and easiest action is to print a line. Within the script tag,
 after you have acquired a terminal object as variable `t1`,
 you tell it to print one or more lines :

```
         t1.print('Hello PurpleTerms ' + t.getVersion() + '"');
         t1.print('Let's explore this box.');
         t1.print('How are you?');
```

This shall print three lines.

### Step 4 — Gather user input <a name="id20210514o1611"></a>

Retrieving input is no more soo trivial, since now you have to deal with
 asynchronous programming. This means, you fire a function call, and give
 that a function parameter, which executes something, whenever the user
 has answered.

Printing the prompt looks like that:

```
         t1.input('How are you? Please tell me', procesTheAnswer);
```

Where `procesTheAnswer` is a function, which must be defined somewhere
in the code, e.g. immediately below. It looks like this

```
         function procesTheAnswer(sInput) {
            t1.print('Oh, your well-being is this: ' + sInput + '.');
         }
```

If you have understood above mechanism, you may like to see below alternative
 writing, which is above two sequences in a single one. It is an anonymous
 function as parameter, saving some space and an identifyer, but you have to
 look really close at the bracketing:

```
         t1.input('How are you? Please tell me', function (sInput) {
            t1.print('Oh, your well-being is this: ' + sInput + '.');
         });
```

So with the `input()`, you print come message prompting the user to also
 write something and to finish her writing with Enter. Only after the user
 presses the Enter key, all she typed, is captured as input.

### Step 5 — Sense y/n keypress <a name="id20210514o1621"></a>

Sometimes, you need not a string from the user, but one plain keypress
 suffices, either `y` for yes or `n` or any other key for no. This can
 be done with the `confirm()` method.

```
         t1.confirm('Are you hungry?', function (b) {
            if (b) {
               t1.print('I try to order you a pizza.'); // answered with y
            }
            else {
               t1.print('Fine. Then we can have a walk.'); // answered with n
            }
         });
```

### Step 6 — Get sophisticated <a name="id20210514o1631"></a>

Please inspect the demo files with their varying degree of sophistication :
[`aloha.html`](./aloha.html)
[`simple.html`](./simple.html)
[`custom.html`](./custom.html)
[`develop.html`](./develop.html)

<img src="./docs/20210512o1743.waving-astronaut.v2.p12.png" align="right" width="96" height="96" alt="Waving Astronaut">

&nbsp;

---

<sup><sub>*project 20190208°1711 file 20190213°0211*</sub></sup>
