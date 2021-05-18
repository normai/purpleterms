/*!
 * This module operates PurpleTerms
 *
 * file : 20210506°1111 [fragments of 20190205°0111 daftari/jsi/dafterm.js]
 * license : BSD 3-Clause License // // (formerly GNU AGPL v3)
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
 *  This flag is self-explanatory
 *
 * @id 20210509°1031
 * @callers
 * @const {boolesn|null} —
 */
Daf.Term.isPhpAvailable = null;

/**
 *  Help string
 *
 * @id 20210514°0911
 * @type {string} —
 * @constant —
 */
Daf.Term.sHelp = "Commands: beep, bye, clear, help, roll, spin, stop.";

/**
 *  Exit return string
 *
 * @id 20210514°1131
 * @type {string} —
 * @constant —
 */
Daf.Term.sBye = 'Bye. Restart with page refresh.';

/**
 *  This method performs the AJAX request
 *
 * @id 20190209°0321`02
 * @note Compare func 20110816°1623 daftari.js::MakeRequest
 * @param {String} sCmd  —
 * @return {undefined} —
 */
////Daf.Term.ajaxRequest = function()
Daf.Term.ajaxRequest = function(sCmd)                                  // [chg 20210514°1133]
{
   'use strict';

   // () Assemble shipment ingredients [seq 20190209°0322`02]
   ////var sTargetUrl = './custom.php' + '?cmd=' + 'spin';
   var sTargetUrl = './custom.php' + '?cmd=' + sCmd;                   // [chg 20210514°1135]
   var sMsgToSend = 'Hello backend ..';

   // Get Ajax performer object [seq 20190209°0323`02]
   // See todo 20190209°0836 'XMLHttpRequest availability'
   var xmlHttp = new XMLHttpRequest();

   // Provide response callback [seq 20190209°0324`02]
   xmlHttp.onreadystatechange = function()
   {
      if (xmlHttp.readyState === 4)
      {
         Daf.Term.ajaxResponse(xmlHttp.responseText);
      }
   };

   // Finish sending [seq 20190209°0325`02]
   xmlHttp.open('POST', sTargetUrl);
   xmlHttp.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
   xmlHttp.send(sMsgToSend);
};

/**
 *  This method receives the AJAX response
 *
 * @id 20190209°0331`02
 * @param {string} sResponse — The Ajax result sent from server
 * @return {undefined} —
 */
Daf.Term.ajaxResponse = function(sResponse)
{
   'use strict';

   // Show response [line 20190209°0333`02]
   ////Daf.Term.t21.print('< ' + sResponse);
   ////Daf.Term.t21.print('👻️ ' + sResponse);                           //// Ghost [emoji 20210514°1141]
   Daf.Term.t21.print('🌐️ ' + sResponse);                               //// Globe with Meridians [emoji 20210514°1143]

   // Repeat [line 20190209°0335`02]
   if (Daf.Term.bSpinAutoRun) {
      setTimeout( Daf.Term.runSpin, 1234 );
   }
};

/**
 *  This function performs some dummy action
 *
 * @id 20190205°0131`02
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

   // Create a terminal [seq 20190205°0133`02] after terminaljs/test.html
   Daf.Term.t21 = new Terminal();
   Daf.Term.t21.setHeight("320px");                                    //// 250px
   Daf.Term.t21.setWidth('650px');
   Daf.Term.t21.setBackgroundColor('blue');
   ////Daf.Term.t21.blinkingCursor(false);
   var eDiv = document.getElementById("Furniture_20190205o0211_Terminal");
   eDiv.appendChild(Daf.Term.t21.html);

   // Launch [seq 20190205°0135`02]
   Daf.Term.t21.print('Welcome to PurpleTerms ' + Daf.Term.t21.getVersion() + ' Custom Demo.');
   Daf.Term.t21.input(Daf.Term.sHelp, Daf.Term.inputz);
};

/**
 *  This function reacts on user input
 *
 * @id 20190205°0221`02
 * @callers
 * @param {string} sCmd — The user input
 * @return {undefined} —
 */
Daf.Term.inputz = function(sCmd)
{
   'use strict';

   // Do job
   var sRet = Daf.Term.interpret(sCmd);
   if (sRet !== '') {
      Daf.Term.t21.print(sRet);
   }

   // Exit?
   if (sRet === Daf.Term.sBye) {
      return;
   }

   // Wait for next input
   Daf.Term.t21.input(null, Daf.Term.inputz);
};

