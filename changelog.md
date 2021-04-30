# Changelog

_The history of **TerminalJs**
from the perspective of [NorMai's fork](https://github.com/normai/terminaljs)_

##### version 20210430°0911 — v0.2.6rc 'Closure-Compiler Advanced'
* Make [Closure-Compiler](https://developers.google.com/closure/compiler/)
  work in [advanced mode](https://developers.google.com/closure/compiler/docs/api-tutorial3).
  Notes: (1) The size reduction is not worth the effort (only from 78 KB to 60 KB).
  The points are the following. (2) Structure and syntax are verified to be state-of-the-art.
  (3) File [`externs.js`](./externs.js)  acts as a strict API definition,
   directly utilizable by the library users.
* Read path to Closure-Compiler from primitive config file
   [`path-to-closure-compiler.txt`](./path-to-closure-compiler.txt),
   so individual pathes can be provided without touching the build script
* Styling : Replace all tabs by triple-blanks

##### version 20210429°0931 — v0.2.5 'Add Minification'
- Supplement Python build script [`build.py`](./build.py) calling Closure-Compiler in simple mode

##### version 20190326°0111 — v0.2.3 'Standalone script'
- Integrate `beep.mp3` as a base64-encoded string into `terminal.js`
- Cosmetics for an input prompt (see sequence 20190312°0441)

##### version 20190213°0333 — v0.2.1 'Self-sufficient folder'
- Add `beep.mp3` and `beep.ogg` from www.erikosterberg.com/terminaljs/
- Add function `getThisScriptFolder`. Now the script tag in page must define
      an attribute `id="TerminalJsScriptTag"`. _[This is soon removed again]_
- Styling : Supplement semicolons

##### version 20190208°1847 — v0.2.0 'Getting familiar'
- Remove some NetBeans warnings

##### log 2019-02-08'18:44 — 'Forking'
- NorMai : Clone version v2.0
     from [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/))
     to  [github.&#8203;com/&#8203;normai/&#8203;terminaljs](https://github.com/normai/terminaljs/))

#### version 2017-05-03'23:32 — v2.0 'Final'
- Eric Österberg : Merge pull request 2017-04-18'06:14.GMT+2 from Santiag Castro.
  This is the version showing up today (2021-04-30) on
  [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/))

##### log 2017-04-18'06:14.GMT+2
- Commit by Santiag Castro : 'Fix broken Markdown'
     on https://github.com/bryant1410/terminaljs

##### log 2016-11-16'20:07.GMT+1
- Eric Österberg — Commit ...

##### log 2013-04-05'10:06.GMT+2
- Eric Österberg — First commit to
[github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/)

---
<sup><sub>[file 20210429°0911] ܀Ω</sub></sup>
