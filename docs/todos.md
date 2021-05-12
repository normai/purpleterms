Pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API](./api.md) &nbsp;
 • [Notes](./notes.md) &nbsp;
 • Todos &nbsp;
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

<sup><sub>[file 20210503°1411] ܀Ω</sub></sup>
