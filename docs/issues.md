Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API](./api.md) &nbsp;
 • [Notes](./notes.md) &nbsp;
 • Issues &nbsp;
 • [Changes](./changelog.md) &nbsp;
 • [Credits](./../credits.md)

## Issues and Todos

---


##### Issue 'Fully initialize object, only then return it' _<sup><sub><sup><sub>20210509°1731</sub></sup></sub></sup>_

Matter : It is no good idea, to return from seq 20210509°1641 without the
 this.html having initialized. Properties like setHeight() should
 function for the user. This were possible by rearrange the code,
 so e.g.  definitions like getHeight() get located before this return.
 The user may use them after she got the object. Only if we keep the
 object functional, we should give it to the user. Sorrily I have no
 quick solution for such procedure.
 Workaround : In case of illegal ID parameter, dispose that and
 use a generated ID.
 status : Open

---

##### Todo 'Complete Aloha Demo' _<sup><sub><sup><sub>20210509°1351</sub></sup></sub></sup>_

Demonstrate complete feature list <del>notably `confirm`<del>.

---

##### Issue 'Validate user prompt' _<sup><sub><sup><sub>20210509°1555</sub></sup></sub></sup>_

In `setInputPrompt()` and `setInputPrompt()`, the user-given parameter
 should be validated somehow, so it cannot disturb the system.
 E.g. • Size must be 0 to 8, • chars below ASCII 32 are not allowed.
 For implementation compare seq 20210509°1644 ' Validate characters'. Possibly
 outsource that sequence to create one dedicated function for the two purposes.

---

#### Todo 'Compact Custom Demo' _<sup><sub><sup><sub>20210509°1341</sub></sup></sub></sup>_

Merge the two JS files, remove unrelated code.

---

#### Todo 'Fix backspace behaviour' _<sup><sub><sup><sub>20210509°1331</sub></sup></sub></sup>_

Tow points: • The backspace empties the complete line, but it shall remove only one character.
• The removed content re-appears with the next input.

---

#### Todo 'Fix missing scroll' _<sup><sub><sup><sub>20210509°1321</sub></sup></sub></sup>_

If the output goes below the box bottom, it disappears.
But the last line needs to stay always visible.

---

#### Todo 'Fix missing prompt setter' _<sup><sub><sup><sub>20210509°1311</sub></sup></sub></sup>_

Routine work, just must be done.

---

#### Todo 'Investigate using MIDI for the beep' _<sup><sub><sup><sub>20210509°0921</sub></sup></sub></sup>_

Using MIDI for the beep would dramatically reduce file size. Only I'm afraid
 it will be at the expense of browser compatibility. Find inspiration in project
 [MidiProbe](https://www.trekta.biz/svn/midiprobedev/trunk/midiprobe/index.html).

---

#### Todo 'Get smaller beep file' _<sup><sub><sup><sub>20210509°0911</sub></sup></sub></sup>_

58.5 KB for one beep is too much. See variable `sBase64_Beep_Mp3` _<sup><sub><sup>20190325°0751_</sup></sub></sup>.
An MP3 file around 20 KB should be feasible, perhaps even 10 KB or less.

---

<a name="id20210504o1041"></a>
<del>issue 20210504°1041 '**Simplify input prompt handling**'</del>
 - <del>Matter : I noticed complexities with the prompt handling, which possibly can
   be reduced. I consider the prompt feature as a very basic one. As long as this
   is not solved cleanly, it makes no sense to put further features on top.</del>
 - <del>Note. This was a follow up on deleted issue 20210502°1121 'Input prepended by dollar'.</del>
 - <del>Status : Closed with introduction of feature _20210509°1511_ 'Prompt setting'.</del>
   ܀

Temporary internal notes for the cleanup-session. There are three features the involved :

 - Feature 20210509°1401 'Debug Borders'. To get better grip on the matter.

 - Feature 20210509°1511 'Prompt Setting'. The actual feature. Provisory a
    global prompt, not yet per-instance.
    See Notes paragraph [Note Prompts](./notes.md#notes_prompts).

 - Feature 20210509°1651 'Instance-ID Setting'. Prerequisite to make the prompt
    work per-instance, not globally.

---

```
   issue 20210502°1351 'What exactly does style.overflow'?
   matter : In the ~original styling, this.html.style.overflow = 'auto' is used.
   do : Clear, what exactly overflow effects, and whether it may be sensible at other
      places as well. E.g. with the planned automatic linebreak for too long lines.
   location : line 20210502°1133 this.html.style.overflow = 'auto';
   status : ..
```

See Article
'[Using CSS Overscroll-Behavior To Prevent Scrolling Of Parent Containers From Within Overflow Containers](https://www.bennadel.com/blog/3698-using-css-overscroll-behavior-to-prevent-scrolling-of-parent-containers-from-within-overflow-containers.htm)'
 _<sup><sub><sup>ref 20210511°1426<sup><sub><sup>_ :
 *The panel becomes **scrollable** due to content overflow*.


---

```
   issue 20210502°1341 'Learn GoCloCom parameter types'
   matter : The GoCloCom error messages are sometimes puzzling.
      E.g. in func 20210502°1211 connect(), func 20210509°1631 getId(),
      and var 20210509°1633,  GoCloCom complains about parameter types.
   todo : Learn how to handle types not experimentally but knowingly.
   locations : Multiple
```

---

<sup><sub>[file 20210503°1411] ܀Ω</sub></sup>
