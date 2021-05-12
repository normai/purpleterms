Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API](./api.md) &nbsp;
 • Notes &nbsp;
 • [Todos](./todos.md) &nbsp;
 • [ChangeLog](./changelog.md) &nbsp;
 • [License](./license.md)

# Notes

Below : &nbsp;
• [Prompts](#notes_prompts) &nbsp;
• [Fork list](#fork_list) &nbsp;
• [PR 'XHR'](#pull_request_backend_via_xhr) &nbsp;
• [PR 'Add printHTML'](#pull_request_add_printhtml) &nbsp;
• [PR 'Additional functions'](#pull_request_additional_functions) &nbsp;
• [Retrieving Keystrokes](#retrieving_keystrokes)

_This file is for miscellanesous notes and considerations._

 Some 'Prepared Food (Meals) Emoji' :
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

---

## The Instance ID <a name="notes_instanceid"></a> &nbsp; _<sup><sub><sup><sup>Feature 20210509°1651</sup></sup></sub></sup>_

..

---

## The Prompts <a name="notes_prompts"></a> &nbsp; _<sup><sub><sup><sup>Feature 20210509°1451</sup></sup></sub></sup>_

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

**Debug Borders**. As preparation for the prompt implementation, the debug
borders were invented.

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

Note. The PR silently carried two more features, the dollar prompt, which
 lead to *[issue 20210502°1121](#id20210502o1121)* 'Input prepended by dollar',
 and the utilization of the Backspace key.

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

<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="float:right;" width="64" height="64" alt="Grainy Dummy 1">

Here is a little experiment with GitHub Markdown, entirely unrelated to Termjnal.
Can an image be right aligned? Findings: Not with `style="float:right;"`,
but with the legacy `align="right"`.
<sup><sub><sup>*Paragraph 20210506°0931*</sup></sub></sup>
<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="clear:both" align="right" width="64" height="64" alt="Grainy Dummy 2">

---

<a name="id20210504o1041"></a>
issue //20210504°1041 '**Simplify input prompt handling**'
 - Matter : This is a follow up on finished *[issue 20210502°1121](#id20210502o1121)*
   'Input prepended by dollar'. Though the bug there is fixed, the topic lingers.
   I noticed complexities with the prompt handling, which possibly can be reduced.
   I consider the prompt feature as a very basic one. As long as this is
   not solved cleanly, it makes no sense to put further features on top.
 - Type : Refactoring.
 - Status : Open.
   ܀

---

<a name="id20210502o1121"></a>
issue 20210502°1121 'Input prepended by dollar'
 - Symptom : Each input is automatically prepended by dollar sign.
 - Finding : After change 20210502°1111 'XHR', each input line is prefixed
   '$ ' in order to simulate a prompt. This infiltrates the original workflows.
 - Solution : I removed that dollar sign prefix again. Instead, quick'n'dirty,
      provided a setter setInputPrompt(string), where the user who needs it,
      can individually prepend the input with some string [fix 20210504°1031].
 - Note : The additional setter(s) blow up the setter bunch. What about some
      single JSON options object? Anyway — This would not save lines on user
      side, nor in the documentation.
 - Note : While I am writing setInputPrompt(), I write a setOutputPrompt().
      right off, since in I will like to flag output symmetrically to input.
 - Note : While investigating the other forks, I noticed the prompt being a
      recurring theme. About 5 forks have written prompts, including myself.
 - Note : I remember my own solution not touching Termjnal, but operating
      purely on user code side. I should review (haven't done yet).
 - Resume : The solution with function 20210504°1011 setInputPrompt was quickly
      done without really analysing the complexity of the involved sequences.
      I suspect, there is room for simplification. Calculating  string width of
      the input to determinate the prompt seems no clear solution. It mixes two
      concerns. The prompt and the input value should be two clearly distinct
      entities, without the need for string length calculations. See
      *[issue 20210504°1041](#id20210504o1041)* 'Simplify input prompt handling'.)
 - Status : Closed with fix 20210504°1031 'introduce setInputPrompt()'.
   ܀

---

<sup><sub>[file 20210430°1551] ܀Ω</sub></sup>
