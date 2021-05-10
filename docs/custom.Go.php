<?php
/**
 * This module originally constitutes the Daftari PHP entry point,.
 *  Now it is stripped down and adjusted to serve in a Termjnal demo
 *
 * file      : 20210506°1111 (after 20120906°1241)
 * license   : BSD-3-Clause //// (formerly GNU AGPL v3)
 * copyright : © 2012 - 2021 Norbert C. Maier
 * authors   : ncm
 * status    : Applicable
 * encoding  : UTF-8-without-BOM
 * callers   : The Termjnal Aloha Demo page //// All HTML pages headers
 */

/**
 * This is the root namespace for Daftari PHP code
 *
 * @note Not sure yet how to document namespaces. As it is done
 *        here it will not appear in NetBeans intellisense.
 * @package Trekta\Daftari is the root namespace for Daftari PHP code
 */
namespace Trekta\Daftari;

use Trekta\Daftari as TD;
////use Trekta\Daftari\Globals as Glb;

// Work off script-level code [line 20190205°0331]
Go::enter();

/**
 * This class provides the Daftari existence for any page
 *
 * @id 20190205°0311
 */
class Go
{

   /**
    * Dispatch command
    *
    * @id 20190209°0341
    * @caller Only • func Go::enter
    * @param Array $aQuery Associative array representing the commandline
    * @return {String} The answer of the command
    */
   private static function dispatchCommand($aQuery) : string
   {
      $sReturn = '';

      // Read command [seq 20190205°0547]
      $sCmd = $aQuery['cmd'];
      switch ($sCmd)
      {
         //// // [seq 20190205°0548]
         //// case 'cakecrumbsbag' :
         ////    include(__DIR__ . '/core/JsiCrumbs.php');
         ////    JsiCrumbs::crmbsExecute($aQuery);
         ////    break;

         //// case 'edit' :
         ////    include(__DIR__ . '/core/JsiEdit.php');
         ////    JsiEdit::execute();
         ////    break;

         //// // Get physical page file path [case 20190417°0141]
         //// // note : Workaround for not yet succeeded feature 20180512°0721 'open page in local text editor'
         //// // For opening an editor, see issue 20180512°0751 'php exec/system/passthru fails'
         //// case 'get-physical' :
         ////    include_once(__DIR__ . '/core/JsiPhysical.php');
         ////    $sSuperGetFile = $_GET[Glb::GET_KEY_AJX_file];        // Compare var 20170903°0311
         ////    $sPagePhysical = JsiPhysical::getPagePhysical($sSuperGetFile);
         ////    $sReturn = $sPagePhysical;
         ////    break;

         case 'spin' :
            ////include_once(__DIR__ . '/galari/Spider.php');
            include_once(__DIR__ . '/custom.Spider.php');

            // Execute command, then pipeline response to centralized echo on line 20190312°0513
            $sReturn = TD\Spider::spin('');
            break;

         //// case 'simple-html-dom-demo' :
         ////    include(__DIR__ . '/utils/jsi-demo-pshdp.php');
         ////    break;

         //// case 'jsi-demo-dom-doc' :
         ////    include(__DIR__ . '/utils/jsi-demo-dom-doc.php');
         ////    break;

         //// case 'jsi-demo-dom-gen' :
         ////    include(__DIR__ . '/utils/jsi-demo-dom-gen.php');
         ////    break;

         default :
      }

      return $sReturn;
   }

   /**
    * This method processes all calls of this script.
    *  ////(This shall become the eye of a needle, but is not yet)
    *
    * @id 20190205°0321
    * @callers Only • this script level
    */
   public static function enter()
   {
// Shutdown [chg 20210506°1311]
/*
      // Must be first line of code [line 20121028°181111]
      include_once(__DIR__ . '/core/Session.php');
*/
      // [var 20190312°0511]
      $sReturn = '';

// Shutdown [chg 20210506°1312]
/*
      // So far allow edit only on localhost [seq 20120814°1414]
      // todo : If here is the eye of the needls, eliminate all other occurrences of this seqence
      if (Glb::$Lgn_bHostIsLocalhost !== TRUE)
      {
         echo 'Edit is not possible.';
         return;
      }
*/

      //// // Experiment [seq 20120925°1121]
      //// include_once(__DIR__ . '/core/Configo.php');
      //// $cfg = TD\Configo::getInstance();                           // [issue 20190312°0631 'something is wrong, or is is fine?']
      //// $canary = $cfg->cfg_canary_variable;
      //// //echo('<p>debug cfg_canary_variable = "' . $canary . '"</p>');

// Provisory shutdown [chg 20210506°1313]
/*
      // Determine this page's filename [seq 20120814°1403]
      $sScriptfile = $_SERVER[Glb::SVR_KEY_SCRIPT_FILENAME];
      // e.g. 'X:/workspaces/daftaridev/trunk/daftari/docs/blogs.html'

      // Paranoia — How can this happen? [seq 20120814°1405]
      if (! is_file($sScriptfile))
      {
         print('<p>[Error 20120814°1405] Program flow error with ' . $sScriptfile . '</p>');
         return;
      }
*/

      // Perform the wanted job [line 20190205°0551]
      $sReturn = self::readCommand();

      // Provide response for Ajax request [line 20190312°0513]
      //  Here is the centralized echo, the single place to do so.
      if ($sReturn !== '') {
         echo($sReturn);
      }
   }

   /**
    * Detect and execute any possible command
    *
    * @id 20190205°0541
    * @note Command sender on JavaScript side are (list to be completed) :
    *     • func 20120830°0451 Daf.Mnu.Edt.editFinishTransmit seq 20120830°0453
    *     • func 20190413°0741 Daf.Dspat.processCakeCrumbBag seq 20190413°0753
    * @return {String} Result string
    */
   private static function readCommand()
   {
      $sReturn = '';
      
      // Extract commandline from Superglobal [seq 20190205°0543]
      // note : Process issue 20190205°0617 'get key list from $_GET unoffendingly'
      $sQuery = \filter_input(INPUT_SERVER, 'QUERY_STRING');           // e.g.  "XDEBUG_SESSION_START=netbeans-xdebug"
      $aItems = explode('&', $sQuery);
      $aQuery = array();
      foreach ( $aItems as $sItem )
      {
         $aKeyVal = explode('=', $sItem);
         if (sizeof($aKeyVal) < 1)
         {
            // This can never happen?
         }
         else if (sizeof($aKeyVal) == 1)
         {
            // This can never happen?
            $aQuery[$aKeyVal[0]] = '';
         }
         else
         {
            // () Skip XDebug entry [seq 20190205°0543]
            //   Not necessary. Just one empiric key, no systematic coverage.
            if ( $aKeyVal[0] === 'XDEBUG_SESSION_START' )
            {
               continue;
            }

            // () Process the normal case [seq 20190205°0544]
            $aQuery[$aKeyVal[0]] = $aKeyVal[1];

            // () Supplement for special case [seq 20190205°0545]
            //  There are more than two elements in case the value contains '='.
            // todo : This situation is not yet tested. Test it.
            for ($i = 2; $i < sizeof($aKeyVal); $i++)
            {
               $aQuery[$aKeyVal[0]] .= '=';
               $aQuery[$aKeyVal[0]] .= $aKeyVal[$i];
            }
         }
      }

      // Is any command given? [seq 20190205°0546]
      if (array_key_exists('cmd', $aQuery))
      {
         // Process command [line 20190205°0547]
         $sReturn = self::dispatchCommand($aQuery);
      }

      // Pipeline back result
      return $sReturn;
   }
}

/* eof */
