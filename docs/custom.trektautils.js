// ~ ✂ ~ ~ ~ ~ ~ ~ ~ area 20190106°0307 start ~ ~ ~ ~ ~ ~ ~ ~ ~
/**!
 * This area Trekta.Utils holds low level functions to be pasted into standalone scripts
 *
 * file : 20190105°1717 daftari/jsi/trektautils.js
 * version : Special edition for PurpleTerms //// v0.2.5 (20210428°1031)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * license : BSD 3-Clause License //// (formerly GNU AGPL v3)
 */
/**
 * This area is shared via cut-n-paste by the following scripts :
 *   • daftari.js • canvasgear.js • fadeinfiles.js • slidegear.js • trekta-utils.js
 * Note : It is not really clear how to handle the propagation. Possibly
 *       use trekta-utils.js as the master, since it is a standalone file?
 * Note: Not sure about the script duplication in fadeinfiles/doc/demo.html.
 *
 * versions :
 *    • v0.2.5 (20210428°1031) — Streamlining
 *    • 20210418°1111 — Little streamlining
 *    • 20201228°1511
 *    • 20190418°0343
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
    * This function reads a cookie value
    *
    * @id 20110510°2127
    * @ref ref 20110510°2125 'w3schools → JavaScript Cookies'
    * @callers •
    * @note See issue 20120902°1221 'Not all browsers have e.indexOf(),
    *    why does it work here? The answer is: here we retrieve the index
    *    of a char in a string, not an element in an array.
    * @param {string} sCookieName — The name of the cookie to be read
    * @return {string} —
    */
   getCookie : function(sCookieName)
   {
      'use strict';

      // Prologue [seq 20110510°2128] Still using 'var' instead 'let'
      var i = 0;
      var sNam = '';
      var sRet = '';
      var sVal = '';
      var sCookies = document.cookie;                                  // semicolon-delimited string

      // [condi 20201228°1331]
      // See issue 20201228°1311 'cookie setting with file protocol'
      // Todo 20201228°1332 : Detection is quick'n'dirty, should be done in a more 'official' way
      if (sCookies.length > 0) {

         // Find value [seq 20110510°2129]
         var aCookies = document.cookie.split(';');
         for (i = 0; i < aCookies.length; i++) {
            sNam = aCookies[i].substr(0, aCookies[i].indexOf('='));
            sVal = aCookies[i].substr(aCookies[i].indexOf('=')+1);
            sNam = sNam.replace(/^\s+|\s+$/g, '');
            if (sNam === sCookieName) {
               // Function unescape is deprecated, I boldly replace it by decodeURI [chg 20190423°0641]
               sRet = decodeURI(sVal);
               break;
            }
         }
      } else {

         // Provide fallback for possibly failing cookies [seq 20201228°1333]
         sRet = localStorage.getItem(sCookieName);
      }

      return sRet;
   }

   /**
    * This function reads a cookie as boolean
    *
    * @id 20120828°2021
    * @note This function is a wrapper for Trekta.Utils.getCookie().
    * @callers • many
    * @param {string} sCookieName — The name of the cookie to be read
    * @param {boolean|null} bDefault — The default value
    * @return {boolean} — The wanted cookie value
    */
   , getCookieBool : function(sCookieName, bDefault)
   {
      'use strict';

      // Establish optional parameter [line 20120828°2022]
      bDefault = bDefault || false;

      // Forward to cookie reading function [line 20120828°2023]
      var sVal = Trekta.Utils.getCookie(sCookieName);

      // Postprocess value [line 20120828°2024]
      var bReturn = bDefault;
      if (sVal === 'true') {
         bReturn = true;
      } else if (sVal === 'false') {
         bReturn = false;
      } else {
         //Trekta.Utils.setCookie(sCookieName, bDefault.toString() , 7); // iExpirationDays
         bReturn = bDefault;
      }

      return bReturn;
   }

   /**
    * This function reads a cookie as integer
    *
    * @id 20190420°0311
    * @callers •
    * @param sCookieName {string} The name of the cookie to be read
    * @param iDefault {boolean} The default value
    * @return {number} (integer) — The wanted cookie value
    */
   , getCookieInt : function(sCookieName, iDefault)
   {
      'use strict';

      // Establish optional parameter [line 20190420°0312]
      iDefault = iDefault || 0;

      // Forward to cookie reading function [line 20190420°0313]
      var sVal = Trekta.Utils.getCookie(sCookieName);

      // Postprocess value [line 20190420°0314]
      var iReturn = iDefault;
      if (sVal !== '') {
         iReturn = parseInt(sVal, 10);
      }

      return iReturn;
   }

   /**
    * This function retrieves the filename of the page to be edited
    *
    * @id 20110820°1741
    * @note Remember issue 20110901°1741 'get self filename for default page'
    * @callers • 20120827°1511 getFilenamePlain • 20150411°0651 provideCornerstonePathes
    *           • 20120830°0451 editFinishTransmit
    * @return {string} — E.g. 'daftari/panels/login.html' (with Firefox)
    */
   , getFileNameFull : function() // fullyquali ⇒ Trekta.Utils.getFileNameFull
   {
      'use strict';

      // read URL of this page, values are e.g. [line 20110820°1742]
      //   • 'http://localhost/'
      //   • 'http://localhost/eps/index.html?XDEBUG_SESSION_START=netbeans-xdebug#'
      //   • 'file:///G:/work/daftaridev/trunk/daftari/docs/moonwalk.html' (not yet working)
      var sUrl = document.location.href;

      // Remove possible query after the file name [line 20110820°1743]
      sUrl = sUrl.substring(0, (sUrl.indexOf('?') === -1) ? sUrl.length : sUrl.indexOf('?'));

      // Remove possible anchor at the end [line 20110820°1744]
      sUrl = sUrl.substring(0, (sUrl.indexOf('#') === -1) ? sUrl.length : sUrl.indexOf('#'));

      // Possibly supplement page name 'index.html' [seq 20190419°0133] (analogy to seq 20181228°0935)
      if ( sUrl.indexOf('/', sUrl.length - 1) !== -1 ) {
         sUrl += 'index.html';
      }

      return sUrl;
   }

   /**
    * This function gets the plain filename of the page, e.g. 'help.html'
    *
    * @id 20120827°1511
    * @callers E.g. • dafdispatch.js::workoff_Cake_0_go
    * @return {string} — The plainfilename, e.g. 'help.html'
    */
   , getFilenamePlain : function() // fullyquali ⇒ Trekta.Utils.getFilenamePlain
   {
      'use strict';

      var sUrl = Trekta.Utils.getFileNameFull();                       // e.g 'daftari/panels/login.html'
      var a = sUrl.split('/');
      sUrl = a[a.length - 1];

      return sUrl;
   }

   /**
    * This function escapes a string to be used as HTML output
    *
    * @id 20140926°1431
    * @callers • Cvgr.Func.executeFrame
    * @todo  In FadeInFiles seq 20151106°1822 and seq 20151106°1821
    *            shall use this function here. [todo 20190328°0943]
    * @param {string} sHtml — The HTML fragment to be escaped
    * @return {string} — The wanted escaped HTML fragment
    */
   , htmlEscape : function(sHtml) // fullyquali ⇒ Trekta.Utils.htmlEscape
   {
      'use strict';

      sHtml = sHtml.replace(/</g, '&lt;');                             // g = replace all hits, not only the first
      sHtml = sHtml.replace(/>/g, '&gt;');

      return sHtml;
   }

   /**
    * This function tests, whether the given script is already loaded
    *  or not. This function is unfaithful during the loading phase
    *
    * @id 20160503°0231
    * @note Mind issue 20190405°0331 'isScriptAlreadyLoaded unfaithful'
    * @status unfaithful
    * @callers ..
    * @param {string} sWantedScript — The plain name of the wanted script (not a complete path)
    * @return {boolean} — Flag telling whether the script is loaded or not.
    */
   , isScriptAlreadyLoaded : function (sWantedScript)
   {
      'use strict';

      var regexp = null;

      // Build the appropriate regex variable [seq 20160623°0311]
      // note : See howto 20160621°0141 'programmatically build regex'
      // note : "/" seems automatically replaced by "\/"!
      var s = sWantedScript.replace(/\./g, "\\.");                     // e.g. '/slidegear.js' to '/slidegear\.js$'
      s = s + '$';
      regexp = new RegExp(s, '');                                      // e.g. /dafutils\.js$/

      // Do the job [algo 20160503°0241 (like algo 20110820°2042 'find specific script')]
      var scripts = document.getElementsByTagName('SCRIPT');
      if (scripts && scripts.length > 0) {
         for (var i1 in scripts) {
            var i2 = Number.parseInt(i1,10);
            if (scripts[i2]) {  // [marker 20210416°1633`58 GoCloCom] restricted index type
               if (scripts[i2].src.match(regexp)) {
                  return true;
               }
            }
         }
      }
      return false;
   }

   /**
    * This function outputs a string to some default 'shell' div
    *
    * @id 20150321°0311
    * @note chg 20190412°0253 Shift func outDbgMsg() from dafmenu.js to Trekta.Utils
    * @param {string} sOut — The text to be output
    * @return {undefined} —
    */
   , outDbgMsg : function (sOut)
   {
      'use strict';

      // Obey flag [seq 20150814°0241]
      if ( ! Trekta.Utils.getCookieBool('checkbox_yellowdebugpane', null)) { // [marker 20210416°1633`34 GoCloCom] added parameter two
         return;
      }

      // Test page for availability, otherwise cache the message [seq 20150516°0431]
      if ( document.readyState !== "complete" ) {
         Trekta.Utils.InitialMessageCache.push(sOut);
         return;
      }

      // Provide target element [line 20150321°0312]
      // See issue 20160618°0431 'HTML class and id set the same'
      // '<div class="i20150321o0231_StandardOutputDiv" id="i20150321o0231_StandardOutputDiv"></div>'
      var ele = Trekta.Utils.outDbgMsg_GuaranteeParentElement();

      // [seq 20150411°0151]
      // summary : Shim for IE8, which does not know Date.now like other browsers.
      // see : ref 20150411°0141 'stackoverflow → get timestamp in javascript'
      if (! Date.now) {
         Date.now = function () {
            return new Date().getTime();
         };
      }
      var sTimestamp = Math.floor(Date.now() / 1000);
      sTimestamp = sTimestamp.toString();

      // [seq 20150321°0313]
      var sMsgDbg = "[Dbg 20150324°0321] Run function Trekta.Utils.outDbgMsg().";
      sMsgDbg += "\n ele.id = " + ele.id + "\n outerHTML = " + ele.outerHTML;

      // Possibly prepend cached messages [seq 20150516°0441]
      if (Trekta.Utils.InitialMessageCache.length > 0) {
         var sOut22 = '';
         for ( var i = Trekta.Utils.InitialMessageCache.length - 1; i >= 0; i-- ) {
            if (sOut22 !== '') { sOut22 = '\n\n' + sOut22; }
            sOut22 = Trekta.Utils.InitialMessageCache[i] + sOut22;
         }
         Trekta.Utils.InitialMessageCache.length = 0;

         // Expeimental cosmetics [seq 20190412°0241]
         sOut22 = '<div style="background-color:LightGreen; margin:1.1em; padding:0.7em;">' + sOut22 + '</div>';
         sOut = sOut22 + "\n\n" + sOut;
      }

      // [algo 20150322°0221] 'replace textfile linebreaks by html tags'
      //  Just replace the linebreak characters by HTML linebreak tags,
      //  this is easier than converting them to paragraphs.
      var sPayload = sOut.replace(/\n/g, '<br />');

      // Wrap output in paragraph [seq 20150321°0314]
      var s = '<span style="font-size:72%;">' + sTimestamp + '</span>';
      var sAppend = '<p>' + s + ' ' + sPayload + '</p>';

      // [seq 20150321°0316]
      var eTarget = document.getElementById(Daf.Dspat.Config.sFurniture_OutputArea_Id); // "i20150321o0231_StandardOutputDiv"

      // Assemble new element content [seq 20150321°0317]
      sAppend = '\n' + sAppend;
      eTarget.insertAdjacentHTML('beforeend', sAppend);
   }

   /**
    * This function guarantees an element
    *  If the wanted element does not exist, it is created newly.
    *
    * @id 20150323°0321
    * @status Working
    * @callers • func Trekta.Utils.outDbgMsg
    * @return {Object|Node} — The wanted target element
    */
   , outDbgMsg_GuaranteeParentElement : function ()
   {
      'use strict';

      // todo : Replace detection by not using index number
      // NetBeans warning "The global variable 'Daf' is not defined." [issue 20210509°0931]
      var sTargetId = Daf.Dspat.Config.sFurniture_OutputArea_Id;       // "i20150321o0231_StandardOutputDiv"

      var sMsg = "[Dbg 20150323°0411] Helper function Trekta.Utils.outDbgMsg_GuaranteeParentElement().";

      var ele = document.getElementById(sTargetId);                    // 'i20150321o0231_...'

      sMsg += "\n Target ID = '" + sTargetId + "'";

      if (ele) {
         sMsg += "\n Element does exists.";
      }
      else {
         sMsg += "\n (Msg 20150323°0431 in dafmenu.js)";
         sMsg += "\n Element does not exist : id=\"" + sTargetId + "\".";
         sMsg += "\n Element shall be created.";

         // Create HTML fragment [seq 20150325°0311]
         // note : Here we put '<br />', because this string is immediate, and
         //    it will not be passed trough the string mangling engine of Trekta.Utils.outDbgMsg(),
         //    which would have replaced automatically a newline by a br tag.
         // note : The '&nbsp;' is used, because in a html paragraph, leading
         //    blanks have no effect. As opposed to being in a pre tag block.
         //    Perhaps console output were better done in a pre instead a p block?
         var sHtml = '<div'
                    + ' id="' + sTargetId + '"'
                    + ' class="dafBoxDebugOutput"'                     // daftari.css style=".. background-color:LemonChiffon; .."
                    + '>'
                    + '<p>'
                    + '[Msg 20150325°0211] Loading dafmenu.js (1/x).'
                    + '\n<br />&nbsp; Here comes the yellow Standard Output Box. Some page values are :'
                    + Daf.Mnu.Jsi.getJsiIntroDebugMessage(true)        // refactor 20180517°191103
                    + '</p>'
                    + '</div>'
                     ;

         // Integrate created fragment
         var eBody = document.getElementsByTagName('body')[0];
         var eDiv = document.createElement('div');
         eDiv.innerHTML = sHtml;
         eBody.appendChild(eDiv);

         // Retry, now mostly successful
         ele = document.getElementById(sTargetId);                     // 'i20150321o0231_StandardOutputDiv'
      }
      return ele;
   }


   /**
    * This function loads the given script then calls the given function
    *
    * @id 20110821°0121
    * @version 20190405°0347 Refine onload callback (finished issue 20190405°0333)
    * @version 20190331°0241 Added parameter for onError callback
    * @version 20181229°1941 Now with parameter for onload callback function
    * @see howto 20181229°1943 'summary on pullbehind'
    * @callers • dafmenu.js::callCanarySqueak • daftari.js::pull-behind slides
    *    • daftari.js::pull-behind fancytree • canvasgear.js::..
    * @param {string} sScLoad — The path from page to script, e.g. "./../../daftari/jsi/dafcanary.js", jsi/dafcanary.js'
    * @param {Function} callbackOnLoad — Optional. Callback function for the script onload event
    * @param {Function} callbackOnError — Optional. Callback function for the script onerror event
    * @param {Object} oJobs — Optional. Some identifiyer string or object to be
    *      passed from initiator to the callbacks (introduced 20190403°0215)
    * @return {boolean|undefined} — Success flag (just a dummy, always true)
    */
   , pullScriptBehind : function ( sScLoad, callbackOnLoad, callbackOnError, oJobs ) // fullyquali ⇒ Trekta.Utils.pullScriptBehind
   {
      'use strict';
 ///debugger;

      /*
      todo 20210426°1011 'let pullScriptBehind caller calculate minification flavour'
      location : seq 20190408°0135 Process script names considering minification
      do : Don't calculate minification flavour inside pullScriptBehind, let it the caller do.
      why : The matter is not that strict, but more complicated, has too many exceptions.
      status : Open
      */

      // Process script names considering minification [seq 20190408°0135] [marker 20190408°0137 Two redundant sequences]
      // note : Three identical seqences 20190408°0131, 20190408°0133 and 20190408°0135
      // See todo 20210426°1011 'let pullScriptBehind caller calculate minification flavour'
      if ( Trekta.Utils.bUseMinified ) {                               // [mark 20190408°0147`01]

         var b1 = /.*\/fadeinfiles.combi.js$/.test(sScLoad);
         var b2 = /.*\/highlight.pack.js$/.test(sScLoad);
         var b3 = /.*\/showdown.min.js$/.test(sScLoad);
         var b4 = /.*\/sitmapdaf.js$/.test(sScLoad);
         var b5 = /.*\/sitmaplangs.js$/.test(sScLoad);
         var b6 = /.*\/canvasgear.combi.js$/.test(sScLoad);
         if ( ! (b1 || b2 || b3 || b4 || b5 || b6 )) {
            sScLoad = sScLoad.replace(/\.js$/, '.min.js');
         }

      }

      // Avoid multiple loading [seq 20110821°0122]
      // Remember issue 20190405°0331 'isScriptAlreadyLoaded unfaithful'
      if ( Trekta.Utils.aPulled.indexOf(sScLoad) >= 0 ) {
         callbackOnLoad ( sScLoad                                      //
                         , oJobs                                       //
                          , true                                       // was already loaded
                           );
         return;
      }

      // Prepare the involved elements [seq 20110821°0123]
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');

      // Set the trivial properties [seq 20110821°0124]
      script.type = 'text/javascript';
      script.src = sScLoad;

      // Possibly work without callback [condi 20190404°0831]
      // This condition was wanted for loading fadeinfiles.js in seq 20190404°0827.
      //  No, it is not wanted from there. But hm.. the paranoia may be nice anyway.
      //  Finally, I am not sure now, whether the condition is useful or not.
      if (typeof callbackOnLoad !== 'undefined') {

         // Set the non-trivial but crucial property [line 20181229°1932]
         // The custom callback goes piggyback with the mandatory one
         var cbkCustom = function () { callbackOnLoad ( sScLoad
                                                       , oJobs
                                                        , false        // flag 'was already loaded'
                                                         ); };
         script.onload = function () { Trekta.Utils.pullScript_onload(sScLoad, cbkCustom); };
      }

      // Attach onerror handler [condi 20190331°0242]
      callbackOnError = callbackOnError || null;
      if ( callbackOnError !== null) {
         script.onerror =  ( function () { callbackOnError (sScLoad, oJobs); } );
      }

      // Ignit the pulling [seq 20110821°0125]
      head.appendChild(script);

      return true;
   }

   /**
    * This function constitutes the unconditional onload handler
    *
    * @id 20190405°0341
    * @summary This method is introduced to fix issue 20190405°0331 'isScriptAlreadyLoaded unfaithful'
    * @callers Onyl • onload event from pullScriptBehind
    * @param {string} sScript — The script to be pulled behind
    * @param  {Function} cbkCustom — The callback to be executed after script is loaded
    * @return {undefined} —
    */
   , pullScript_onload : function ( sScript, cbkCustom )
   {
      'use strict';
      Trekta.Utils.aPulled.push(sScript);
      cbkCustom();
   }

   /**
    * This function reads a file via asynchronous Ajax
    *
    * @id 20190417°0311
    * @status  Not really tested
    * @note    Remember todo 20150517°0121 'implement local file reading after Dean Edwards 20150516°0612'
    * @note    Remember issue 20140713°1121 'ajax read file via filesystem protocol'
    * @see     ref 20160611°0341 'stackoverflow → read an external local JSON file'
    * @see     ref 20140704°0842 'stackoverflow → read local text file'
    * @see     ref 20140627°1111 'stackoverflow → load div from one page and show in other'
    * @see     ref 20140625°1731 'stackoverflow → jQuery to load text file data'
    * @callers • func 20190106°0615 slidegear.js::o2ReadSetup_ImageList
    * @param   {string} sUrl — File to be read
    * @param   {Function} cbkLoad — Callback function for the case of success, taking one string parameter with the read content
    * @param   {Function} cbkFail — Callback function for the case of fail, taking one string parameter
    * @return  {undefined} —
    */
   , readTextFile2 : function(sUrl, cbkLoad, cbkFail)
   {
      'use strict';
      Trekta.Utils.ajax3Send('GET', sUrl, '', cbkLoad, cbkFail);
   }

   /**
    * Sends asynchronous Ajax request
    *
    * @id 20190405°0231 (after 20140704°1011)
    * @callers • Trekta.Utils.readTextFile2
    * @param sMethod {string} — Either 'GET' or 'POST' ("GET", "POST", "PUT", "DELETE")
    * @param sUrl {string} — The request URL
    * @param {string} sPayload — The data to transmit, only used with a POST request
    * @param {Function} cbkLoad — Callback function for the case of success, taking one string parameter
    * @param {Function} cbkFail — Callback function for the case of fail, taking one string parameter
    * @return {undefined} —
    */
   , ajax3Send : function(sMethod, sUrl, sPayload, cbkLoad, cbkFail)
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

   /**
    * This function shortens a long string by placing ellipsis in the middle
    *
    * @id ~20201203°1441
    * @callers • 20110811°1921 Daf.Mnu.Meo.execElementEdit
    * @param {string} sOrig — The string to be shortened
    * @param {number} iMaxLen (integer) — The maximum lenght of the output string
    * @return {string} — The wanted shortened string
    */
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
   , InitialMessageCache : Array()

   /**
    * This variable constitutes the onload ready flags for pullScriptBehind
    *
    * @id 20190405°0345
    * @note This flags solves issue 20190405°0331 'isScriptAlreadyLoaded unfaithful'
    * @type {Array} —
    */
   , aPulled : []


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
   , bIs_Browser_Chrome : ( navigator.userAgent.match(/Chrome/) ? true : false )

   /**
    * This ~constant provides a flag whether the browser is Edge or not
    *
    * @id 20190417°0217
    * @type {boolean} —
    */
   , bIs_Browser_Edge : ( navigator.userAgent.match(/Edge/) ? true : false )

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
   , bIs_Browser_Explorer : (
       ( navigator.appName.match(/Explorer/)
        || window.msCrypto                                             // only IE11 has this [line 20190417°0215] IE11 has different user agent string than other IE
         ) ? true : false )

   /**
    * This ~constant provides a flag whether the browser is Firefox or not
    *
    * @id 20160624°0121
    * @type {boolean} —
    */
   , bIs_Browser_Firefox : ( navigator.userAgent.match(/Firefox/) ? true : false )

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
   , bIs_Browser_Opera : ( navigator.userAgent.match(/(Opera)|(OPR)/) ? true : false )

   /**
    * This property tells whether to pop up debug messages or not
    *
    * @id 20190311°1521
    * @type {boolean} —
    */
   , bShow_Debug_Dialogs : false

   /**
    * This property provides a constant false value
    *
    * @id 20190407°0121
    * @type {boolean} —
    */
   , bToggle_FALSE : false

   /**
    * This property provides a constant false value
    *
    * @id 20190407°0122
    * @type {boolean} —
    */
   , bToggle_TRUE : true

   /**
    * This flag tells whether to pull-behind minified scripts or not
    *
    * @id 20190408°0115
    * @callers •
    * @type {boolean} —
    */
   , bUseMinified : false

   /**
    * This const provides the ID for the general output area (yellow pane)
    * @id 20160618°0421
    * @type {string} —
    */
   , sFurniture_OutputArea_Id : "i20150321o0231_StandardOutputDiv"

   /**
    * This tells ..
    *
    * @id 20160501°1622
    * @callers •
    * @type {string} —
    */
   , s_DaftariBaseFolderAbs : ''

   /**
    * This tells ..
    *
    * @id 20160501°1623
    * @callers •
    * @type {string} —
    */
   , s_DaftariBaseFolderRel : ''

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
// ~ ✂ ~ ~ ~ ~ ~ ~ ~ area 20190106°0307 stop ~ ~ ~ ~ ~ ~ ~ ~ ~
