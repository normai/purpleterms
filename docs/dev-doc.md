Other pages : &nbsp;
 • [ReadMe](./../README.md) &nbsp;
 • [API Doc](./api-doc.md) &nbsp;
 • Dev Doc &nbsp;
 • [Notes](./notes.md) &nbsp;
 • [Issues](./issues.md) &nbsp;
 • [Changes](./changes.md) &nbsp;
 • [Credits](./credits.md)

<img src="./20210512o1713.purple-bellied-lory.v2.x0256y0256.png" align="right" width="128" height="128" alt="Purple-Bellied Lory">

# Developers Documentation

Subsections : &nbsp;
 • [Overview](#id20210513o1121)
 • [Complete](#id20210513o1125)
 • [TerminalCtor](#id20210513o1131)
 • [promptInput](#id20210513o1135)
 • [terminalBeep](#id20210513o1141)
 • [Legend](#id20210513o1145)

<a name="id20210513o1121"></a>
## Overview

This are just NetBeans Navigator screenshots, to provide an overview,
 what's in there, including an educated interpretation, expressed by the icons.

### Complete program collapsed <a name="id20210513o1125"></a>

<img src="./20210513o0922.nb-navigator-collapsed.png" align="center" width="454" height="440" alt="Complete program collapsed">

### Function `TerminalCtor` expanded <a name="id20210513o1131"></a>

<img src="./20210513o0923.nb-navigator-terminalctor.png" align="center" width="421" height="777" alt="Function terminalCtor expanded">

### Function `promptInput` expanded <a name="id20210513o1135"></a>

<img src="./20210513o0924.nb-navigator-promptinput.png" align="center" width="792" height="636" alt="Function promptInput expanded">

Note the funny types of the `inputValue` and `textContent` variables. Have they
 really to be so complex? Can this perhaps be simplified?

### Variable `terminalBeep` expanded <a name="id20210513o1141"></a>

<img src="./20210513o0925.nb-navigator-terminalbeep.png" align="center" width="417" height="128" alt="Variable terminalBeep expanded">

This little panel can help to comprehend, how the NetBeans Navigator works,
 because it is so small, and one can easily trace in the code, what's there.
 Why does it show `innerHTML`, but not `outerHTML`? It just collects the
 identifiers it can find, and assigns them an icon.

### Legend <a name="id20210513o1145"></a>

It is not soo clear, what the icons mean exactly. The legends
 are rare, here are some :

-  Oracle help chapter 6.3.1 'Browsing Java Files', subsection
 [Icon - Description](https://docs.oracle.com/cd/E50453_01/doc.80/e50452/work_java_code.htm#r1c1-t5).

- Oracle page 'Working with NetBeans IDE' subsection
 [Table 2-16 Icons in the Code Completion Window](https://docs.oracle.com/netbeans/nb81/netbeans/develop/working_nbeans.htm#sthref75)

-  Apache Netbeans page 'Code Assistance in the NetBeans IDE Java
 Editor: A Reference Guide', which is about C++ :
 [Appendix A: Icons in the Code Completion Window](https://netbeans.apache.org/kb/docs/java/editor-codereference.html#_appendix_a_icons_in_the_code_completion_window).

This are all not a really pervasive legends.

The icons are to be taken with a grain of salt anyway. The icons are made for
 OOP languages. JavaScript is not really object oriented, though this is often
 stated. The OO features are not programmed by means of keywords, instead are
 built at own risk with the help of design patterns. The ES5 `class` keyword
 does not change this situation, it is only syntactic sugar on the surface.

Howsoever. Even if the icons are not clear in every detail, graphics
 like above I find a great help to comprehend a program's concept.

<img src="./20210512o1743.waving-astronaut.v2.p12.png" align="right" width="96" height="96" alt="Waving Kosmonaut">

<sup><sub>Todo: Make a icon legend.</sub></sup> <sup><sub><sup>20210513°1211</sup></sub></sup>

&nbsp;

---

<sup><sub>File 20210513°1111 ܀Ω</sub></sup>
