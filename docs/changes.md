Other pages : &nbsp;
 •&nbsp;[ReadMe](./../README.md) &nbsp;
 •&nbsp;[API&nbsp;Doc](./api-doc.md) &nbsp;
 •&nbsp;[Dev&nbsp;Doc](./dev-doc.md) &nbsp;
 •&nbsp;[Notes](./notes.md) &nbsp;
 •&nbsp;[Issues](./issues.md) &nbsp;
 •&nbsp;Changes &nbsp;
 •&nbsp;[Credits](./credits.md)

<img src="./20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="128" height="128" alt="Purple-Bellied Lory">

# Changes

##### version 20220205°0951 — v0.3.4 — Intermediate
- Minor documentation edits

##### version 20210517°1241 — v0.3.3 — Streamline 'undefined' use

##### version 20210515°0915 — v0.3.2 — Module name `purpleterms.js`
- Merge custom JavaScript and custom PHP files [chg 20210514°0931]
- Make Custom Demo passable
- Rename files `terminal.*` to `purpleterms.*` [chg 20210515°0911]

##### version 20210513°1651 — v0.3.1.1 Volume control
 - Little fixes
 - Add API function setVolume() [chg 20210513°1625]

##### version 20210513°1517 — v0.3.1 Dynamic styles per instance
 - Add Waving Astronaut
 - Shift code around
 - Add page 'Developer Documentation'
 - Dynamic styles per instance [chg 20210513°1441]
 - Try project name 'Purple Terms'


##### log 20210512°1811 — v0.3.0.6 Lory
- Add Purple Bellied Lory
- Try name 'Terminals'


##### log 20210512°1411 — v0.3.0.5 Cleanup


##### log 20210511°1711 — v0.3.0.4 Work on scrolling (Zappelphilipp)
- Implement plain prompt in aloha.html dispatcher loop
- Put more boxes on aloha.html (to test instance behaviour)
- Replace beep, big and loud vs. small and soft [chg 20210511°1311]
        (Numbers: mp3 file 58.5 bytes vs. 10.2 bytes; terminal.js
         104.8 KB vs 50.7 KB; terminal.min.js 63. KB vs. 20.6 KB)
- Work on scrolling (issue 20210511°1525 'Get rid of page jumps',


##### log 20210510°1445 — v0.3.0.3 Cleanup timestamps
- Cleanup timestamps
- Little edits


##### version 20210509°1811 — v0.3.0 Prompts proof-of-concept
- Complete debug borders
- Fix input prompt
- Activate instance ID


##### log 20210509°1111 — v0.2.9.9
- Implement Simple Demo
- Integrate Custom Demo
- Implement PHP detector [Feature 20210509°1011]
- Project name change experiment

##### log 20210508°1234 — v0.2.9.8
- Debug borders proof-of-concept
- License change

##### log 20210507°1733 — v0.2.9.7
- Replace excessive forks pages by paragraph in notes.md
- Dynamic CSS rules proof-of-concept

##### log 20210507°0951 — v0.2.9.5 Intermediate
- Streamline Supply Suite pages
- Restore 'Play the beep'

##### log 20210506°1512 — v0.2.9.4 Intermediate
- Add files for Kilo Demo

##### log 20210506°0921 — v0.2.9.3 Intermediate
- Refine Aloha Demo

#### version 20210505°1752 — v0.2.9 'Set up Forks Suite'
- Set up Forks Suite

#### log 20210503°1815 — v0.2.8.8 'Intermediate'
- Outsource API Documentation from `readme.md` to dedicated page
- issue 20210502°1121 'Input prepended by dollar'

##### log 20210503°1813 — v0.2.8.7 'Intermediate'
- Add docs folder
- Shift files around
- Set up Aloha Demo

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
- Cosmetics for an input prompt (sequence 20190312°0441)

#### version 20190213°0333 — v0.2.1 'Self-sufficient folder'
- Add `beep.mp3` and `beep.ogg` from www.erikosterberg.com/terminaljs/
- Add function `getThisScriptFolder`. Now the script tag in page must define
      an attribute `id="TerminalJsScriptTag"`. _[This is soon removed again]_
- Styling : Supplement semicolons

#### version 20190208°1847 — v0.2.0 'Getting familiar'
- Remove some NetBeans warnings

#### log 2019-02-08'18:44 — 'Fork project'
- NorMai : Cloning version v2.0
  from [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/))
  to  [github.&#8203;com/&#8203;normai/&#8203;terminaljs](https://github.com/normai/terminaljs/))

## version v2.0 Final <sup><sub>2017-05-03'23:32</sub></sup>
- Eric Österberg is committing 'Merge pull request [#5](https://github.com/eosterberg/terminaljs/pull/5)
  [from bryant1410/master](https://github.com/eosterberg/terminaljs/commit/8e0b6c23a640cb141abfbc08e67d74d9a64860a9)'.
  This commit constitutes the long-term version on
  [github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/).
  This version is also conserved in tag
  [v2.0 — Final 2017](https://github.com/normai/terminaljs/releases/tag/v2.0).

#### log 2017-04-18'06:14.GMT+2
- Commit by Santiago Castro : 'Fix broken Markdown'
     on https://github.com/bryant1410/terminaljs

#### log 2016-11-16'20:07.GMT+1
- Eric Österberg — Commit ...

#### log 2014-11-12'04:36.GMT+1
- DarwinSenior — Added and documented password feature

<img src="./20210512o1743.waving-astronaut.v2.p12.png" align="right" width="96" height="96" alt="Waving Astronaut">

#### log 2013-04-05'10:06.GMT+2
- Eric Österberg — First commit to
[github.&#8203;com/&#8203;eosterberg/&#8203;terminaljs](https://github.com/eosterberg/terminaljs/)

---

<sup><sub>[file 20210429°0911] ܀Ω</sub></sup>
