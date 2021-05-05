Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API Doc](./apidoc.md) &nbsp;
 • [Notes](./notes.md) &nbsp;
 • ChangeLog &nbsp;
 • [License](./license.md)

# Changelog

Here is the history of [NorMai's fork](https://github.com/normai/terminaljs) of Terminal.js.


#### commit 20210503°1815 — v0.2.8.8 'Intermediate'
- Add docs folder
- Outsource API Documentation from `readme.md` to dedicated page
- Shift files around
- Set up Aloha Demo
- issue 20210502°1121 'Input prepended by dollar'


#### version 20210503°1111 — v0.2.8 'Pull requests worked off'
- Sort members in code and documentation
- Implement XHR after PR 2020-Sep-07 'Backend XHR' [chg 20210502°1111]
- Implement history after PR 2015-Feb-25 'Additional functions' [chg 20210503°0907]


#### version 20210501°1112 — v0.2.7 'Start working off pull requests'
- Started to work off the
  [pending pull requests](https://github.com/eosterberg/terminaljs/pulls).
  The current status is : • PR 2020-Oct-19 '[KeyCodes](./notes.md#retrieving_keystrokes)' integrated and closed
  • PR 2020-Sep-07 '[Backend XHR](./notes.md#pull_request_backend_via_xhr)' inspected and flagged high priority
  • PR 2017-Dec-22 '[Add printHTML](./notes.md#pull_request_add_printhtml)' inspected
  • PR 2015-Feb-25 '[Additional Functions](./notes.md#pull_request_additional_functions)' inspected and postponed


#### chg 20210430°1551 — Work off PR 2020-Oct-19 'KeyCodes'
* Work off pull request
  '[Fix to deprecated KeyCodes](https://github.com/eosterberg/terminaljs/pull/12)'
  by [gumbarros](https://github.com/gumbarros) on 2020-Oct-19
  <sup>[ref 20210430°1516]</sup>.
  I did not follow the pull request exactly,  instead left the old
  style beside the new style in order to save IE10 compatibility.
  See note [Retrieving keystrokes](./notes.md#retrieving_keystrokes).


#### log 20210430°1331 — Inspect PR 2020-Sep-07 'Backend XHR'
- Inspecting pull request
  *[HTTP backend via XHR](https://github.com/eosterberg/terminaljs/pull/11)*
  by [commanddotcom](https://github.com/commanddotcom) on 2020-Sep-07
  from his [fork](https://github.com/commanddotcom/terminaljs)
  <sup>[ref 20210430°1515]</sup>.
  Flagged with hight priority.
  See note [Pull Request 'Backend via XHR'](./notes.md#pull_request_backend_via_xhr).


#### log 20210430°1321 — Inspect PR 2017-Dec-22 'Add printHTML'
- Inspecting pull request
  '[Add printHTML](https://github.com/eosterberg/terminaljs/pull/6)'
   by [theLMGN](https://github.com/theLMGN) on 2017-Dec-22
  <sup>[ref 20210430°1514]]</sup>.
  Not sure I want implement this.
  See note [Pull Request 'Add printHTML'](./notes.md#pull_request_add_printhtml).


#### log 20210430°1311 — Inspect PR 2015-Feb-25 'Additional Functions'
* Inspecting pull request
  '[Added some additional functions](https://github.com/eosterberg/terminaljs/pull/2)'
  by [MarkIvanowich](https://github.com/MarkIvanowich) on 2015-Feb-25.
  The changes in this pull request were too extensive
  to be quickly processed, I have to postpone this.
  Details see note [Pull Request 'Additional functions'](./notes.md#pull_request_additional_functions).


#### version 20210430°1212 — v0.2.6 'Closure-Compiler Advanced'
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


#### version 20210429°0931 — v0.2.5 'Add Minification'
- Supplement Python build script [`build.py`](./build.py) calling Closure-Compiler in simple mode


#### version 20190326°0111 — v0.2.3 'Standalone script'
- Integrate `beep.mp3` as a base64-encoded string into `terminal.js`
- Cosmetics for an input prompt (see sequence 20190312°0441)


#### version 20190213°0333 — v0.2.1 'Self-sufficient folder'
- Add `beep.mp3` and `beep.ogg` from www.erikosterberg.com/terminaljs/
- Add function `getThisScriptFolder`. Now the script tag in page must define
      an attribute `id="TerminalJsScriptTag"`. _[This is soon removed again]_
- Styling : Supplement semicolons


#### version 20190208°1847 — v0.2.0 'Getting familiar'
- Remove some NetBeans warnings


#### log 2019-02-08'18:44 — 'Fork project'
- NorMai : Clone version v2.0
     from [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/))
     to  [github.&#8203;com/&#8203;normai/&#8203;terminaljs](https://github.com/normai/terminaljs/))


### version 2017-05-03'23:32 — v2.0 Final
- Eric Österberg committed 'Merge pull request #5 from bryant1410/master'.
  This is the longterm version on
  [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/).
  This version is conserved as well in tag
  [v2.0 — Final 2017](https://github.com/normai/terminaljs/releases/tag/v2.0).


#### log 2017-04-18'06:14.GMT+2
- Commit by Santiago Castro : 'Fix broken Markdown'
     on https://github.com/bryant1410/terminaljs


#### log 2016-11-16'20:07.GMT+1
- Eric Österberg — Commit ...


#### log 2014-11-12'04:36.GMT+1
- DarwinSenior — Added and documented password feature


#### log 2013-04-05'10:06.GMT+2
- Eric Österberg — First commit to
[github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/)

---

<sup><sub>[file 20210429°0911] ܀Ω</sub></sup>
