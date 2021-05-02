# Notes

Subchapters : &nbsp;
• [Pull Request 'Backend via XHR'](#pull_request_backend_via_xhr) &nbsp;
• [Pull Request 'Add printHTML'](#pull_request_add_printhtml) &nbsp;
• [Pull Request 'Additional functions'](#pull_request_additional_functions) &nbsp;
• [About Retrieving Keystrokes](#about_retrieving_keystrokes)

_This file makes room to store considerations around `terminal.js`.
If any statement grows lengthy and generic,
like article [About Retrieving Keystrokes](#about_retrieving_keystrokes),
it should be outsourced._

## Pull Request 'Backend via XHR' <a name="pull_request_backend_via_xhr"></a><sup><sup><sub>[article 20210430°1711]</sub></sup></sup>

Pull request [HTTP backend via XHR](https://github.com/eosterberg/terminaljs/pull/11)
by [Yevgen Shevchenko](https://github.com/commanddotcom) on 2020-Sep-07
([fork](https://github.com/commanddotcom/terminaljs))
is about to communicate with a PHP or any other backend.

**Bottom line**.
High priority! I won't come off the cuff implementing it,
but I envisage it as my very next step with TerminalJs (however fast this will be).

Actually, this feature is the reason why I got my hands dirty with `terminal.js` in the first place.

And indeed I have already written a backend caller for myself.
My implementation leaves `terminal.js` untouched,
instead consists of a parallel custom JS module not visible here.
It runs only on localhost so far. The file is
[`daftari/jsi/dafterm.js`](https://downtown.trilo.de/svn/daftaridev/trunk/daftari/jsi/dafterm.js).

Yevgen's code will ease the load on my custom module.

I am not sure about the details yet. I guess, my construction goes even one step further.
The backend shall use the terminal autonomously for output, while still allowing user intervention.

## Pull Request 'Add printHTML' <a name="pull_request_add_printhtml"></a><sup><sup><sub>[article 20210430°1811]</sub></sup></sup>

Pull request
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6)
by [theLMGN](https://github.com/theLMGN) on 2017-Dec-22
consists of one single commit
[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6/commits/af16ce1c913afdea95c551ae81b2f23827c0c0db)
.

This is just a naming proposal. MarkIvanowich's function `this.printraw()`
might get the better suiting name `this.printHTML()`.

**Bottom line**. I cannot not see the need of this
function additional to the already existing output facility.
I guess, it offers better formatting options, which were really nice.
But this has no priority for me right now.
Thus I postpone the thorough processing.

Remember the project slogan
'_A dead simple simple JavaScript library ..._'.
This points out to be extremely strict with new features.

## Pull Request 'Additional functions' <a name="pull_request_additional_functions"></a><sup><sup><sub>[article 20210430°1821]</sub></sup></sup>

In pull request [Added some additional functions](https://github.com/eosterberg/terminaljs/pull/2)
from 2015-Feb-25, [MarkIvanowich](https://github.com/MarkIvanowich)
offers multiple nice features.

**Bottom line**. There are about 120 meaningful new lines to consider.
Sorrily I had not the capacity to process this quick enough,
so I had to postpone thorough processing.
At least below is an overview compiled, what I found.

This are three commits :

 1. [Adding functions and loading bar](https://github.com/eosterberg/terminaljs/pull/2/commits/7b6d0f3d69c9980ab9d62594a6069a452e2c4270)
    — In here is the core of the matter

 2. [Cleaned comments, empty lines](https://github.com/eosterberg/terminaljs/pull/2/commits/9843e480934086e5beb9bb2fd662480dd3065977)
    — This does not matter here

 3. [Update README.md](https://github.com/eosterberg/terminaljs/pull/2/commits/b129084e5a8be545b8aebfd5247fda48046c3444)
    — Mentions `this.empty()` and `this.printraw(html)`

The involved changes are :

- New prompt type `PROMPT_LOAD = 4` — Needed for the pylon

- New function `processCheck()` — Internally used

- New function **`this.empty()`** — Prints a blank line. Nice-to-have but not vital.

- New function **`this.printraw(html)`**
  — Allows arbitrary formatting the output, including e.g. images.
  Surely nice! But I suspect, this is a much more advanced feature
  than a _dead simple library_ in it's initial state can bear.
  It might open the field for voluminous conditions,
  for accidentially providing erroneous HTML
  and last not least for security concerns.

- New function `this.load()` — Generates a pylon. Nice-to-have but not vital

- New function `this.clearHistory()` — Wanted in connection with the history feature

- New array **`this.history`** with appendage  — Repeating former input with ArrowUp/&#8203;ArrowDown is a really cool feature. High priority!



## About Retrieving Keystrokes <a name="about_retrieving_keystrokes"></a><sup><sup><sub>[article 20210430°1601]</sub></sup></sup>

Gumbarros' pull request
[Fix to deprecated KeyCodes](https://github.com/eosterberg/terminaljs/pull/12)
from 2020-Oct-19 wants exchange code like `'e.which === 37'` by code like `'e.code === 'ArrowUp'`.
This prompted me for a closer look on the topic 'e.which versus e.code'.

**Bottom line**.
State-of-the-art for identifiying a key is using **`e.code`**.
Only that is no more understood by IE. Since the program otherwise
still supports IE>=10, I did not yet throw out **`e.which`**,
but combined the both à la `if (e.code === 'Enter' || e.which === 13)`.
_See it in [`terminal.js`](./terminal.js) by searching `20210430°1551`_.


For reading keyboard input, two questions are to tackle:
1. For detecting key strokes, there exist multiple functions.
    Notably, there is no simple function like `getKey()`,
    instead only the halfe-done events `e.onkeydown()` and/or `e.onkeyup()'.
    **How exactly can keys be retrieved?**
2. Once a key event is caught, there are numerous ways to identify it's content.
    **Which constants can identify the pressed key?**

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

<sup><sub>[file 20210430°1551] ܀Ω</sub></sup>
