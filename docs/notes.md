Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API Doc](./apidoc.md) &nbsp;
 • Notes &nbsp;
 • [Todos](./todos.md) &nbsp;
 • [ChangeLog](./changelog.md) &nbsp;
 • [License](./license.md)

# Notes

Below : &nbsp;
• [Fork list](#fork_list) &nbsp;
• [PR 'XHR'](#pull_request_backend_via_xhr) &nbsp;
• [PR 'Add printHTML'](#pull_request_add_printhtml) &nbsp;
• [PR 'Additional functions'](#pull_request_additional_functions) &nbsp;
• [Retrieving Keystrokes](#retrieving_keystrokes)

_This file is for miscellanesous notes and considerations._


## Fork List <a name="fork_list"></a> &nbsp; <sup><sub><sup><sup>Paragraph 20210507°1611</sup></sup></sub></sup>

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


## PR 2020-Sep-07 'XHR' <a name="pull_request_backend_via_xhr"></a> &nbsp; <sup><sub><sup><sup>Paragraph 20210430°1711</sup></sup></sub></sup>

Pull request [HTTP backend via XHR](https://github.com/eosterberg/terminaljs/pull/11)
by [Yevgen Shevchenko](https://github.com/commanddotcom) on 2020-Sep-07
([fork](https://github.com/commanddotcom/terminaljs))
is about to communicate with a PHP or any other backend.

Status : **Implemented**.

Note. The PR silently carried two more features, the dollar prompt, which
 lead to *[issue 20210502°1121](#id20210502o1121)* 'Input prepended by dollar',
 and the utilization of the Backspace key.

Actually, such XHR feature is the reason why I got my hands dirty
with Terminal.js in the first place. I have written a backend caller for myself,
which is different in such a way, that it leaves `terminal.js` untouched.
Instead, it consists of a custom JS file, not located here, but there. The file is
[`daftari/jsi/dafterm.js`](https://downtown.trilo.de/svn/daftaridev/trunk/daftari/jsi/dafterm.js),
it works only for localhost, not online so far.

The XHR feature brings me to questions.
XHR makes no sense on it`s own right, only together with a backend.
Terminal.js is a library, not an application. Thus it must not know,
who will use it in which way. The questions are:
Where exactly shall the line be drawn between library and user code?
Is it already clear, what exactly Terminal.js should do, and what not?

I will learn more about this questions, when attempting to switch my own
use case from the custom module to Yevgen's interface function.

## PR 2017-Dec-22 'Add printHTML' <a name="pull_request_add_printhtml"></a> &nbsp; <sup><sub><sup><sup>Paragraph 20210430°1811</sup></sup></sub></sup>

Pull request
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6)
by [theLMGN](https://github.com/theLMGN) on 2017-Dec-22 consists of one commit
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6/commits/af16ce1c913afdea95c551ae81b2f23827c0c0db)
. It is a naming proposal to call Mark's function `this.printraw()`
better suiting `this.printHTML()`.

## PR 2015-Feb-25 'Additional functions' <a name="pull_request_additional_functions"></a> &nbsp; <sup><sub><sup><sup>Paragraph 20210430°1821</sup></sup></sub></sup>

In pull request '[Added some additional functions](https://github.com/eosterberg/terminaljs/pull/2)'
from 2015-Feb-25, [MarkIvanowich](https://github.com/MarkIvanowich)
proposes multiple features.

**Bottom line**. This are about 120 new code lines to consider.
 The PR consists of three commits :

 1. [Adding functions and loading bar](https://github.com/eosterberg/terminaljs/pull/2/commits/7b6d0f3d69c9980ab9d62594a6069a452e2c4270)
    — In this commit is the code. It adds
    • `.empty()`
    • `.printraw(html)`
    • `.load(name, message, width, progress, callback)`
    • `.clearhistory()`
    • `.history`
    • `.lasthistory`

 2. [Cleaned comments, empty lines](https://github.com/eosterberg/terminaljs/pull/2/commits/9843e480934086e5beb9bb2fd662480dd3065977)
    — Some streamlining

 3. [Update README.md](https://github.com/eosterberg/terminaljs/pull/2/commits/b129084e5a8be545b8aebfd5247fda48046c3444)
    — Some documentation fixes

Status of four found features :

 - History — Code **implemented** blindly (2021-May-03). Does not yet work, but also
   seems nothing to break. Needs debugging now to get going.

 - Pylon (process bar) — **Not** implemented, seems too complex, see details below.

 - `printRaw()` — **Not** implemented. See concerns below.

 - `empty()` — **Not** implemented. Cannot recognize the purpose, see details below.

Details found in the commits :

- New prompt type `PROMPT_LOAD = 4` — Needed for the pylon

- New function `processCheck()` — Internally used (for pylon?)

- New function **`this.empty()`** — Prints a blank line. I am not sure about the
  difference to the already existing `.print()` giving that `&nbsp;` as parameter.

- New function **`this.printraw(html)`**
  — _Prints html-formatted text on a new line. Links and images can be added via respective HTML formatting._
  This a really cool feature. But I am afraid, it is also a much more advanced
  feature than the little project can lift at the moment. It will not be done
  with the lines provided in the pull request. It may introduce the need for
  voluminous `if` conditions to prevent erroneous or even malicious HTML.
  Remember the project slogan '_A dead simple simple JavaScript library ..._'.

- New function `this.load()` — Generate a **pylon** (progress bar).
  Nice proposal, but I judge it too complex. It costs a new prompt type plus
  about 35 new lines, intertweened in existing conditions, complicating
  maintenance significantly (
  [MarkIvanowich/\*/terminal.js#L33-L59](https://github.com/MarkIvanowich/terminaljs/blob/master/terminal.js#L33-L59)
  and
  [\*/test.html#L66-L80](https://github.com/MarkIvanowich/terminaljs/blob/master/test.html#L66-L80)
   )
  <br><br>
  Oops. This brings me to another suggestion. So far we have `print()`,
  printing a line. I'd like to add `printChar()`, printing one character at the
  end of the current line, which is is a common console feature. That would
  allow the user to animate a pylon herself via ordinary API calls.

- New function `this.clearHistory()` — Wanted in connection with the history feature

- New array **`this.history`** with appendage  — Repeating former input
  with ArrowUp/&#8203;ArrowDown is a really cool feature. High priority.

## Retrieving Keystrokes <a name="retrieving_keystrokes"></a> &nbsp; <sup><sub><sup><sup>Article 20210430°1601</sup></sup></sub></sup>

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

Here is a little experiment with GitHub Markdown, entirely unrelated to Terminal.js.
Can an image be right aligned? Findings: Not with `style="float:right;"`,
but with the legacy `align="right"`.
<sup><sub><sup>*Paragraph 20210506°0931*</sup></sub></sup>
<img src="./20090504o2215.grainydummy180sq.v0.x0128y0128q66.jpg" style="clear:both" align="right" width="64" height="64" alt="Grainy Dummy 2">

---

<a name="id20210504o1041"></a>
issue 20210504°1041 '**Simplify input prompt handling**'
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
 - Note : I remember my own solution not touching Terminal.js, but operating
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
