Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API](./api.md) &nbsp;
 • [Notes](./notes.md) &nbsp;
 • Issues &nbsp;
 • [ChangeLog](./changelog.md) &nbsp;
 • [License](./../license.md)

## Issues and Todos

---

##### issue 20210509°1731 'Fully initialize object, only then return'

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

#### Todo 'Complete Aloha Demo' _<sup><sub><sup><sub>20210509°1351</sub></sup></sub></sup>_

Demonstrate complete feature list, notably `confirm`.

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

<sup><sub>[file 20210503°1411] ܀Ω</sub></sup>
