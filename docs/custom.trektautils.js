// ~ ✂ ~ ~ ~ ~ ~ ~ ~ Fragment of area 20190106°0307 start ~ ~ ~ ~ ~ ~ ~ ~ ~
/**!
 * This area Trekta.Utils holds low level functions to be pasted into standalone scripts
 *
 * file : 20210506°11xx [fragments of 20190105°1717 daftari/jsi/trektautils.js]
 * version : Special edition for PurpleTerms //// v0.2.5 (20210428°1031)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * license : BSD 3-Clause License //// (originally GNU AGPL v3)
 */

/**
 * This shall be the root namespace
 *
 * @id 20190106°0311
 * @c_o_n_s_t — Namespace
 */
var Trekta = Trekta || {};

/**
 * This namespace shall provide some general basic functionalities
 *
 *  The section between ~~~ Schnippel ~~~ and ~~~ Schnappel ~~~ can be cut
 *  and pasted to other scripts to provide them independent standalone basics.
 *
 * @id 20190106°0313
 * @c_o_n_s_t — Namespace
 * @const — Namespace
 */
Trekta.Utils = Trekta.Utils || {

   /**
    * This function sends an Ajax request
    *
    * @id 20190405°0231 (after 20140704°1011)
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

      // () Prologue [line 20140704°1013]
      // todo : This must be refined .. e.g. with default callbacks
      cbkLoad = (typeof cbkLoad === 'undefined') ? null : cbkLoad ;
      cbkFail = (typeof cbkFail === 'undefined') ? null : cbkFail ;

      // Get the XMLHttpRequest object [line 20190417°0111]
      // See todo 20190209°0836 'XMLHttpRequest availability'
      var xmlHttp = new XMLHttpRequest();

      // () Set request parameters [line 20140704°1015]
      xmlHttp.open(sMethod, sUrl, true); // true means asynchronous

      // () Probe the ongoing [line 20140704°1016]
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

      // () Finally perform the request [seq 20140704°1017]
      try {
         // If file to read does not exist, we get exception "Failed to load
         //  resource: the server responded with a status of 404 (Not Found)"
         // See issue 20181228°0937 'try to look for file but without error 404'
         // See issue 20200103°0252 'Chrome → AJAX fails with file protocol'
         xmlHttp.send(null);
      }
      catch (ex)
      {
         // [line 20140704°1103]
         // note 20160624°0131 : To test below error messages, browse via file protocol
         //    the pages • 20160613°0211 Daftari → Manual → FadeInFiles with Firefox
         //    • and 20150211°1211 Daftari → Manual → Slideshow with Chrome
         var sMsg = "<b>Sorry, some feature on this page does not work.</b>"
                   + '\nFile <tt>' + sUrl + '</tt> ~~could not be read.'
                    + "\nYour browser said: "
                     + '<tt>' + ex.message + '</tt>.'                  // e.g. "A network error occurred".
                      ;

         // [condi 20140704°1104]
         // ref : screenshot 20160911°1221 'Chrome debugger showing exception'
         // ref : issue 20150516°0531 'Chrome cannot load local files'
         if ( Trekta.Utils.bIs_Browser_Chrome && (location.protocol === 'file:') ) {
            // [line 20140704°1105]
            sMsg += "\nYour browser seems to be Chrome, and this does not ~~read files via file protocol."
                  + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Firefox or IE"
                   + "\nor (2) view this page from <tt>localhost</tt> with a HTTP server."
                    ;
         }
         else if ( Trekta.Utils.bIs_Browser_Firefox && (location.protocol === 'file:') ) {
            // [line 20140704°1106]
            sMsg += "\nYour browser seems to be <b>Firefox</b>, and this does not ~~read files"
                  + "\nwith a path going below the current directory via file protocol."
                   + "\nThere are two <b>solutions</b>: (1) Use a different browser, e.g. Chrome or IE"
                    + "\nor (2)  view this page from <tt>localhost</tt> with a HTTP server."
                     ;
         }
         else {
            // [line 20140704°1107]
            sMsg += '\n [info 20160622°0131] Failed sending request ' + sUrl + '.';
         }

         // Use callback to deliver error message [line 20190405°0233]
         cbkLoad(sMsg); // hm .. perhaps better just use a plain alert()
      }
   }

   /**
    * This function returns the path to the given script .. using regex
    *
    * @id 20110820°2041
    * @status working
    * @see todo 20190316°0141 'call retrieveDafBaseFolderRel without canary'
    * @see howto 20190209°0131 'retrieve this script path'
    * @note There might be browser differences with the return value, e.g.
    *     - FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
    *     - IE     : scripts[i].src = '../daftari/daftari.js'
    * @callers e.g. • CanvasGear func 20140815°1221 executeFrame • • •
    * @param {string} sScCanary — The name of the canary script, e.g. '/sitmapdaf.js'.
    * @return {string} — The wanted path, where the given script resides or empty string
    */
/*
   , retrieveDafBaseFolderAbs : function (sScCanary)
   {
      'use strict';

      // Process script names considering minification [seq 20190408°0133] [marker 20190408°0137 Two redundant sequences]
      // note : Three identical seqences 20190408°0131, 20190408°0133 and 20190408°0135
      if ( Trekta.Utils.bUseMinified ) {                               //  [mark 20190408°0147`02 'minification']

         var b1 = /.*\/fadeinfiles.combi.js$/.test(sScCanary);
         var b2 = /.*\/highlight.pack.js$/.test(sScCanary);
         var b3 = /.*\/showdown.min.js$/.test(sScCanary);
         var b4 = /.*\/sitmapdaf.js$/.test(sScCanary);
         var b5 = /.*\/sitmaplangs.js$/.test(sScCanary);
         var b6 = /.*\/canvasgear.combi.js$/.test(sScCanary);
         if ( ! (b1 || b2 || b3 || b4 || b5 || b6 )) {
            sScCanary = sScCanary.replace(/\.js$/, '.min.js');
         }
      }

      // () Prepare regex [seq 20160621°0142]
      var regexMatch = / /;                                            // space between slashes prevents a syntax error
      var regexReplace = / /;
      var s = sScCanary.replace(/\./g, "\\.") + "$";                   // e.g. 'dafutils.js' to 'dafutils\.js$'
      regexMatch = new RegExp(s, '');                                  // e.g. /dafutils\.js$/
      s = '(.*)' + s;                                                  // prepend group
      regexReplace = new RegExp(s, '');                                // e.g. /(.*)dafutils\.js$/ ('/' seems automatically replaced by '\/')

      // () Do the job [algo 20110820°2042 'find specific script' prototype]
      var sPath = '';
      var scripts = document.getElementsByTagName('SCRIPT');           // or 'script'
      if (scripts && scripts.length > 0) {
         for ( var i1 in scripts ) {
            var i2 = Number.parseInt(i1,10); // serve 'restricted index type' [line 20210416°1741]
            // note : There are browser differences, e.g.
            //    • FF etc : scripts[i].src = 'http://localhost/manual/daftari/daftari.js'
            //    • IE     : scripts[i].src = '../daftari/daftari.js'
            if (scripts[i2]) { // If i2 is NaN, this evaluates to False // [marker 20210416°1633`59 GoCloCom] restricted index type
               if ( scripts[i2].src.match(regexMatch) ) {              // e.g. /dafmenu\.js$/
                  sPath = scripts[i2].src.replace(regexReplace, '$1'); // e.g. /(.*)dafmenu.js$/
               }
            }
         }
      }

      return sPath;                                                    // e.g. "http://localhost/daftaridev/trunk/daftari/jsi"
   }
*/

   /**
    * This function shortens a long string by placing ellipsis in the middle
    *
    * @id ~20201203°1441
    * @callers • 20110811°1921 Daf.Mnu.Meo.execElementEdit
    * @param {string} sOrig — The string to be shortened
    * @param {number} iMaxLen (integer) — The maximum lenght of the output string
    * @return {string} — The wanted shortened string
    */
/*
   , sConfine : function(sOrig, iMaxLen) // fullyquali ⇒ Trekta.Utils.sConfine
   {
      var sRet = '';
      if (sOrig.length > iMaxLen) {
         sRet = sOrig.substring(0, iMaxLen / 2)
               + ' … '
                + sOrig.substring(sOrig.length - iMaxLen / 2)
                 ;
      }
      sRet = sRet.split('\n').join('☼');                               // [line 20190424°0728] replaces func 20120830°1521 Daf.Utlis.convertLinebreaksToHtml
      sRet = sRet.split('<').join('&lt;');
      sRet = sRet.split('>').join('&gt;');
      return sRet;
   }
*/

   /**
    * This function sets a cookie
    *
    * @id 20110510°2126
    * @ref ref 20120828°1931 'quirksmode → Cookies'
    * @note chg 20190412°0253 Shift func get/setCookie from dafutils.js to Trekta.Utils
    * @callers •
    * @param {string} sCookieName — iExpirationDays is number of days until the cookie expires
    * @param {string} sCookieValue — iExpirationDays is number of days until the cookie expires
    * @param {number} iExpirationDays — iExpirationDays is number of days until the cookie expires
    * @return {undefined} —
    */
/*
   , setCookie : function(sCookieName, sCookieValue, iExpirationDays)
   {
      'use strict';

      var dExDate = new Date();
      dExDate.setDate(dExDate.getDate() + iExpirationDays);

      // Escape is deprecated, I boldly replace it by encodeURI [note 20190423°0641`03]
      var sValue = ( encodeURI(sCookieValue) + ((iExpirationDays === null)
                    ? ''
                     : '; Expires = ' + dExDate.toUTCString())
                      );

      var sCookie = sCookieName + '=' + sValue;

      // [line 20120828°1932] Make it valid for the whole site, not only a subdir
      sCookie += '; path=/';

      ////alert('Trekta.Utils.setCookie() = ' + sCookie);
      document.cookie = sCookie;

      // Detect cookie availability and provide fallback [seq 20201228°1321]
      // See issue 20201228°1311 'cookie setting with file protocol'
      if (document.cookie.length < 1) {
         localStorage.setItem(sCookieName, sCookieValue);
      }
   }
*/

   /**
    * This function daisychains the given function on the windows.onload events
    *
    * @id 20160614°0331
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

   /**
    * This caches any output messages as long the page is not yet loaded
    * @id 20150516°0451
    * @type {Array} —
    */
/*
   , InitialMessageCache : Array()
*/
   /**
    * This variable constitutes the onload ready flags for pullScriptBehind
    *
    * @id 20190405°0345
    * @note This flags solves issue 20190405°0331 'isScriptAlreadyLoaded unfaithful'
    * @type {Array} —
    */
/*
   , aPulled : []
*/

   /**
    * This ~constant provides a flag whether the browser is Chrome or not
    *
    *  Explanation. The plain expression "navigator.appName.match(/Chrome/)"
    *  results in either True or Null. But I prefere the result being either
    *  True or False. This is achieved by wrapping the expression in the
    *  ternary operator, manually replacing Null by false.
    *
    * @id 20160622°0221
    * @todo 20190209°0833 : For browser detection, Inconsequently for some we use
    *    navigator.userAgent, for some we use navigator.appName. Standardize this.
    * @type {boolean} —
    */
/*
   , bIs_Browser_Chrome : ( navigator.userAgent.match(/Chrome/) ? true : false )
*/
   /**
    * This ~constant provides a flag whether the browser is Edge or not
    *
    * @id 20190417°0217
    * @type {boolean} —
    */
/*
   , bIs_Browser_Edge : ( navigator.userAgent.match(/Edge/) ? true : false )
*/
   /**
    * This ~constant provides a flag whether the browser is Internet Exporer or not
    *
    * @id 20150209°0941
    * @todo 20190209°0837 : Refine algo. Formerly we used the plain
    *    comparison 'if ( navigator.appName === "Microsoft Internet Explorer" )'.
    *    For code, compare function getBrowserInfo() in jquery.fancytree.logger.js.
    *    For code, compare function getIEVersion() in canvasgearexcanvas.js.
    * @type {boolean} —
    */
/*
   , bIs_Browser_Explorer : (
       ( navigator.appName.match(/Explorer/)
        || window.msCrypto                                             // only IE11 has this [line 20190417°0215] IE11 has different user agent string than other IE
         ) ? true : false )
*/
   /**
    * This ~constant provides a flag whether the browser is Firefox or not
    *
    * @id 20160624°0121
    * @type {boolean} —
    */
/*
   , bIs_Browser_Firefox : ( navigator.userAgent.match(/Firefox/) ? true : false )
*/
   /**
    * This property provides a flag whether the browser is Opera or not.
    *  Just nice to know, Opera seems to need no more extras anymore (2019).
    *
    * @note 20190314°0411 : Opera 58 seem to need no more extra treatment.
    * @note 20190314°0413 : In Opera 58 I saw this userAgent string
    *     • "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
    *       (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36 OPR/58.0.3135.118"
    * @id 20190107°0821
    * @type {boolean} —
    */
/*
   , bIs_Browser_Opera : ( navigator.userAgent.match(/(Opera)|(OPR)/) ? true : false )
*/
   /**
    * This property tells whether to pop up debug messages or not
    *
    * @id 20190311°1521
    * @type {boolean} —
    */
/*
   , bShow_Debug_Dialogs : false
*/
   /**
    * This property provides a constant false value
    *
    * @id 20190407°0121
    * @type {boolean} —
    */
/*
   , bToggle_FALSE : false
*/
   /**
    * This property provides a constant false value
    *
    * @id 20190407°0122
    * @type {boolean} —
    */
/*
   , bToggle_TRUE : true
*/
   /**
    * This flag tells whether to pull-behind minified scripts or not
    *
    * @id 20190408°0115
    * @callers •
    * @type {boolean} —
    */
/*
   , bUseMinified : false
*/
   /**
    * This const provides the ID for the general output area (yellow pane)
    * @id 20160618°0421
    * @type {string} —
    */
/*
   , sFurniture_OutputArea_Id : "i20150321o0231_StandardOutputDiv"
*/
   /**
    * This tells ..
    *
    * @id 20160501°1622
    * @callers •
    * @type {string} —
    */
/*
   , s_DaftariBaseFolderAbs : ''
*/
   /**
    * This tells ..
    *
    * @id 20160501°1623
    * @callers •
    * @type {string} —
    */
/*
   , s_DaftariBaseFolderRel : ''
*/
};

