/*!
 * Termjnal v0.3.0.3~~ — Provides a terminal in the browser
 * BSD 3-Clause License
 * (c) 2014 Erik Österberg | https://github.com/eosterberg/terminaljs/
 * (c) 2021 Norbert C. Maier and contributors | https://github.com/normai/terminaljs/
 */

/**
 *  file : 20190208°1921 terminaljs/terminal.js
 *  encoding : UTF-8-without-BOM
 */

/**
 *  This class provides a div with the terminal functionalities
 *
 * @id 20190208°1923
 */
Terminal = ( function () {


   // Provisory global variable until the dynamic CSS works on a per-instance [var 20210509°1535]
   var _inputPromptGlobal = ">\\00a0";

   // Provisory global variable until the dynamic CSS works on a per-instance [var 20210509°1537]
   var _outputPromptGlobal = "<\\00a0";


   /**
    *  Prompt mode 'Confirmation'
    *
    * @id 20170501°0211
    * @type {number} —
    * @constant —
    */
   var PROMPT_CONFIRM = 3;

   /**
    *  Prompt mode 'Input'
    *
    * @id 20170501°0221
    * @type {number} —
    * @constant —
    */
   var PROMPT_INPUT = 1;

   /**
    *  Prompt mode 'Password'
    *
    * @id 20170501°0231
    * @type {number} —
    * @constant —
    */
   var PROMPT_PASSWORD = 2;

   /**
    *  Ugly helper var to avoid validation warnings 'unreachable code'.
    *  Sometimes I like to keep dead code as for possible later reviving.
    *
    * @id 20210502°1711
    * @type {boolean} —
    * @constant —
    */
   var b_Choose_Div_Not_Pre = true; // No more used for the Div/Pre decision, but left here anyway for any next use case

   /**
    *  This array holds the IDs of the instances on the page
    *
    * @id 20210509°1611
    * @type {Array}
    */
   var _aIds = [];

   /**
    *  This flag tells, whether debug borders are shown or not. Default = false
    *
    * @id 20210508°0913
    * @todo : This were rather not a page global setting but an object property. Adjust this! [todo 20210508°0931]
    * @type {boolean} —
    */
   var _debugBorders = false;

   /**
    *  Helper flag to fire 'inputField.focus()' after initialization
    *
    * @id 20170501°0241
    * @type {boolean} —
    */
   var firstPrompt = true;

   /**
    *  This global function generates an ID
    * 
    * @param {string|number|null} idGiven —
    * @return {string} —
    */
   var _generateId = function(idGiven) {

      var sIdRet = '';

      // () ID Validation [seq 20210509°1621]
      // (.1) Given or not?
      if (! idGiven) {
         // (.1.1) No ID given, so create one [seq 20210509°1642]
         var iCount = 0;
         while (true) {
            iCount++;
            if ( _aIds.indexOf(iCount.toString()) >= 0 ) {
               continue;
            }
            break;
         }
         sIdRet = iCount.toString();
      }
      else {
         // (.1.2) It is a given ID, so test it for being allowed
         var bAllowed = true;
         
         // (.1.2.1) Validate length [seq 20210509°1643]
         if (idGiven.length < 1 || idGiven.length > 32) {
            bAllowed = false;
         }

         // (.1.2.2) Validate characters [seq 20210509°1644]
         if (bAllowed) {
            for (var i = 0; i < idGiven.length; i++) {
               var c = idGiven.charAt(i);
               if (! c.match(/[a-zA-Z0-9_]/i) ) {
                  bAllowed = false;
                  break;
               }
            }
         }

         // (.1.2.3) Validate it being free [seq 20210509°1645]
         if (_aIds.indexOf(idGiven) >= 0) {
            bAllowed = false;
         }

         // (.1.2.4) Judgement [seq 20210509°1641]
         // If given ID is invalid, then generate an automatic one
         // Remember issue 20210509°1731 'First fully initialize object, then return'
         if (! bAllowed) {
            sIdRet = _generateId(null);
         }
         else {
            sIdRet = idGiven.toString();
         }
      }

      return sIdRet;
   };

   /**
    *  This function dynamically provides CSS rules
    *
    * @id  20210507°1641
    * @todo Either this must be called from a place where it is called only once
    *        or it must shield itself from multiple execution. [todo 20210507°1711]
    * @see For CSS entities see https://www.w3schools.com/cssref/css_entities.asp [ref 20210509°1512]

    * @return {undefined}
    */
   var _mountCssRules = function () {

      // Recognize the presently assembled style element
      var sStyleElementId = 'Kog2frh5cbfn47pm';

      // Define colors [seq 20210509°1441]
      var sColorCompleteBox = 'Magenta';
      var sColorOutputBox = 'Gold';
      var sColorOutputLine = 'GreenYellow';
      var sColorOutputPrompt = 'Orange';
      var sColorOutLineInput = 'Magenta';                              // Output line which formerly was input line
      var sColorOutLineInPrompt = 'HotPink';                           // Output line which formerly was input line
      var sColorInputLine = 'Red';
      var sColorInputPrompt = 'Yellow';

      // Create style element, beforehand delete any existing [seq 20210508°0923]
      var el = document.getElementById(sStyleElementId);
      if (el) {
         el.remove();
      }
      var eStyle = document.createElement('style');
      eStyle.type = 'text/css';

      // Provide ID [seq 20210508°0921]
      var at = document.createAttribute('id');
      at.value = sStyleElementId;
      eStyle.setAttributeNode(at);

      // Ruleset for complete terminal box [seq 20210509°1415]
      var sRu1CompleteBox = _debugBorders
                  ? "\n" + 'div.Terminal_Complete {' + ' '
                   + 'border:1px solid ' + sColorCompleteBox + '; border-radius:0.3em; padding:0.2em;' + ' '
                    + "}"
                  : "\n" + 'div.Terminal_Complete { }'
                   ;

      // Ruleset for output box [seq 20210509°1411] 
      var sRu2OutputBox = _debugBorders
                  ? "\n" + 'p.Terminal_Output {' + ' '
                   + 'border:1px solid ' + sColorOutputBox + '; border-radius:0.3em; padding:0.2em;' + ' '
                    + "}"
                  : "\n" + 'p.Terminal_Output { }'
                   ;

      // Ruleset for one line in the output box [seq 20210509°1413]
      var sRu3OutputLine = _debugBorders
                 ? "\n" + "div.Output_One_Line { "
                  + 'border:1px solid ' + sColorOutputLine + '; border-radius:0.3em; padding:0.2em;'
                   + ' }'
                   + "\n" + "div.Output_One_Line:before {"
                   + ' ' + "border:1px solid " + sColorOutputPrompt + "; border-radius:0.2em;"
                    + ' ' + "padding:0.1em; content:'" + _outputPromptGlobal
                     + "'; }"
                : "\n" + "div.Output_One_Line { }"
                 + "\n" + "div.Output_One_Line:before { content:'" + _outputPromptGlobal + "'; }"
                  ;

      // Output line dedicated [seq 20210509°1417]
      var sRu4OutFormerInput = _debugBorders
                 ? "\n" + "div.Terminal_OutputLine_FormerInput { "
                  + 'border:1px solid ' + sColorOutLineInput + '; border-radius:0.3em; padding:0.2em;'
                   + ' }'
                   + "\n" + "div.Terminal_OutputLine_FormerInput:before {"
                   + ' ' + "border:1px solid " + sColorOutLineInPrompt + "; border-radius:0.2em;"
                    + ' ' + "padding:0.1em; content:'" + _inputPromptGlobal
                     + "'; }"
                : "\n" + "div.Terminal_OutputLine_FormerInput { }"
                 + "\n" + "div.Terminal_OutputLine_FormerInput:before { content:'" + _inputPromptGlobal +"'; }"
                  ;

      // Rule set for input span [seq 20190312°0451]
      var sRu5InputLine = '';
      if ( _debugBorders ) {
         sRu5InputLine  = "\n" + "span.Terminal_Input {"
                  + ' ' + 'border:1px solid ' + sColorInputLine + '; border-radius:0.3em; padding:0.2em;'
                   + ' ' + "}"
                   + "\n" + "span.Terminal_Input:before"
                   + ' ' + "{"
                   + ' ' + "border:1px solid " + sColorInputPrompt + "; border-radius:0.2em;"
                    + ' ' + "padding:0.1em; content:'" + _inputPromptGlobal
                     + "'; }"
                      ;
      }
      else {
         sRu5InputLine = "\n" + "span.Terminal_Input { }"
                  + "\n" + "span.Terminal_Input:before { content:'" + _inputPromptGlobal + "'; }"
                   ;
      }

      // Merge th fragments and apply to style element
      eStyle.innerHTML = sRu1CompleteBox + sRu2OutputBox + sRu3OutputLine
                        + sRu4OutFormerInput + sRu5InputLine
                         ;
      document.getElementsByTagName('head')[0].appendChild(eStyle);
   };

   /**
    *  ..
    *
    * @id 20170501°0251
    * @param {Element} inputField —
    * @param {Object} terminalObj —
    * @return {undefined} —
    */
   var fireCursorInterval = function (inputField, terminalObj) {
      var cursor = terminalObj._cursor;
      setTimeout(function () {
         if (inputField.parentElement && terminalObj._shouldBlinkCursor) {
            cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
            fireCursorInterval(inputField, terminalObj);
         } else {
            cursor.style.visibility = 'visible';
         }
      }, 500);
   };

   /**
    *  ..
    *
    * @id 20170501°0311
    * @param {Object} oTerm —
    * @param {string} message —
    * @param {number} PROMPT_TYPE —
    * @param {Function} callback —
    * @return {undefined} —
    */
   var promptInput = function (oTerm, message, PROMPT_TYPE, callback) {

      'use strict';                                                    // Newly introduced, worked out of the box [line 20230510°1531]

      var bShouldDisplayInput = (PROMPT_TYPE === PROMPT_INPUT);
      var inputField = document.createElement('input');

      inputField.style.position = 'absolute';
      inputField.style.zIndex = '-100';
      inputField.style.outline = 'none';
      inputField.style.border = 'none';
      inputField.style.opacity = '0';
      inputField.style.fontSize = '0.2em';

      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      // This prop appears 4 times below -- Check -- Can it be disposed again?!
      ////oTerm._inputLine.textContent = '';                           // Original line
      ////oTerm._inputLine.textPrefix = '$ ';                          // New var introduced [chg 20210502°1111`11 xhr]
      oTerm._inputLine.textContent = oTerm._inputLine.textPrefix;      // [chg 20210502°1111`12 xhr]
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

      oTerm._inputElement.style.display = 'block';
      oTerm.html.appendChild(inputField);
      fireCursorInterval(inputField, oTerm);

      // [condition 20170501°0751]
      // What exactly means 'message.length'? With message null it throws error! Condition seems wrong. [quest 20230510°1521]
      ////if ( message.length ) {
      if ( message !== null ) {                                        // first try
         oTerm.print(PROMPT_TYPE === PROMPT_CONFIRM ? message + ' (y/n)' : message);
      }

      /**
       *  ..
       *
       * @id 20170501°0811
       * @return {undefined} —
       */
      inputField.onblur = function () {
         oTerm._cursor.style.display = 'none';
      };

      /**
       *  ..
       *
       * @id 20170501°0821
       * @return {undefined} —
       */
      inputField.onfocus = function () {
         inputField.value = oTerm._inputLine.textContent;
         oTerm._cursor.style.display = 'inline';
      };

      /**
       *  ..
       *
       * @id 20170501°0831
       * @return {undefined} —
       */
      oTerm.html.onclick = function () {
         inputField.focus();
      };

      /**
       *  ..
       *
       * @id 20170501°0321
       * @param {Event} e —
       * @return {undefined} —
       */
      inputField.onkeydown = function (e) {
         // Listen to backspace [condition 20210502°1131] Condition newly introduced with [chg 20210502°1111`21 xhr]
         // [] Check — Is 'Backspace' really correct? Provide documentation or test function. [issue 20210502°1301 proof key code constant]
         if ( ( ( e.code === 'Backspace' || e.which === 8)
                  && inputField.value.length === inputField.value.length
              )
              || inputField.value.length <= oTerm._inputLine.textPrefix
            ) {
            oTerm._inputLine.textContent = oTerm._inputLine.textPrefix;
            e.preventDefault();
         }
         // Traditional sequence
         else if ( ( e.code === 'ArrowLeft' || e.which === 37 )        // [chg 20210430°1551`01 key code]
             || ( e.code === 'ArrowUp' || e.which === 38 )
             || ( e.code === 'ArrowRight' || e.which === 39 )
             || ( e.code === 'ArrowDown' || e.which === 40 )
             || ( e.code === 'Tab' || e.which === 9 )
               ) {
            e.preventDefault();
         }
         else if ( bShouldDisplayInput && ( ! ( e.code === 'Enter' || e.which === 13 ))) // [chg 20210430°1551`02 key code]
         {
            // Echo after 1 millisecond
            setTimeout(function () {
               oTerm._inputLine.textContent = inputField.value;
            }, 1);
         }
      };

      /**
       *  ..
       *
       * @id 20170501°0331
       * @param {Event} e —
       * @return {boolean|undefined} —
       */
      inputField.onkeyup = function (e) {

         if ( PROMPT_TYPE === PROMPT_CONFIRM
             || ( e.code === 'Enter' || e.which === 13 )               // [chg 20210430°1551`03 key code]
              ) {

            oTerm._inputElement.style.display = 'none';
            var inputValue = inputField.value;

            // [seq 20210502°1221] [chg 20210502°1111`13 xhr]
            // Check — What is this? Does not look like an XHR feature, rather a clear command [note 20210509°1523]
            if (inputValue === oTerm._inputLine.textPrefix + 'clear') {  // textPrefix is undefined here [issue 20210502°1135 'textPrefix undefined']
               oTerm.clear();
               oTerm.input('', false);
               return true;
            }

            if ( bShouldDisplayInput ) {

               // History [seq 20210503°0911 Inserted after Mark — temporarily inactive
               // // oTerm._history.push(inputValue);
               // // oTerm.lasthistory = oTerm._history.length;

               // Added optional second parameter forinput prompt feature [note 20210509°1521]
               oTerm.print(inputValue, 'Terminal_OutputLine_FormerInput');
            }
            oTerm.html.removeChild(inputField);

            // Process remote or local?
            if ( oTerm._backend ) {                                    // [chg 20210502°1111`14 xhr] new flag

               // Ship AJAX request [seq 20210502°1231]
               var xhr = new XMLHttpRequest();
               xhr.open("POST", oTerm._backend, true);
               xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // This possibly needs to be variable for general purpose [issue 20210502°1311 AJAX mime type]
               xhr.onreadystatechange = function() {
                  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { // Add failure catching [issue 20210502°1321 catch AJAX error]
                     oTerm.print(xhr.responseText);
                     oTerm.input('', false);
                  }
               };
               xhr.send( "prefix=" + oTerm._inputLine.textPrefix + "&ssh=" + inputValue );
            }
            else if (typeof(callback) === 'function') {
               // Traditional processing [seq 20170501°0341]
               if (PROMPT_TYPE === PROMPT_CONFIRM) {
                  callback(inputValue.toUpperCase()[0] === 'Y' ? true : false);
               }
               else {
                  callback(inputValue);
               }
            }

            /*
            // History [seq 20210503°0912 after Mark] Not yet activated, probably needs debugging
            if ( PROMPT_TYPE === PROMPT_INPUT ) {
               if ( e.which === 38 && oTerm._historyLast !== - 1) {
                  inputField.value = oTerm._history[(oTerm._historyLast -= 1) > 0
                                    ? oTerm._historyLast
                                     : oTerm._historyLast = 0]
                                      ;
                  oTerm._inputLine.textContent = inputField.value;
               }
               else if ( e.which === 40 && oTerm._historyLast !== -1) {
                  inputField.value = oTerm.history[(oTerm._historyLast += 1) < oTerm.history.length
                                    ? oTerm._historyLast
                                     : oTerm._historyLast = oTerm.history.length]
                                      ;
                  if (oTerm._historyLast === oTerm.history.length) {
                     inputField.value = "";
                  }
                  oTerm._inputLine.textContent = inputField.value;
               }
            }
            */
         }
      };

      // Helper function to save the user a click (???) [seq 20170501°0911]
      if (firstPrompt) {
         firstPrompt = false;
         setTimeout(function () { inputField.focus(); }, 50);
      }
      else {
         inputField.focus();
      }
   };

   /**
    *  ..
    *
    * @id 20170501°0351
    * @type {Element|null} —
    */
   var terminalBeep = null;

   /**
    *  This function provides the div with the terminal functionalities
    *
    * id : 20170501°0851
    * @param {number|string} idParam —
    * @constructor —
    */
   var TerminalConstructor = function (idParam) {


      /*
       * ===============================================
       * Define fields
       *  See issue 20210509°1731 'First fully initialize object, then return'
       * ===============================================
       */
      

      /**
       *  Public field, represents the complete terminal
       *
       * @id 20170501°0411
       * @note Shifted this here from below to have it available with ID failure [chg 20210509°1623]
       * @type {Element} —
       */
      this.html = document.createElement('div');
      this.html.className = 'Terminal';

      // Now that we have ID validation and generation, this sequence must come after the validation [issue 20210509°1625]
      if (typeof(idParam) === 'string') {
         this.html.id = idParam;
      };


      /*
       * ===============================================
       * Define functions
       *  See issue 20210509°1731 'First fully initialize object, then return'
       * ===============================================
       */




      /*
       * ===============================================
       * Start working
       *  See issue 20210509°1731 'First fully initialize object, then return'
       * ===============================================
       */


      // Process ID [seq 20210509°1627]
      var s = _generateId(idParam);
      _aIds.push(s);
      this._objId = s;


      // Create audio element [seq 20170501°0841]
      if (! terminalBeep) {
         terminalBeep = document.createElement('audio');

         // Provide beep file [line 20190325°0753]
         // note : The exact mime-type of an MP3 file is a matter of discussion
         // note : Remember the audio element creation in terminal.js v2.0 with
         //         the interesting mp3/ogg alternative [note 20210507°1621]
         var sData = 'data:audio/mp3;base64,' + sBase64_Beep_Mp3;
         terminalBeep.innerHTML = '<source type="audio/mp3" src="' + sData + '">';
         terminalBeep.volume = 0.05;
      }

      // Provide style(s) [line 20210507°1631]
      // note : Here the function is called with each terminal created on the
      //    page, which is not good. It shall be called exactly once per page
      //    load. But first I want get it work at all. Then, be best option is
      //    to put it somewhere, where it is called only once. The second best
      //    option is, tht the function shields itsels from double mounting.
      _mountCssRules();

      /**
       *  Private field ..
       *
       * @id 20170501°0421
       * @type {Element} —
       */
      this._cursor = document.createElement('span');

      /**
       *  Storage for the history feature after Mark
       *
       * @id 20210503°0921
       * @type {Array} —
       */
      this._history = [];

      /**
       *  Storage for the ID of the instance
       *
       *   This 'declaration' is actually superfluous, it only servers
       *   to have one point-of-delaration at all. But if so, that point
       *   has to be high above, before first use.
       *
       *   Also see issue 20210502°1341 'Learn about GoCloCom parameter types'
       *
       * @id 20210509°1633
       * @type {string|null} —
       */
      /*
       this._objId = this._objId || null; // Hm .. value is already set above
       */

      /**
       *  Counter into the history array (History feature after Mark)
       *  (-1 by default, 0 is a valuable number)
       *
       * @id line 20210503°0923
       * @type {number} —
       */
      this._historyLast = -1;

      /**
       *  ..
       *
       * @id 20170501°0431
       * @type {Element} —
       */
      this._innerWindow = null;                                        // allow the type annotation
      this._innerWindow = document.createElement('div');

      /**
       *  The full element administering the user input, including cursor
       *
       * @id 20170501°0441
       * @type {Element} —
       */
      this._inputElement = document.createElement('p');

      /**
       *  The input span element gets ruleset 20190312°0451 applied, which
       *  is differrent according to the debug borders flag (var 20210508°0913)
       *
       * @id 20190312°0441
       * @type {Element} —
       */
      this._inputLine = document.createElement('span');
      this._inputLine.className = 'Terminal_Input';

      /**
       *  Private field, tells the input prompt
       *
       * @id 20210509°1531
       * @type {string} —
       */
      this._inputPrompt = ">\\00a0";

      /**
       *  ..
       *
       * @id 20170501°0511
       * @type {Element} —
       */
      this._output = document.createElement('p');
      this._output.className = 'Terminal_Output';

      /**
       *  Private field, tells the output prompt.
       *
       * @id 20210509°1533
       * @type {string} —
       */
      this._outputPrompt = "<\\00a0";

      /**
       *  Cosmetics for the input prompt
       *
       * @id 20190312°0443
       * @type {boolean} —
       */
      this._shouldBlinkCursor = true;


      /**
       *  Plays a retro digital tone
       *
       * @id 20170501°0521
       * @return {undefined} —
       */
      this.beep = function () {
         terminalBeep.load();
         terminalBeep.play();
      };

      /**
       *  Switch cursor blinking on/off
       *
       * @id 20170501°0531
       * @note Remember comment 20210503°0925 by Mark: 'Why convert to string?'
       *     github.com/MarkIvanowich/terminaljs/blob/master/terminal.js#L194-L197
       * @param {string} sBool —
       * @return {undefined} —
       */
      this.blinkingCursor = function (sBool) {
         sBool = sBool.toString().toUpperCase();
         this._shouldBlinkCursor = ( sBool === 'TRUE' || sBool === '1' || sBool === 'YES' );
      };

      /**
       *  Empty the terminal lines
       *
       * @id 20170501°0541
       * @return {undefined} —
       */
      this.clear = function () {
         this._output.innerHTML = '';
      };

      /**
       *  Clears the history
       *
       * @note History feature after Mark
       * @id 20210503°0931
       * @return {undefined} —
       */
      this.clearHistory = function () {
         this.history = [];                           // Should be marked as private with underscore? [note 20210503°1447]
         this.lasthistory = -1;                       // Should be marked as private with underscore? [note 20210503°1447`02]
      };

      /**
       *  ..
       *
       * @id 20170501°0551
       * @param {string} message —
       * @param {Function} callback —
       * @return {undefined} —
       */
      this.confirm = function (message, callback) {
         promptInput(this, message, PROMPT_CONFIRM, callback);
      };

      /*
       issue 20210502°1341 'Learn about GoCloCom parameter types'
       matter : The GoCloCom error messages are sometimes hard to understand.
          E.g. in func 20210502°1211 connect(), func 20210509°1631 getId(),
          and var 20210509°1633,  GoCloCom complains about parameter types.
       todo : Learn how to handle types not experimentally but knowingly.
       */

      /**
       *  Switch on XHR mode and provide backend address
       *
       * @id 20210502°1211
       * @param {string} url —
       * @return {undefined} —
       */
      this.connect = function (url) {                                  // [chg 20210502°1111`16 xhr]
         this._backend = url;
         promptInput(this, '', 1, null);                               // GoCloCom complained about original parameter 4 'false'. Is 'null' correct? See issue 20210502°1341 'Learn about GoCloCom parameter types'
      };

      /**
       *  Returns the ID of this instance
       *
       * @id 20210509°1631
       * @return {string} —
       */
      this.getId = function () {
         // //return this._objId;                                      // GoCloCom complains 'JSC_TYPE_MISMATCH found: (null|string), required: string'
         return this._objId.toString();                                // GoCloCom is satisfied — But better were to make _objId natively a string-only. See issue 20210502°1341 'Learn about GoCloCom parameter types'
      };

      /**
       *  ..
       *
       * @id 20170501°0611
       * @param {string} message —
       * @param {Function} callback —
       * @return {undefined} —
       */
      this.input = function (message, callback) {
         promptInput(this, message, PROMPT_INPUT, callback);
      };

      /**
       *  ..
       *
       * @id 20170501°0621
       * @param {string} message —
       * @param {Function} callback —
       * @return {undefined} —
       */
      this.password = function (message, callback) {
         promptInput(this, message, PROMPT_PASSWORD, callback);
      };

      /**
       *  Output one line. Creates the div which will stay permanently in the output box.
       *
       * @id 20170501°0631
       * @param {string} message —
       * @param {string} sOptionalRule — Optional CSS class for this ouput line
       * @return {undefined} —
       */
      this.print = function (message, sOptionalRule)
      {
         // Process optional parameter [seq 20210509°1443]
         // Do not (yet) use default parameter in function definition, it is not known by IE.
         var sRule = 'Output_One_Line';
         if (sOptionalRule) {
            sRule = sOptionalRule;
         }

         var eNewLine = document.createElement('div');
         eNewLine.textContent = message;
         eNewLine.className = sRule;
         this._output.appendChild(eNewLine);
      };

      /**
       *  ..
       *
       * @id 20170501°0641
       * @param {string} col —
       * @return {undefined} —
       */
      this.setBackgroundColor = function (col) {
         this.html.style.background = col;
      };

      /**
       *  Set debug borders flag
       *
       * @id 20210508°0911
       * @param {boolean} bStatus —
       * @return {undefined} —
       */
      this.setDebugBorders = function (bStatus) {
         _debugBorders = bStatus;
         _mountCssRules();
      };

      /**
       *  ..
       *
       * @id 20170501°0651
       * @param {string} height —
       * @return {undefined} —
       */
      this.setHeight = function (height) {
         this.html.style.height = height;
      };

      /**
       *  Let the user set the input prompt, e.g. '$ '.
       *
       * @id 20210504°1011
       * @todo Remember issue 20210509°1555 'Validate user prompt'
       * @param {string} sParam —
       * @return {undefined} —
       */
      this.setInputPrompt = function (sParam) {
         //this._inputLine.textPrefix = sParam;                        // Check — What exactly is this good for? See the XHR feature.
         this._inputPrompt = sParam;
         _inputPromptGlobal = sParam;                                  // Provisory
         _mountCssRules();
      };

      /**
       *  Let the user set the output prompt
       *
       * @id 20210504°1021
       * @todo Remember issue 20210509°1555 'Validate user prompt'
       * @param {string} sParam —
       * @return {undefined} —
       */
      this.setOutputPrompt = function (sParam) {
         this._outputPrompt = sParam;
         _outputPromptGlobal = sParam;                                 // Provisory
         _mountCssRules();
      };

      /**
       *  ..
       *
       * @id 20170501°0711
       * @param {string} col —
       * @return {undefined} —
       */
      this.setTextColor = function (col) {
         this.html.style.color = col;
         this._cursor.style.background = col;
      };

      /**
       *  ..
       *
       * @id 20170501°0721
       * @param {string} size —
       * @return {undefined} —
       */
      this.setTextSize = function (size) {
         this._output.style.fontSize = size;
         this._inputElement.style.fontSize = size;
      };

      /**
       *  ..
       *
       * @id 20170501°0731
       * @param {string} width —
       * @return {undefined} —
       */
      this.setWidth = function (width) {
         this.html.style.width = width;
      };

      /**
       *  ..
       *
       * @id 20170501°0741
       * @param {number} milliseconds —
       * @param {Function} callback —
       * @return {undefined} —
       */
      this.sleep = function (milliseconds, callback) {
         setTimeout(callback, milliseconds);
      };

      // ======================================================
      // The work continues ..
      // ======================================================

      // ~~ Assemble the terminal div element
      this._inputElement.appendChild(this._inputLine);
      this._inputElement.appendChild(this._cursor);
      this._innerWindow.appendChild(this._output);
      this._innerWindow.appendChild(this._inputElement);
      this._innerWindow.style.padding = '10px';
      this._innerWindow.className = 'Terminal_Complete';
      this.html.appendChild(this._innerWindow);

      // ~~ Style the terminal
      this.setBackgroundColor('black');
      this.setHeight('100%');
      this.setTextColor('white');
      this.setTextSize('1em');
      this.setWidth('100%');

      // ~~
      this._inputElement.style.display = 'none';
      this._inputElement.style.margin = '0';

      // Dummy for blinking cursor
      this._cursor.innerHTML = 'X';                                    // Originally 'C'
      this._cursor.style.background = 'white';
      this._cursor.style.display = 'none';                             // Then hide it

      this._output.style.margin = '0';


      /*
      issue 20210502°1351 'What does the Overflow'?
      matter : In the ~original styling, this.html.style.overflow = 'auto' is used.
      do : Clear, what exactly overflow effects, and whether it may be sensible
         at other places as well. E.g. with the planned automatic linebreak
         for too long lines.
      location : 
      status : Open
       */

      // ~~
      // [seq ]
      this.html.style.fontFamily = 'Courier, Monaco, Ubuntu Mono, monospace'; // [chg 20210502°1111`17 xhr]
      this.html.style.margin = '0';
      this.html.style.overflow = 'auto'; // [line 20210502°1133]       // [chg 20210502°1111`18 xhr] See issue 20210502°1351 'What does the Overflow'?

      /**
       *  ..
       */
      this._backend = false;                                           // [chg 20210502°1111`19 xhr]

      return;
   };

   /**
    *  This const holds a beep in its base64 incarnation
    *
    *  The original file is "Bleep-SoundBible.com-1927126940.mp3"
    *  by Mike Koenig, provided unter the CC BY 3.0 License on
    *  https://soundbible.com/1252-Bleep.html [ref 20210511°0946]
    *
    *  The base64 encoding was done on 2021-May-13
    *  with https://www.base64encode.org/ [ref 20210511°0948, ref 20190315°0313]
    *
    * Browser compatibility audio as base64 (info from former beep.mp3 in 2019)
    *  • OGG : Chrome64 yes, Edge42 no, FF66 yes, IE9 no, IE10 no, Opera58 yes
    *  • MP3 : Chrome64 yes, Edge42 yes, FF66 yes, *IE9 no*, IE10 yes, Opera58 yes
    *
    * @id 20190325°0751
    * @note Big and loud replaced by small and soft in chg 20210511°1311
    * @type {string} —
    */
   var sBase64_Beep_Mp3
        = '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'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/'
         + '+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkA'
         + 'AAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAAB'
         + 'AAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTgu'
         + 'Mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAA'
         + 'NIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk'
         + '/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAI'
         + 'AAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxB'
         + 'TUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAAB'
         + 'pAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAA'
         + 'AASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/w'
         + 'AABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAAN'
         + 'IAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUz'
         + 'Ljk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAA'
         + 'ACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + '//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABp'
         + 'AAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAA'
         + 'AQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4'
         + 'LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAA'
         + 'ADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQ'
         + 'ZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAA'
         + 'CAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpM'
         + 'QU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAA'
         + 'AaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSA'
         + 'AAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P'
         + '8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAA'
         + 'DSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1F'
         + 'My45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQA'
         + 'AAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAE'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAA'
         + 'aQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAA'
         + 'AAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45'
         + 'OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAg'
         + 'AAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7'
         + 'EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAA'
         + 'AAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'TEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEA'
         + 'AAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4y'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0'
         + 'gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/'
         + 'j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgA'
         + 'AA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFN'
         + 'RTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGk'
         + 'AAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAA'
         + 'BKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AA'
         + 'AGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0g'
         + 'AAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAA'
         + 'IAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqq'
         + 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
         + 'qqqqqqqqqqqqQVBFVEFHRVjQBwAAVQAAAAIAAAAAAACgAAAAAAAAAAAOAAAAAAAAAEFydGlzdABT'
         + 'b3VuZEJpYmxlLmNvbQoAAAAAAAAAVGl0bGUAQmVlcCBTb3VuZEFQRVRBR0VY0AcAAFUAAAACAAAA'
         + 'AAAAgAAAAAAAAAAAVEFHQmVlcCBTb3VuZAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRCaWJsZS5j'
         + 'b20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
         + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8='
          ;

   return TerminalConstructor;
}());

/* eof */
