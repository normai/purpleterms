<style>
   span.Time12Stamp { font-size:x-small; color:LightSlateGray; font-style:italic; white-space:nowrap; font-weight:normal; vertical-align:super; }
   span.Time12Hidden { display:none; }
</style>

# Notes

This file makes room to store considerations around `terminal.js`.
If any statement grows lengthy, it should be outsourced.

## Retrieving keystrokes <a name="retrieving_keystrokes"></a><span class="Time12Stamp">[article 20210430°1601]</span>

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
  <span class="Time12Hidden">[ref 20210430°1622]</span> from 2018-Feb-05 and
  [Guess the keys](https://www.mariadcampbell.com/blog/guess-the-keys/)
  <span class="Time12Hidden">[ref 20210430°1624]</span>
  from 2018-Feb-05 with the corresponding game
  [Guess the keys and press them!](https://interglobalmedia.github.io/guess-the-keys/)
  <span class="Time12Hidden">[ref 20210430°1625]</span>
  plus the associated code in
  [`keypress.js`](https://interglobalmedia.github.io/guess-the-keys/keypress.js).
  <span class="Time12Hidden">[ref 20210430°1626]</span>
  Interestingly she does not use `e.code` but **`e.keyCode`**.

---

<sup><sub>[file 20210430°1551] ܀Ω</sub></sup>
