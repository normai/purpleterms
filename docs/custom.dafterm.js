/*!
 * This module operates the terminal
 *
 * file : 20190205°0111 daftari/jsi/dafterm.js
 * license : BSD 3-Clause License //// (formerly GNU AGPL v3)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * authors : ncm
 * status : Under construction
 * callers :
 * note :
 */

// Options for JSHint [seq 20190423°0421`10]
/* jshint laxbreak : true, laxcomma : true */
/* globals Daf, Terminal, Trekta */

/**
 *  Announce namespace
 *
 * @id 20190106°0311`23
 * @c_o_n_s_t — Namespace
 */
Trekta = window.Trekta || {};

/**
 *  Routine namespace opening
 *
 * @line 20190205°0113
 * @callers
 * @const — Namespace
 */
Daf = window.Daf || {};

/**
 *  This namespace hosts earliest functions
 *
 * @id 20190205°0121
 * @callers
 * @const — Namespace
 */
Daf.Term = Daf.Term || {};

/**
 *  This property tells the input prompt to show
 *
 * @id 20210506°1231
 * @callers
 * @const {string} —
 */
Daf.Term.inputPrompt = '> ';

/**
 *  This flag is self-explanatory
 *
 * @id 20210509°1031
 * @callers
 * @const {boolesn|null} —
 */
Daf.Term.isPhpAvailable = null;

/**
 *  This method performs the AJAX request
 *
 * @id 20190209°0321
 * @note Compare func 20110816°1623 daftari.js::MakeRequest
 * @return {undefined} —
 */
Daf.Term.ajaxRequest = function()
{
   'use strict';

   // () Assemble shipment ingredients [seq 20190209°0322]
   //// var sTargetUrl = Trekta.Utils.s_DaftariBaseFolderRel
   ////                 + '/' + Daf.Const.s_DAFTARI_OFFSET_PHP_SCRIPTS
   ////                  + '/' + 'Go.php'
   ////                   + '?cmd=' + 'spin'
   ////                    ;
   var sTargetUrl = './custom.Go.php' + '?cmd=' + 'spin';
   var sMsgToSend = 'Hello spin ..';

   // Get Ajax performer object [seq 20190209°0323]
   // See todo 20190209°0836 'XMLHttpRequest availability'
   var xmlHttp = new XMLHttpRequest();

   // Provide response callback [seq 20190209°0324]
   xmlHttp.onreadystatechange = function()
   {
      if (xmlHttp.readyState === 4)
      {
         Daf.Term.ajaxResponse(xmlHttp.responseText);
      }
   };

   // Finish sending [seq 20190209°0325]
   xmlHttp.open('POST', sTargetUrl);
   xmlHttp.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
   xmlHttp.send(sMsgToSend);
};

/**
 *  This method receives the AJAX response
 *
 * @id 20190209°0331
 * @param {string} sResponse — The Ajax result sent from server
 * @return {undefined} —
 */
Daf.Term.ajaxResponse = function(sResponse)
{
   'use strict';

   // Show response [line 20190209°0333]
   Daf.Term.t21.print('< ' + sResponse);

   // Repeat [line 20190209°0335]
   if (Daf.Term.bSpinAutoRun)
   {
      setTimeout( Daf.Term.runSpin, 1234 );
   }
};

/**
 *  This function performs some dummy action
 *
 * @id 20190205°0131
 * @callers
 * @return {undefined} —
 */
Daf.Term.execute = function()
{
   'use strict';

   // Determine PHP availability [seq 20210509°1041]
   var el = document.getElementById('Is_PHP_Available');
   var sInner = el.innerHTML;
   if ( sInner.indexOf('PHP is available') >= 0 ) {
      Daf.Term.isPhpAvailable = true;
      el.style.backgroundColor = 'Lime';
   }
   else {
      Daf.Term.isPhpAvailable = false;
      el.innerHTML = '&nbsp;PHP is not available&nbsp;';
      el.style.backgroundColor = 'Tomato';
   }

   // Create terminal [seq 20190205°0133] after terminaljs/test.html
   Daf.Term.t21 = new Terminal();
   Daf.Term.t21.setHeight("320px");                                    //// 250px
   Daf.Term.t21.setWidth('650px');
   Daf.Term.t21.setBackgroundColor('blue');
   Daf.Term.t21.blinkingCursor(false);
   var eDiv = document.getElementById("Furniture_20190205o0211_Terminal");
   eDiv.appendChild(Daf.Term.t21.html);

   // Launch [seq 20190205°0135]
   Daf.Term.t21.print('Welcome to the terminal.');
   Daf.Term.t21.print('Available commands: beep, spin');
   Daf.Term.t21.input('', Daf.Term.inputz);
};

/**
 *  This function reacts on user input
 *
 * @id 20190205°0221
 * @callers
 * @param {string} sCmd — The user input
 * @return {undefined} —
 */
Daf.Term.inputz = function(sCmd)
{
   'use strict';

   // Process current input
   Daf.Term.t21.clear();
   ////Daf.Term.t21.print('> ' + sCmd);
   Daf.Term.t21.print(Daf.Term.inputPrompt + sCmd);                    // '> '

   // Do job
   var sRet = Daf.Term.interpret(sCmd);
   Daf.Term.t21.print(sRet);

   // Wait for next input
   Daf.Term.t21.input('', Daf.Term.inputz);
};

/**
 *  This function interprets the user input
 *
 * @id 20190205°0231
 * @callers
 * @todo: Possibly evaluate return value [todo 20190205°0232]
 * @param {string} sCmd — The command to act on
 * @return {string} — Seems not be evaluated at all so far
 */
Daf.Term.interpret = function(sCmd)
{
   'use strict';

   var sRet = '';
   switch (sCmd)
   {
      case 'beep' : Daf.Term.t21.beep(); sRet = "It shall be beeping .."; break;
      case 'spin' :
         Daf.Term.bSpinAutoRun = true;

         // [ condition 20210509°1051]
         if ( Daf.Term.isPhpAvailable ) {
            Daf.Term.runSpin();
            sRet = "Spinning ..";                                      // "Scanning ..";
         }
         else {
            sRet = "Cannot spin. PHP is not available.";
         }
         break;
      default :
         Daf.Term.bSpinAutoRun = false;
         sRet = 'Error: "' + sCmd + '"';
   }
   return sRet;
};

/**
 *  This function executes the scan/spin command
 *
 * @id 20190209°0311
 * @callers
 * @return {undefined} —
 */
Daf.Term.runSpin = function()
{
   'use strict';

   Daf.Term.ajaxRequest();
   return;
};


/**
 *  Flag to run and stop spinner
 *
 * @id 20190209°0351
 * @type {boolean} —
 */
Daf.Term.bSpinAutoRun = false;

/**
 *  This variable stores some dummy string
 *
 * @id 20190205°0141
 * @callers
 * @type {string} —
 */
Daf.Term.sDebugWelcome = "[Debug 20190205°0141] Hello, namespace Daf.Term is loaded.";

/**
 *  This variable stores the terminal object — Seems nowhere used?!
 *
 * @id 20190205°0143
 * @callers
 * @type {Object|null} —
 */
Daf.Term.t21 = null;

// Perform [line 20190205°0151]
Trekta.Utils.windowOnloadDaisychain(Daf.Term.execute);

/* eof */