/**
 *  This function interprets the user input
 *
 * @id 20190205°0231`02
 * @callers
 * @todo: Possibly evaluate return value [todo 20190205°0232]
 * @param {string} sCmd — The command to act on
 * @return {string} — Seems not be evaluated at all so far
 */
Daf.Term.interpret = function(sCmd)
{
   'use strict';

   var sRet = '';
   switch (sCmd.toLowerCase())
   {
      case 'beep' :
         Daf.Term.t21.beep();
         sRet = "Can you hear me beeping?";
         break;
      case 'bye' :
         sRet = Daf.Term.sBye;
         break;
      case 'clear' :
         Daf.Term.t21.clear();
         break;
      case 'help' :
         Daf.Term.t21.print(Daf.Term.sHelp);
         break;
      // [seq 20210514°1145]
      case 'roll' :
         if ( Daf.Term.isPhpAvailable ) {
            Daf.Term.ajaxRequest('roll');
         }
         else {
            sRet = "Cannot roll — PHP not available.";
         }
         break;
      case 'spin' :
         // Use AJAX [condi 20210509°1051]
         Daf.Term.bSpinAutoRun = true;
         if ( Daf.Term.isPhpAvailable ) {
            Daf.Term.runSpin();
            sRet = "Spinning (Stop with invalid input, may last a second then) ..";
         }
         else {
            sRet = "Cannot spin — PHP is not available.";
         }
         break;
      default :
         // [seq 20210514°1147]
         if (Daf.Term.bSpinAutoRun) {
            sRet = (sCmd === 'stop')
                  ? 'O.k. — stopping'
                   : 'Stopped spinning with "' + sCmd + '".'
                    ;
            Daf.Term.bSpinAutoRun = false;
         }
         else {
            sRet = 'Error: "' + sCmd + '"';
         }
   }
   return sRet;
};

/**
 *  This function executes the scan/spin command
 *
 * @id 20190209°0311`02
 * @callers
 * @return {undefined} —
 */
Daf.Term.runSpin = function()
{
   'use strict';

   Daf.Term.ajaxRequest('spin');
   return;
};


/**
 *  Flag to run and stop spinner
 *
 * @id 20190209°0351`02
 * @type {boolean} —
 */
Daf.Term.bSpinAutoRun = false;

/**
 *  This variable stores some dummy string -- IS NEVER SEEN
 *
 * @id 20190205°0141`02
 * @callers
 * @type {string} —
 */
Daf.Term.sDebugWelcome = "[Debug 20190205°0141] Hello, namespace Daf.Term is loaded.";

/**
 *  This variable stores the terminal object — Seems NOWHERE used?!
 *
 * @id 20190205°0143`02
 * @callers
 * @type {Object|null} —
 */
Daf.Term.t21 = null;

////// Perform [line 20190205°0151]
////Trekta.Utils.windowOnloadDaisychain(Daf.Term.execute);

/* eof */

// ~ ✂ ~ ~ ~ ~ ~ ~ ~ Fragment of area 20190106°0307 start ~ ~ ~ ~ ~ ~ ~ ~ ~
/**!
 * This area Trekta.Utils holds low level functions to be pasted into standalone scripts
 *
 * file : 20210506°1121 [fragments of 20190105°1717 daftari/jsi/trektautils.js]
 * version : Special edition for PurpleTerms //// v0.2.5 (20210428°1031)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * license : BSD 3-Clause License //// (originally GNU AGPL v3)
 */

/**
 * This shall be the root namespace
 *
 * @id 20190106°0311`02
 * @c_o_n_s_t — Namespace
 */
var Trekta = Trekta || {};

/**
 * This namespace shall provide some general basic functionalities
 *
 *  The section between ~~~ Schnippel ~~~ and ~~~ Schnappel ~~~ can be cut
 *  and pasted to other scripts to provide them independent standalone basics.
 *
 * @id 20190106°0313`02
 * @c_o_n_s_t — Namespace
 * @const — Namespace
 */