/**
 * This ~static ~class provides a method to parse a command string
 *
 * @id 20140926°0641
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
    * @id 20140926°0642
    * @param sCmdlin {string} The string to be parsed
    * @return {Object} — Object with the read key-value-pairs
    */
   Trekta.Utils.parse = function(sCmdlin)
   {
      // Paranoia — Advisably [seq 20140926°0653]
      if ( typeof sCmdlin === 'undefined' ) {
         sCmdlin = '';
      }

      // Prologue [loop 20140926°0654]
      var args = []; // this accumulates the found tokens
      var sQuoting = ''; // stores quote while inside quoted area
      var sToken = ''; // this accumulates characters to one token

      // Scan characters [loop 20140926°0643]
      for ( var i1 = 0; i1 < sCmdlin.length; i1++ )
      {
         // Convenience [line 20190405°0512]
         var sChar = sCmdlin.charAt(i1);

         // Process blank [condi 20140926°0644]
         if ( (sChar === ' ') && (sQuoting === '') ) {

            // Ignore whitespace [seq 20190405°0513]
            if (sToken === '') {
               continue;
            }

            // Finish current token [seq 20140926°0645]
            args.push(sToken);
            sToken = '';

         }
         // [condi 20190405°0514] experimental
         else if ( (sChar === '=') && (sQuoting === '') ) {

            // [seq 20190405°0515]
            if (sToken !== '') {
               args.push(sToken);
               sToken = '';
            }

            // Found token delimiter, finish current token [seq 20190405°0516]
            args.push('=');

         }
         else {

            // Accumulate one token [seq 20140926°0646]
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

      // (B) Parse the found tokens [seq 20140926°1111]
      // summary : This algo points to the first token, then looks ahead for
      //  an equal sign. This has the advantage, that any solitary token is
      //  treated like a key as well, just later it will no more receive a value.
      // hint : One loop finishes one CmdsHash element/cell.

      // (B.1) Prologue [seq 20140926°1112]
      var oKvps = [];
      var sCurrKey = '';

      // (B.1) Loop over the token array  [seq 20140926°1113]
      //  Assemble key/value pairs from the equal signs
      for (var i2 = 0; i2 < args.length; i2++) {

         // (B.2) Possibly skip empty elements [seq 20140926°1114]
         // note : This cleaning could be done separately before the loop. As
         //    well it is not yet exactly clear, what happens with blank values.
         if (args[i2] === '') {                                        // experimental
            continue;
         }

         // (B.3) Read key name and create key with empty value [seq 20140926°1115]
         sCurrKey = args[i2];
         oKvps[sCurrKey] = '<n/a>';                                    // '<n/a>' is a maker, may be replaced by null or the like

         // (B.4) Is next token an equal sign? [seq 20140926°1116]
         if ( args[i2 + 1] === '=' ) {

            // Complete current key/value pair with value [seq 20140926°1117]
            oKvps[sCurrKey] = args[i2 + 2];
            sCurrKey = '<n?a>';                                        // reset

            // [seq 20140926°1118]
            i2++;                                                      // forward to equal sign
            i2++;                                                      // forward to this value
            continue;                                                  // forward to next key
         }
         else {
            // [seq 20140926°1119]
            continue;                                                  // forward to next key
         }
      }

      return oKvps;
   };

   // Curiously, if you place the opening curly bracket not behind the return
   //  but on the next line, the script will be broken [note 20160416°1311]
   return {
      parse : Trekta.Utils.parse
   };
})();
// ~ ✂ ~ ~ ~ ~ ~ ~ ~ Fragment of area 20190106°0307 stop ~ ~ ~ ~ ~ ~ ~ ~ ~
