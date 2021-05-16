Other pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API Doc](./api-doc.md) &nbsp;
 • [Dev Doc](./dev-doc.md) &nbsp;
 • Notes &nbsp;
 • [Issues](./issues.md) &nbsp;
 • [Changes](./changes.md) &nbsp;
 • [Credits](./credits.md)

<img src="./docs/20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="128" height="128" alt="Purple-Bellied Lory">

# Notes

Subsections : &nbsp;
•&nbsp;[Naming](#id20210513o1311) &nbsp;
•&nbsp;[Cursor blink?](#id20210512o1521) &nbsp;
•&nbsp;[Browser&nbsp;Compatibility](#notes_browser_compatibility) &nbsp;
•&nbsp;[Base64](#notes_base64) &nbsp;
•&nbsp;[Prompt&nbsp;Feature](#id20210509o1511) &nbsp;
•&nbsp;[Forks&nbsp;List](#fork_list) &nbsp;
•&nbsp;[AJAX/XHR](#id20210430o1711) &nbsp;
•&nbsp;[PR&nbsp;'Additional&nbsp;functions'](#id20210430o1821) &nbsp;
•&nbsp;[Retrieving&nbsp;Keystrokes](#retrieving_keystrokes) &nbsp;
•&nbsp;_[GFM](#github_flavored_markdown)_ &nbsp;
•&nbsp;[Session&nbsp;Logs](#id20210512o1911) &nbsp;
•&nbsp;[References](#id20210512o1611)

_This page contains boring casual developer notes, **totally uninteresting** for library users._

---

## Naming <a name="id20210513o1311"></a> &nbsp; <sup><sub><sup><sup>_Note&nbsp;20210513°1311_</sup></sup></sub></sup>

Project name. At some point in development, for easier referencing, this fork
 should rather have a different name than the original project. The first
 try was 'Termjnal', then 'Terminals', than 'PurpleTerms'.

## Cursor blink by CSS? <a name="id20210512o1521"></a> &nbsp; <sup><sub><sup><sup>_Todo 20210512°1521_</sup></sup></sub></sup>

Replace the cursor made blinking with `timeout()`
by one made blinking with CSS `animation`.

References e.g.:
 • [MDN page 'CSS → animation'](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
  <sup><sub><sup>20210512°1513</sup></sub></sup>,
 • CodeBoxx article [How To Create Blinking Text & Background Animation In Pure CSS](https://code-boxx.com/css-blinking-animation/)
  <sup><sub><sup>20210512°1512</sup></sub></sup>

Priority: Low. Would fit the general direction to reduce code wherever possible.

---

## Browser Compatibility <a name="notes_browser_compatibility"></a> &nbsp; <sup><sub><sup><sup>_Subject&nbsp;20210512°1311_</sup></sup></sub></sup>

Terminals supports **IE=>9**. Here are some points :

- Function `scrollTo()` is skipped for IE by feature detection. Thus IE may show rough movements.

- `ChildNode.remove()` is unknown to IE.
See MDN [ChildNode.remove()](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove).
This was fixed by using the [element-remove](https://github.com/chenzhenxi/element-remove) Polyfill.

- Assignment of undefined. IE will assign the string 'undefined' to a string, if the
   sorce string is undefined, the others will assign ''. This happened in line 20170501°0941
   with broken version `oTerm._inputLine.textContent = oTerm._inputLine.textPrefix;`,
   then fixed `oTerm._inputLine.textContent = oTerm._inputLine.textPrefix ? oTerm._inputLine.textPrefix : '';`

- On multi-instance pages with IE, the cursors are sometimes blinking in all
 boxes, which can make it puzzling to see, which of them is the responsive one.

Search for `20210512°1317` to get a list of the involved locations.

---

## Base64 Encoding <a name="notes_base64"></a> &nbsp; <sup><sub><sup><sup>_Article&nbsp;20210511°1213_</sup></sup></sub></sup>

The provided **beep** comes not as a sound file, but as a variable with the
 **base64** encoding of the sound file. I was brought to my attention, that
 other developers might consider the use of base64 technique as a **security**
 concern.

The news I found in a hurry, told me, that some PHP base64 encoding/decoding
 functions had issues.

For the present JavaScript scenario, I cannot imagine any realistic issue.
 Nevertheless I want compile a list of what comes to my mind, that could
 theoretically be wrong with the base64 sound data.

- First option. The **original** sound file has malicious bytes in it. It
 has nothing to do with base64 encoding. The attack vector is a player with
 a vulnerability such that by crafted bytes it can be tricked into doing
 something unwanted. The affair has two parties: The source of the sound file
 and the audio player.

- Next option. The original sound file is good, but during the download, a
 **man-in-the-middle**, sits in the line, who manipulates the byte stream to
 introduce her crafted bytes.

- The medicine against above two cases, is to cross-check the acquired file.
 This is hopefully done automatically in a first step, by the malware **scanner**
 of the machine to where the file is downloaded. In case of doubt, an online
 scanner can be seeked additionally.

- The next option is the base64 **encoder**. This is either an online service
 or a locally installed tool. If this service or tool is vicious, it returns
 a string, not after the plain base64 algorithm, but manipulated purposeful.

- The medicine against this is more expensive, since the mandatory malware
 scanner might not notice this (or do they?). The file or string has to be
 **decoded** again — in fact by a different service or tool, than the encoding
 one, with might not reveal it's own intrigues. Then the scanner can smell
 the rat. The question upfront is: 'Do I trust the encoding service or tool?'

- If finally the base64 string is proofed clean, and is put as a variable into
 the JavaScript file, the danger seems over. Manipulations of the **JavaScript
 file** with the embedded base64 data should be noticed by the version control
 software. Also to some degree, GitHub may provide us the service to look for
 malicious bytes (it's their reptuation as well, after all).

- From this point on, it is the responsibility of the **JavaScript engine**
 in the user's browser, to do no harm. If the user's browser is evil, the user
 will have bigger problems than a bad sound anyway, she will be lost all along.

This were first quick associations, not yet settled, definitely to be refined.

I am very interested to learn, what I have overlooked in the process.

---

## The Instance ID <a name="notes_instanceid"></a> &nbsp; <sup><sub><sup><sup>_Feature&nbsp;20210509°1651_</sup></sup></sub></sup>

Each terminal instance the user creates with `new Terminal()` gets an instance
ID, which can be asked for with `getId()`.

... see API Documentation ...

---

## Prompt Feature <a name="id20210509o1511"></a> &nbsp; <sup><sub><sup><sup>_Feature&nbsp;20210509°1511_</sup></sup></sub></sup>

**Preliminary note**. For prompt generation, I can imagine three techniques :

- The first idea were, to **prepend** them as strings to the input and the output line.
 This is most quickly implemented, but then it gets complicated to separate prompt
 from values again. It possibly draws a lot of debugging after.

- Use CSS **pseudo-element** `before`. This technique is used here. Pro: Clean separation
 between prompt and value, no need to discern them, since they never touch. Con:
 The prompts are not part of a selection for the clipboard and are just missing there.

- Use **separate variables** for prompt and for values, connect them only on
 the screen, not in the program. I have never seen this solution implemented.
 So the following judgement is a wild guess. Con: If you take the content
 of the terminal into the clipboard, the prompts will be preserved. Con: The
 implementation efford seems higher as with the pseudo-element solution.

**Implementation**

Here the pseudo-element technique is applied :

- There exist JavaScript **generated CSS rules**, different for the input and the
 output lines, regarding the `before` pseudo-element, which carries the prompt.

- The input/output lines are provided with the respective **class attributes**.
 This way the prompts are faded-in.

- The prompts can be changed by the user via **setter**. _[Perhaps not yet]_

- The output line must be discerned into those which have been output from
 the beginning, and those which were formerly input lines. This is done by giving
 the API function `print(msg)` an **optional second parameter** `print(msg, rule)`.
 With the help of this parameter, when the former input line is printed in the
 history, the different prompt can be preserved.

**Debug Borders**. They are implemented as a preparation for the prompt implementation.

Todo <sup><sub><sup>20210509°1541</sup></sub></sup> : Implement **`setConfirmPrompt()`**,
 e.g. with '?' as default prompt, to mark lines from a `confirm()` call.

Consideration <sup><sub><sup>20210509°1543</sup></sub></sup> : The current
 prompt implementation in pure CSS has two disadvantages. (1) If you change
 the prompt at one point in time, it will be changed also for the past lines.
 (2) The prompts do not make it into the clipboard. The both could be fixed
 by using the CSS mechanism only for the current line, and if that line goes
 into history, the CSS prompt will be replaced by a real string prompt.

---

## Fork List <a name="fork_list"></a> &nbsp; <sup><sub><sup><sup>_Paragraph&nbsp;20210507°1611_</sup></sup></sub></sup>

Here is a list of active forks (as of May 2021). The list helps to find
 out, which solutions the colleagues deviced for the input prompt feature
 (see issue '[Simplify input prompt handling](#id20210504o1041)'),
 and which are popular features in general.

 - [bryant1410](https://github.com/bryant1410/terminaljs) —
   [PR #5 Fix .. Markdown files](https://github.com/eosterberg/terminaljs/pull/5)
   , merged on 2017-May-03. *Worked off.*

 - [commanddotcom](https://github.com/commanddotcom/terminaljs) —
   [PR #11 XHR](https://github.com/eosterberg/terminaljs/pull/11)
   , not merged but integrated here.
   • AJAX request
   • Dollar input prompt
   • Backspace utilization.
   *Worked off.*

 - [DarwinSenior](https://github.com/DarwinSenior/terminaljs) —
   Last commit 2014-Nov-12
   , [PR #1 Added password feature](https://github.com/eosterberg/terminaljs/pull/1)
   , merged on 2014-Nov-14. *Worked off.*

 - [MarkIvanowich](https://github.com/MarkIvanowich/terminaljs) —
   [PR #2 Added some functions](https://github.com/eosterberg/terminaljs/pull/2)
   , not merged but partially integrated here. Features: • History • Pylon • Formatted output.
   *Worked off.*

 - [wblommaert](https://github.com/wblommaert/terminaljs") —
   Features: • History • Pylon • Formatted output.
   *Worked off.*

 - [mdrunner](https://github.com/mdrunner/terminaljs) —
   Features: • History • Other interesting code ..

 - [MrWooJ](https://github.com/MrWooJ/terminaljs) —
   Features: • Colored output • More ..

 - [oxalorg](https://github.com/oxalorg/terminaljs) —
   Features: • Input prompt

 - [dvv](https://github.com/dvv/terminaljs) —
   Features: • ... *[Todo : Inspect.]*

 - [Samyoul](https://github.com/Samyoul/terminaljs) —
   Features: • Resizable box • Animated demo GIF • v3.0

 - [gogoprog](https://github.com/gogoprog/terminaljs) —
   Features: • Project rewrite in [Haxe](https://haxe.org/)

 - [ugurkodak](https://github.com/ugurkodak/terminaljs) —
   Features: • ... *[Todo : Inspect.]*

---

## AJAX/XHR <a name="id20210430o1711"></a> &nbsp; <sup><sub><sup><sup>_Paragraph&nbsp;20210430°1711_</sup></sup></sub></sup>

Pull request [HTTP backend via XHR](https://github.com/eosterberg/terminaljs/pull/11)
 on 2020-Sep-07 from
 [commanddotcom/terminaljs](https://github.com/commanddotcom/terminaljs)
 is about to communicate with a PHP or any other backend. I have implemented
 this pull request blindly, not yet tested. The PR carried two more features,
 a dollar prompt and utilization of the backspace key.

An XHR or AJAX feature is in fact the reason why I got my hands dirty with
 `terminal.js`. I already have written code to utilize AJAX. That code leaves
 `terminal.js` untouched, instead, a custom JavaScript file in parallel does
 the work. See the [Custom Demo](./custom.html) with the [`custom.*`](./) files.
 The feature works only for localhost so far, not online.

Having implemented Yevgen's XHR feature into `terminal.js` brings me to
 questions. XHR makes no sense on it`s own right, only together with a backend.
 Since Terminals is a library, not an application, it shall not know, who will
 use it in which way. So the questions are: (1) Where exactly shall the line
 be drawn between library and user code? (2) Is it already defined, what
 exactly Terminals should do, and what not?

I will learn more about this questions, when attempting to switch the Custom
 Demo from the custom module to Yevgen's interface function.

---

## PR 'Additional functions' <a name="id20210430o1821"></a> &nbsp; <sup><sub><sup><sup>_Paragraph&nbsp;20210430°1821_</sup></sup></sub></sup>

This are session notes about working off pull request
 '[Added some additional functions](https://github.com/eosterberg/terminaljs/pull/2)'
 from 2015-Feb-25 by [MarkIvanowich](https://github.com/MarkIvanowich).
 The PR contains four features :

 - New feature **Input History** —
  Status: Code **implemented** blindly on 2021-May-03. Does not (yet) work,
  but also seems nothing to break. Needs debugging now to get going.

 - New API function **`this.load()`** — Generates a pylon, means a process bar.
  Status : Not implemented, looks too complex. See details below.

 - New API function **`this.printraw()`** —
  Status : Not implemented. See concerns below.

 - New API function **`this.empty()`** — Prints a blank line.
  Status : Not (yet) implemented. *Todo: Look again.*

Note on **`this.printraw()`**.
 _Prints HTML formatted text on a new line. Links and images can be added
 via respective HTML formatting._ I am afraid, it is a too advanced feature
 for the present little project. We will not get away with the lines provided
 in the pull request. The feature may introduce the need for voluminous
 `if` conditions to prevent erroneous or even malicious HTML.

Note on **`this.load()`**, generating a pylon.
 The feature is cool, but I judge it too complex. It costs a new prompt type
 `PROMPT_LOAD = 4`, an additional private function `processCheck()`
 plus about 35 new lines, intertweened in existing conditions, complicating
 maintenance significantly (see e.g.
 [MarkIvanowich/&#8203;.../&#8203;terminal.js#&#8203;L33-&#8203;L59](https://github.com/MarkIvanowich/terminaljs/blob/master/terminal.js#L33-L59)
 and [.../&#8203;test.html#&#8203;L66-&#8203;L80](https://github.com/MarkIvanowich/terminaljs/blob/master/test.html#L66-L80)).

Oops. The pylon brings me to another suggestion. It exists API function
 `this.print()`, which prints a line. What about adding **`printChar()`**,
 which prints one character at the end of the current line or the last history
 line? Such behaviour is a common console feature, it would allow the user to
 animate a pylon herself via ordinary API calls. See _todo 20210430°1831
 'Print char'_.

Proposal : Implement `this.printChar()` which prints one character at the end
 of the current line. This might be not soo trivial, because it will possibly
 have to operate on a line being already in history, not an ordinary input
 line. It looks as if such feature had something in common with utilizing
 the backspace key, but probably it will be two totally different things,
 since the backspace operates on the input line, not on a history line.
 <sup><sub><sup>_Todo&nbsp;20210430°1831&nbsp;'Print char'_</sup></sub></sup>

---

## Retrieving Keystrokes <a name="retrieving_keystrokes"></a> &nbsp; <sup><sub><sup><sup>_Article&nbsp;20210430°1601_</sup></sup></sub></sup>

Gumbarros' pull request
[Fix to deprecated KeyCodes](https://github.com/eosterberg/terminaljs/pull/12)
from 2020-Oct-19 wants replace code like `'e.which === 37'` by code like `'e.code === 'ArrowUp'`.
This prompted me for a closer look on the topic 'e.which versus e.code'.

**Bottom line**.
State-of-the-art for identifiying a key is using **`e.code`**.
Only that breaks IE. Since the program otherwise
still supports IE>=10, I did not yet throw out **`e.which`**,
but combined the both à la `if (e.code === 'Enter' || e.which === 13)`.
_See it in [`terminal.js`](./terminal.js) by searching `20210430°1551`_.

For reading keyboard input, two questions are to tackle:
1. **How exactly can a key press be caught?**
   For detecting key strokes, there exist multiple functions.
   Notably, there is no simple function like `getKey()`,
   instead only the halfe-done events `e.onkeydown()` and/or `e.onkeyup()`.

2. **Which constant can then identify the caught key?**
   Once a key event is caught, there are numerous ways to identify it's content.


For question one, if `e` is a
[GlobalEventHandler](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)
or a more specific [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent),
players to catch a key press are :
- `e.`[`keypress`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event) — Deprecated
- `e.`[`onkeydown`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeydown) — Used here
- `e.`[`onkeypress`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeypress) — Deprecated
- `e.`[`onkeyup`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeyup) — Used here

For question two, players to identify a key are :
- `e.`[`charCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode) — Deprecated
- `e.`[`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) — Current
- `e.`[`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) — Accounts for the modifieres (Shift, Alt, Ctrl)
- `e.`[`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) — Deprecated
- `e.`[`which`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which) — Deprecated
- `e.`[`getModifierState()`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState) — In case you want get more sophisticated
- Not considered are operating system specific native scancodes and virtual keycodes.

Further reference(s) :

- Maria D. Campbell's articles [e.keyCode || e.which?](https://www.mariadcampbell.com/blog/e-keycode-e-which/)
  <sup hidden>[ref 20210430°1622]</sup> from 2018-Feb-05 and
  [Guess the keys](https://www.mariadcampbell.com/blog/guess-the-keys/)
  <sup hidden>[ref 20210430°1624]</sup>
  from 2018-Feb-05 with the corresponding game
  [Guess the keys and press them!](https://interglobalmedia.github.io/guess-the-keys/)
  <sup hidden>[ref 20210430°1625]</sup>
  plus the associated code in
  [`keypress.js`](https://interglobalmedia.github.io/guess-the-keys/keypress.js).
  <sup hidden>[ref 20210430°1626]</sup>
  Interestingly she does not use `e.code` but **`e.keyCode`**.

---

## GFM — GitHub Flavoured Markdown <a name="github_flavored_markdown"></a> &nbsp; <sup><sub><sup><sup>_Section&nbsp;20210506°0931_</sup></sup></sub></sup>

<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="float:right;" width="64" height="64" alt="Grainy Dummy 1">

This paragraph is **unrelated** to Terminals. This are little experiments
 serving me to understand the differences between
 [GFM](https://github.github.com/gfm/) and my local Markdown renderer
 [Showdown](https://github.com/showdownjs/showdown).
 _On the next best occasion, I will throw this paragraph out of the project._

> His line is written with a `>` prepended.
 Findings: GitHub does mark the line as citation, Showdown does indent it but not otherwise mark.

               .Holla — This line starts on column 16 with a dot.
Findings (on the dot line above): GitHub and Showdown the both print this line
formatted as code, indented as given, and not whitespace-broken if too long.

Can an image be right aligned? I am trying `style="float:right;"` and `align="right"`.
Findings: GiHub does not work with `style="float:right;"`, but with the legacy `align="right"`.
Showdown works with the both.
<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="clear:both" align="right" width="64" height="64" alt="Grainy Dummy 2">

 This are some '`Prepared Food (Meals) Emoji`' :
  Bacon            🥓 |
  Baguette Bread   🥖 |
  Bowl With Spoon  🥣 |
  Cheese Wedge     🧀 |
  Croissant        🥐 |
  Green Salad      🥗 |
  Hamburger        🍔 |
  Hot Dog          🌭 |
  Pizza            🍕 |
  Poultry Leg      🍗 |
  Pretzel          🥨 |
  Waffle           🧇 |
BTW. Practical emoji overviews provides e.g. [Emojigraph](https://emojigraph.org/).

---

---

## Session Logs <a name="id20210512o1911"></a>

This are session logs, the most boring section of all documentation.

---

### Scroll and jump <a name=""></a> &nbsp; <sup><sub><sup><sup>_Session&nbsp;20210511°1521_</sup></sup></sub></sup>

About feature 'Auto scrolling service' <sup><sub><sup><sup>_Feature&nbsp;20210511°1511_</sup></sup></sub></sup>

This session shall make automatic scrolling in the box functional.
 So far, the session succeeded only half-way.

(1) First idea, but which makes no sense : Send a CTRL-End to the box.
 To facilitate this, first the box had to listen to this key, what it
 does not (yet).
 <br> • See e.g. https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically [ref 20210511°1418]
 ܀

(2) Then comes a bunch of articles on how to scroll from JavaScript.
 Here the articles bunch, so far without solution :
 <br> • https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page [ref 20210511°1412]
 <br> • https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView [ref 20210511°1414] Yield no solution
 <br> • https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo [ref 20210511°1416]
 <br> • https://stackoverflow.com/questions/7600454/how-to-prevent-page-scrolling-when-scrolling-a-div-element [ref 20210511°1422]
 ܀

(3) Solve the cursor-must-stay-visible task, but not yet the jump. A line like
 below works, but there is a remaining issue, as the complete page jumps at some
 point, e.g. when the cursor in the box invisibly reaches the bottom of the page.
 <br> • This effect fires, whether the programmatic scrolling is applied or not
 <br> • Thus it seems sensible to first fight this jump, then continiue with the
        programmatic scrolling or the overscroll-behaviour, resp. Here the lines:
 <br> • `this.html.scrollTo(0, this._innerWindow.scrollHeight);`     // Works
 <br> • `this.html.scrollTo(0, this._output.scrollHeight);`          // Works
 <br> • `this._innerWindow.scrollTo(0, this._output.scrollHeight);`  // Fails
 ܀

(4) The pure CSS **overscroll-behaviour** technique.
 See issue 20210511°1427 'Make overscroll-behaviour work'.
 Would the overscroll CSS incidentially solve the page jump issue?
 I cannot know, since I just could overscroll not make work.
 CSS overscroll were much more elegant, just did not work.
 ܀

issue 20210511°1427 'Make overscroll-behaviour work'
 <br> • Matter : Style overscroll-behaviour just does not work as expected.
 <br> • Do : Make it working
 <br> • Ben Nadel's article describes overscroll-behaviour with a nice demo.
      Cool CSS in general in the demo, not to mention overscroll.
      Url : https://www.bennadel.com/blog/3698-using-css-overscroll-behavior-to-prevent-scrolling-of-parent-containers-from-within-overflow-containers.htm [ref 20210511°1426]
 <br> • See : https://bennadel.github.io/JavaScript-Demos/demos/chrome-scroll-overscroll-behavior/ [ref 20210511°1428]
 <br> • See : https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior [ref 20210511°1424]
 <br> • See line line 20210511°1531 CSS overscroll-behaviour
 <br> • Status : Open
 ܀

issue 20210511°1525 'Get rid of page jumps'
 <br> Matter : If cursor (invisibly) reaches page bottom, the page jumps up.
 <br> (1) Solve the basic jump.
 <br> (1.1) Where happen the jump? In line 20170501°0931 "inputField.focus();"
 <br> (1.2) What can be done against? Line 20210511°1545 "window.scrollTo(0,0);"
 <br> (2) Unfortunately, from some later point on, a second jump appears,
      in fact not with the Enter key, but with normal input.
 <br> (2.1) Since this appears only later, I will postpone the debuggin.
 <br> (3) Actually, the solution so far may be not satisfactory at all, because
      it forces the user to stay on page top. This is not acceptable.
 <br> (4) Fight the stay-on-top by taking the current scroll-positon into account.
 <br> (4.1) This is done with helper variable 20210511°1548
 <br> (4.2) It works perfectly in the beginning, but from the point, where
        formerly the jump happened, there is with each input a little
        shift in direction to top.
 <br> (4.3) That little jump does not happen there, but if some input key
       is pressed. Not the Enter key but the first input character
       keydown. Any subsequent input do no more jump.
 <br> (5) Where happens the little jump?
 <br> (5.1) This is hard to debug, due to the event driven nature of
        the program. The debugger runs into an endless timer loop
        with setTimeout() in seq 20170501°0941. It looks as if the
        behaviour in the debugger is different from that without.
 <br> (6) I give up for today. The demo seems to work passable with the first
         20 or more input lines, only then behaviour gets crazy. The issue
         may be alleviated anyway, if planned **line-buffer size** is
         implemented.
 ܀

issue 20210511°1811 'Line buffer size'
 <br> • Planned : Feature 'Line buffer size'. Has default value of e.g. 500,
        can be set other size. If number of lines in the output div reach
        that size, the top lines are deleted.
 <br> • Status : Open
 ܀

issue 20210511°1611 'Lower boxes shall keep feet still'
 <br> • Do : Make additonal boxes on page bottom not cause jumps on page open.
 <br> • Findings : (1) I re-open sequences 20210511°1541 and 20210511°1543.
    (2) They now do no more show the page-jump behaviour like at the
    beginning of this session, when I have them shutdown to get a better
    starting point for debugging the other issues. It looks like their
    jumping has been solved by the way. All the better.
 <br> • Status : Solved by brute-force in-box scrolling e.g line 20210511°1545
 ܀

issue 20210511°1621 'Cursor and scroll behaviour in general'
 <br> • Matter : The solution style I followed today is not sustainable.
    It yielded insights into the program structure, but was provisory
    anyway. For a sustainable solution, things must get simplified.
 <br> • Status : Long-running
 ܀

---

<img src="./docs/20210512o1743.waving-astronaut.v2.p12.png" align="right" width="192" height="192" alt="Waving Astronaut">

## References <a name="id20210512o1611"></a> &nbsp; <sup><sub><sup><sup>_Subsection&nbsp;20210512°1611_</sup></sup></sub></sup>

 • Article
 • [How to roll a dice in JavaScript?](https://medium.com/@rocambille/how-to-roll-a-dice-in-javascript-ec543f8ffda1)
 • by Romain Guillemot
 • on 2019-Jul-30
 • <sup><sub>in https://medium.com/@rocambille/how-to-roll-a-dice-in-javascript-ec543f8ffda1</sub></sup>
 • <sup><sub>used in _func 20210510°1751_ `rollDice()`</sub></sup>
 • <sup><sub>_[ref 20210510°1755 'Dice roll']_</sub></sup>

---

<sup><sub>[file 20210430°1551] ܀Ω</sub></sup>