Trekta.Utils = Trekta.Utils || {

   /**
    * This function sends an Ajax request
    *
    * @id 20190405°0231`02 (after 20140704°1011)
    * @callers • E.g. Trekta.Utils.readTextFile2
    * @param sMethod {string} — Either 'GET' or 'POST' ("GET", "POST", "PUT", "DELETE")
    * @param sUrl {string} — The request URL
    * @param {string} sPayload — The data to transmit, only used with a POST request
    * @param {Function} cbkLoad — Callback function for the case of success, taking one string parameter
    * @param {Function} cbkFail — Callback function for the case of fail, taking one string parameter
    * @return {undefined} —
    */
   ajax3Send : function(sMethod, sUrl, sPayload, cbkLoad, cbkFail)
   {
      'use strict';

      // () Prologue [line 20140704°1013`02]
      // todo : This must be refined .. e.g. with default callbacks
      cbkLoad = (typeof cbkLoad === 'undefined') ? null : cbkLoad ;
      cbkFail = (typeof cbkFail === 'undefined') ? null : cbkFail ;

      // Get the XMLHttpRequest object [line 20190417°0111`02]
      // See todo 20190209°0836 'XMLHttpRequest availability'
      var xmlHttp = new XMLHttpRequest();

      // () Set request parameters [line 20140704°1015`02]
      xmlHttp.open(sMethod, sUrl, true); // true means asynchronous

      // () Probe the ongoing [line 20140704°1016`02]
      xmlHttp.onreadystatechange = function ()
      {
         // List after ref 20190412°0132 'MDN → XMLHttp​Request​.ready​State'
         if ( xmlHttp.readyState === 0 ) {
            // State = UNSENT — Client has been created. open() not called yet
         }
         else if ( xmlHttp.readyState === 1 ) {
            // State = OPENED — open() has been called
         }
         else if ( xmlHttp.readyState === 2 ) {
            // State = HEADERS_RECEIVED — send() has been called, and headers and status are available
         }
         else if ( xmlHttp.readyState === 3 ) {
            // State = LOADING — Downloading; responseText holds partial data
         }
         else if ( xmlHttp.readyState === 4 ) {
            // State = DONE — The operation is complete
            // Below the list after ref 20190412°0133 'MDN → HTTP response status codes'
            var bSuccess = false; // pessimistic predetermination
            switch (xmlHttp.status) {
               // Case '0' may happen e.g. if • HTML file containing the
               //   script is opened in the browser via the file scheme
               //  • too much time passes before the server responds
               case   0 : bSuccess = true; break;
               case 100 : break; // "Continue"
               case 101 : break; // "Switching Protocol"
               case 102 : break; // "Processing (WebDAV)"
               case 103 : break; // "Early Hints"
               case 200 : bSuccess = true; break; // "OK"
               case 201 : break; // "Created"
               case 202 : break; // "Accepted"
               case 203 : break; // "Non-Authoritative Information"
               case 204 : break; // "No Content"
               case 205 : break; // "Reset Content"
               case 206 : break; // "Partial Content"
               case 207 : break; // "Multi-Status (WebDAV)"
               case 208 : break; // "Multi-Status (WebDAV)"
               case 226 : break; // "IM Used (HTTP Delta encoding)"
               case 300 : break; // "Multiple Choice"
               case 301 : break; // "Moved Permanently"
               case 302 : break; // "Found"
               case 303 : break; // "See Other"
               case 304 : break; // "Not Modified"
               case 305 : break; // "Use Proxy 👎"
               case 306 : break; // "unused"
               case 307 : break; // "Temporary Redirect"
               case 308 : break; // "Permanent Redirect"
               case 400 : break; // "Bad Request"
               case 401 : break; // "Unauthorized"
               case 402 : break; // "Payment Required"
               case 403 : break; // "Forbidden"
               case 404 : break; // "Not Found"
               case 405 : break; // "Method Not Allowed"
               case 406 : break; // "Not Acceptable"
               case 407 : break; // "Proxy Authentication Required"
               case 408 : break; // "Request Timeout"
               case 409 : break; // "Conflict"
               case 410 : break; // "Gone"
               case 411 : break; // "Length Required"
               case 412 : break; // "Precondition Failed"
               case 413 : break; // "Payload Too Large"
               case 414 : break; // "URI Too Long"
               case 415 : break; // "Unsupported Media Type"
               case 416 : break; // "Requested Range Not Satisfiable"
               case 417 : break; // "Expectation Failed"
               case 418 : break; // "I"m a teapot"
               case 421 : break; // "Misdirected Request"
               case 422 : break; // "Unprocessable Entity (WebDAV)"
               case 423 : break; // "Locked (WebDAV)"
               case 424 : break; // "Failed Dependency (WebDAV)"
               case 425 : break; // "Too Early"
               case 426 : break; // "Upgrade Required"
               case 428 : break; // "Precondition Required"
               case 429 : break; // "Too Many Requests"
               case 431 : break; // "Request Header Fields Too Large"
               case 451 : break; // "Unavailable For Legal Reasons"
               default  : break; // (should never happen)
            }
            if ( bSuccess ) {
               // xmlHttp.status is 0 or 200
               cbkLoad(xmlHttp.responseText);
            } else {
               // All other xmlHttp.status values
               cbkFail(xmlHttp.responseText);
            }
         }
      };

      // () Finally perform the request [seq 20140704°1017`02]
      try {
         // If file to read does not exist, we get exception "Failed to load
         //  resource: the server responded with a status of 404 (Not Found)"
         // See issue 20181228°0937 'try to look for file but without error 404'
         // See issue 20200103°0252 'Chrome → AJAX fails with file protocol'
         xmlHttp.send(null);
      }
      catch (ex)
      {
         // [line 20140704°1103`02]
         // note 20160624°0131 : To test below error messages, browse via file protocol
         //    the pages • 20160613°0211 Daftari → Manual → FadeInFiles with Firefox
         //    • and 20150211°1211 Daftari → Manual → Slideshow with Chrome
         var sMsg = "<b>Sorry, some feature on this page does not work.</b>"
                   + '\nFile <tt>' + sUrl + '</tt> ~~could not be read.'
                    + "\nYour browser said: "
                     + '<tt>' + ex.message + '</tt>.'                  // e.g. "A network error occurred".
                      ;

         // [condi 20140704°1104`02]
         // ref : screenshot 20160911°1221 'Chrome debugger showing exception'
         // ref : issue 20150516°0531 'Chrome cannot load local files'
         if ( Trekta.Utils.bIs_Browser_Chrome && (location.protocol === 'file:') ) {
            // [line 20140704°1105`02]
            sMsg += "\nYour browser seems to be Chrome, and this does not ~~read files via file protocol."
                  + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE"
                   + "\nor (2) view this page from <tt>localhost</tt> with a HTTP server."
                    ;
         }
         else if ( Trekta.Utils.bIs_Browser_Firefox && (location.protocol === 'file:') ) {
            // [line 20140704°1106`02]
            sMsg += "\nYour browser seems to be <b>Firefox</b>, and this does not ~~read files"
                  + "\nwith a path going below the current directory via file protocol."
                   + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE"
                    + "\nor (2)  view this page from <tt>localhost</tt> with a HTTP server."
                     ;
         }
         else {
            // [line 20140704°1107`02]
            sMsg += '\n [info 20160622°0131] Failed sending request ' + sUrl + '.';
         }

         // Use callback to deliver error message [line 20190405°0233`02]
         cbkLoad(sMsg); // hm .. perhaps better just use a plain alert()
      }
   }

   /**
    * This function daisychains the given function on the windows.onload events
    *
    * @id 20160614°0331`02
    * @todo This bulky function may be obsolet by function Event​Target​.add​Event​Listener.
    *    The function supports below IE9, add​Event​Listener supports IE9 and above.
    * @see ref 20190328°0953 'mdn → addEventListener'
    * @callers
    * @param {Function} funczion — The function to be appended to the window.onload event
    * @return {undefined} —
    */
   , windowOnloadDaisychain : function(funczion)
   {
      'use strict';

      // Is the onload handler already used?
      if ( window.onload ) {
         // Preserve existing function(s) and append our additional function
         var ld = window.onload;
         window.onload = function() {
            ld(null); // [marker 20210416°1633`26 GoCloCom] Function requires 1 argument
            funczion();
         };
      }
      else {
         // No other handlers are registered yet
         window.onload = function() {
            funczion();
         };
      }
   }
};

