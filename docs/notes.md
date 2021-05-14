Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API](./api.md) &nbsp;
 • Notes &nbsp;
 • [Issues](./issues.md) &nbsp;
 • [Changes](./changelog.md) &nbsp;
 • [License](./license.md)

# Notes

Below : &nbsp;
• [Compatibility](#notes_browser_compatibility) &nbsp;
• [Base64](#notes_base64) &nbsp;
• [Prompts](#notes_prompts) &nbsp;
• [Fork list](#fork_list) &nbsp;
• [PR 'XHR'](#pull_request_backend_via_xhr) &nbsp;
• [PR 'Add printHTML'](#pull_request_add_printhtml) &nbsp;
• [PR 'Additional functions'](#pull_request_additional_functions) &nbsp;
• [Retrieving Keystrokes](#retrieving_keystrokes)
• *([GFM](#github_flavored_markdown))*

This page stores developer notes, partially too detailled, not interesting for library users.

---

## Browser Compatibility <a name="notes_browser_compatibility"></a> &nbsp; _<sup><sub><sup><sup>Subject 20210512°1311</sup></sup></sub></sup>_

Termjnal supports **IE=>9**. Here are some points :

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

## Base64 Encoding <a name="notes_base64"></a> &nbsp; _<sup><sub><sup><sup>Article 20210511°1213</sup></sup></sub></sup>_

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

## The Instance ID <a name="notes_instanceid"></a> &nbsp; _<sup><sub><sup><sup>Feature 20210509°1651</sup></sup></sub></sup>_

Each terminal instance the user creates with `new Terminal()` gets an instance
ID, which can be asked for with `getId()`.

... see API Documentation ...

---

## The Prompts <a name="notes_prompts"></a> &nbsp; _<sup><sub><sup><sup>Feature 20210509°1511</sup></sup></sub></sup>_

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

---

## Fork List <a name="fork_list"></a> &nbsp; _<sup><sub><sup><sup>Paragraph 20210507°1611</sup></sup></sub></sup>_

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

## PR 2020-Sep-07 'XHR' <a name="pull_request_backend_via_xhr"></a> &nbsp; _<sup><sub><sup><sup>Paragraph 20210430°1711</sup></sup></sub></sup>_

Pull request [HTTP backend via XHR](https://github.com/eosterberg/terminaljs/pull/11)
by [Yevgen Shevchenko](https://github.com/commanddotcom) on 2020-Sep-07
([fork](https://github.com/commanddotcom/terminaljs))
is about to communicate with a PHP or any other backend.

Status : **Implemented**.

Note. The PR carried two more features, a dollar prompt and utilization of the Backspace key.

Actually, such XHR feature is the reason why I got my hands dirty
 with `terminal.js` in the first place. I have written a backend caller for
 myself, which is different in such a way, that it leaves `terminal.js` untouched.
 Instead, it consists of a custom JS file, not located here, but there. The file is
 [`daftari/jsi/dafterm.js`](https://downtown.trilo.de/svn/daftaridev/trunk/daftari/jsi/dafterm.js),
 it works only for localhost, not online so far.

The XHR feature brings me to questions.
XHR makes no sense on it`s own right, only together with a backend.
Termjnal is a library, not an application. Thus it must not know,
who will use it in which way. The questions are:
Where exactly shall the line be drawn between library and user code?
Is it already clear, what exactly Termjnal should do, and what not?

I will learn more about this questions, when attempting to switch my own
use case from the custom module to Yevgen's interface function.

---

## PR 2017-Dec-22 'Add printHTML' <a name="pull_request_add_printhtml"></a> &nbsp; _<sup><sub><sup><sup>Paragraph 20210430°1811</sup></sup></sub></sup>_

Pull request
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6)
by [theLMGN](https://github.com/theLMGN) on 2017-Dec-22 consists of one commit
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6/commits/af16ce1c913afdea95c551ae81b2f23827c0c0db)
. It is a naming proposal to call Mark's function `this.printraw()`
better suiting `this.printHTML()`.

---

## PR 2015-Feb-25 'Additional functions' <a name="pull_request_additional_functions"></a> &nbsp; _<sup><sub><sup><sup>Paragraph 20210430°1821</sup></sup></sub></sup>_

About working off pull request
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

 Oops. The pylon brings me to another suggestion. We have `this.print()`,
 which prints a line. I'd like to add **`this.printChar()`**, which prints one
 character at the end of the current line. This is a common console feature,
 it would allow the user to animate a pylon herself via ordinary API calls.

---

## Retrieving Keystrokes <a name="retrieving_keystrokes"></a> &nbsp; _<sup><sub><sup><sup>Article 20210430°1601</sup></sup></sub></sup>_

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

## GFM — GitHub Flavoured Markdown <a name="github_flavored_markdown"></a> &nbsp; _<sup><sub><sup><sup>Section&nbsp;20210506°0931</sup></sup></sub></sup>_

<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="float:right;" width="64" height="64" alt="Grainy Dummy 1">

This paragraph is **unrelated** to Termjnal. This are little experiments
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

<sup><sub>[file 20210430°1551] ܀Ω</sub></sup>
