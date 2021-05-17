<?php
/**
 * This module originally constitutes the Daftari PHP entry point,.
 *  Now it is stripped down and adjusted to serve in a PurpleTerms demo
 *
 * file      : 20210506°1131 [[20210506°1111]] (after 20120906°1241)
 * license   : BSD-3-Clause // // (formerly GNU AGPL v3)
 * copyright : © 2012 - 2021 Norbert C. Maier
 * authors   : ncm
 * status    : Applicable
 * encoding  : UTF-8-without-BOM
 * callers   : The PurpleTerms Custom Demo // // All HTML pages headers
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
         case 'roll' :

            // [seq 20210514°11xx]
            $sReturn = TD\DiceEngine::roll('');
            break;

         case 'spin' :

            // Execute command, then pipeline response to centralized echo on line 20190312°0513
            $sReturn = TD\Spider::spin('');
            break;

         default :
      }

      return $sReturn;
   }

   /**
    * This method processes all calls of this script.
    *
    * @id 20190205°0321
    * @callers Only • this script level
    */
   public static function enter()
   {
      // [var 20190312°0511]
      $sReturn = '';

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


// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
/**
 * This module hosts class Spider (fragments of it for PurpleTerms)
 *
 * file      : 20210506°1141 [after 20190209°0411 daftari/php/galari/Spider.php]
 * license   : BSD 3-Clause License //// (formerly GNU AGPL v3)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * authors   : ncm
 * encoding  : UTF-8-without-BOM
 * callers   :
 */


/**
 * This class offers dice rolling service(s)
 *
 * @id 20210514°11xx
 * @status
 * @callers
 */
class DiceEngine
{

   /**
    * This method rolls one dice
    *
    * @id 20210514°11xx
    * @callers •
    * @return {String} — The rolled number
    */
   public static function roll() : string
   {
      $sRet = '';

      $iRet = rand(1, 6);

      $sRet = "You rolled " . strval($iRet) . "";

      return $sRet;
   }
}


/**
 * This class shall scan hierarchies, notably the server directory tree
 *
 * @id 20190209°0421
 * @status Under construction
 * @callers
 */
class Spider
{

   /**
    * This method constitutes the scanner's entry point
    *
    * @id 20190209°0431
    * @callers • Go.php
    * @param $sTarget_ {String} The current target address to spin from
    * @return {String} The answer
    */
   public static function spin($sTarget_) : string //// NetBeans warning '$sTarget_ seems to be unused ..'
   {
      $sRet = "";

      // [seq 20190312°0531]
      ////$sNext = self::getNextEntry($sCurrFolder, $sCurrFile);
      ////$sNext = self::getNextEntry();

      // Build answer
      ////$sRet = "Spin " . time() . " " . $sNext;
      $sRet = TD\DiceEngine::roll();

      //// // Write back current scan address
      //// self::$cfg->setValue('SpiderCurrentFolder', $sNext);

      return $sRet;
   }

////   /**
////    * This method retrieves the next item
////    *
////    * @id 20190312°0541
////    * @note At some other places so far we always used readdir(). Here
////    *   we try scandir(), which is different in the following aspects :
////    *    • It yields an array with all entries, not one single entry
////    *    • It has sort options
////    *    • The manual says, it can also handle URLs
////    * @callers • self::spin()
////    * @param $sFolder {String} The current folder
////    * @param $sFile {String} The current file
////    * @return {String} The wanted next entry
////    */
////   ////private static function getNextEntry($sFolder, $sFile) : string
////   private static function getNextEntry() : string
////   {
////      //
////      $sNext = 'äkjölkj.xyz';
////
////      // [seq 20190312°0551]
////      ////$aEntries = scandir($sFolder);
////      $iNext = rand(100, 999);                                         // [chg 20210506°1221]
////      $sNext = strval($iNext);                                         // [chg 20210506°1221`02]
////
////      return $sNext;
////   }
}

/* eof */
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