// NOT USED HERE
/**
 * This ~static ~class provides a method to parse a command string
 *
 * @id 20140926°0641`02
 * @status Works
 * @note Remember todo 20180618°0751 'make func parse appear in namespace instead global'
 * @chg 20190405°0517 Allow whitespaces
 * @chg 20190405°0507 Accept single quotes as well as double quotes
 * @callers • CanvasGear • page 20150210°0311 docs/testing.html
 * @note Code inspired by ref 20140926°0621 'Krasimir: Simple command line parser in JS'
 * @note See also ref 20140828°0832 'majstro: tokenizing with split'
 * @return {undefined} —
 */
Trekta.Utils.CmdlinParser = ( function()
{
   'use strict';

   /**
    * This function parses a commandline
    *
    * @id 20140926°0642`02
    * @param sCmdlin {string} The string to be parsed
    * @return {Object} — Object with the read key-value-pairs
    */
   Trekta.Utils.parse = function(sCmdlin)
   {
      // Paranoia — Advisably [seq 20140926°0653]
      if ( typeof sCmdlin === 'undefined' ) {
         sCmdlin = '';
      }

      // Prologue [loop 20140926°0654`02]
      var args = []; // this accumulates the found tokens
      var sQuoting = ''; // stores quote while inside quoted area
      var sToken = ''; // this accumulates characters to one token

      // Scan characters [loop 20140926°0643]
      for ( var i1 = 0; i1 < sCmdlin.length; i1++ )
      {
         // Convenience [line 20190405°0512`02]
         var sChar = sCmdlin.charAt(i1);

         // Process blank [condi 20140926°0644`02]
         if ( (sChar === ' ') && (sQuoting === '') ) {

            // Ignore whitespace [seq 20190405°0513`02]
            if (sToken === '') {
               continue;
            }

            // Finish current token [seq 20140926°0645`02]
            args.push(sToken);
            sToken = '';

         }
         // [condi 20190405°0514`02] experimental
         else if ( (sChar === '=') && (sQuoting === '') ) {

            // [seq 20190405°0515`02]
            if (sToken !== '') {
               args.push(sToken);
               sToken = '';
            }

            // Found token delimiter, finish current token [seq 20190405°0516`02]
            args.push('=');

         }
         else {

            // Accumulate one token [seq 20140926°0646`02]
            if ((sChar === "'") || (sChar === '"')) {
               sQuoting = (sQuoting === '') ? sChar : '';              // toggle quoting flag
            }
            else {
               sToken += sChar;
            }
         }
      }
      args.push(sToken);
      // Now the plain token array is ready, the equal sign is also a token.

      // (B) Parse the found tokens [seq 20140926°1111`02]
      // summary : This algo points to the first token, then looks ahead for
      //  an equal sign. This has the advantage, that any solitary token is
      //  treated like a key as well, just later it will no more receive a value.
      // hint : One loop finishes one CmdsHash element/cell.

      // (B.1) Prologue [seq 20140926°1112`02]
      var oKvps = [];
      var sCurrKey = '';

      // (B.1) Loop over the token array  [seq 20140926°1113`02]
      //  Assemble key/value pairs from the equal signs
      for (var i2 = 0; i2 < args.length; i2++) {

         // (B.2) Possibly skip empty elements [seq 20140926°1114`02]
         // note : This cleaning could be done separately before the loop. As
         //    well it is not yet exactly clear, what happens with blank values.
         if (args[i2] === '') {                                        // experimental
            continue;
         }

         // (B.3) Read key name and create key with empty value [seq 20140926°1115`02]
         sCurrKey = args[i2];
         oKvps[sCurrKey] = '<n/a>';                                    // '<n/a>' is a maker, may be replaced by null or the like

         // (B.4) Is next token an equal sign? [seq 20140926°1116`02]
         if ( args[i2 + 1] === '=' ) {

            // Complete current key/value pair with value [seq 20140926°1117`02]
            oKvps[sCurrKey] = args[i2 + 2];
            sCurrKey = '<n?a>';                                        // reset

            // [seq 20140926°1118`02]
            i2++;                                                      // forward to equal sign
            i2++;                                                      // forward to this value
            continue;                                                  // forward to next key
         }
         else {
            // [seq 20140926°1119`02]
            continue;                                                  // forward to next key
         }
      }

      return oKvps;
   };

   // Curiously, if you place the opening curly bracket not behind the return
   //  but on the next line, the script will be broken [note 20160416°1311`02]
   return {
      parse : Trekta.Utils.parse
   };
})();
// ~ ✂ ~ ~ ~ ~ ~ ~ ~ Fragment of area 20190106°0307 stop ~ ~ ~ ~ ~ ~ ~ ~ ~

// Perform [line 20190205°0151`02]
Trekta.Utils.windowOnloadDaisychain(Daf.Term.execute);

/* eof */
