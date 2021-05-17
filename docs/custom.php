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

// [seq 20210514°1151]
if ( ! isset($_SESSION) ) {                                            // Qualified paranoia [seq 20180508°2023] Fix issue 20180508°2021 'session had already started'
   if (session_start() !== true) {                                     // [line 20110503°1037] Remember ref 20110503°1031 'tedd sperling → simple session example' — Must be first line of code
      echo('<p class="error">Quirk 20110508°1852 was seen.</p>');      // Fatal error, using css class 'error' [seq 20110508°1841]
      exit();                                                          // [line 20120916°1701]
   }
}

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

            // [seq 20210514°1153]
            ////$sReturn = TD\DiceEngine::roll('');
            $sReturn = 'You rolled ' . strval(TD\DiceEngine::roll('')) . '' ;
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
 * @id 20210514°1111
 * @status
 * @callers
 */
class DiceEngine
{
   /**
    * This method rolls one dice
    *
    * @id 20210514°1113
    * @callers •
    * @return {Integer} — The rolled number
    */
   public static function roll() : string
   {
      return $iRolled = rand(1, 6);
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
    *  A first storage to introduce sessions
    *
    * @id @20210514°1121
    * @var {String} —
    */
   ////const sSESKEY_Counter = 'Counter';static
   public static $sSESKEY_Counter = 'Counter';

   /**
    * This method constitutes the scanner's entry point
    *
    * @id 20190209°0431
    * @callers • Go.php
    * ////@param $sTarget_ {String} The current target address to spin from
    * @return {String} The answer
    */
   ////public static function spin($sTarget_) : string //// NetBeans warning '$sTarget_ seems to be unused ..'
   public static function spin() : string                              // [chg 20210514°1123]
   {
      $sRet = "";
      ////$iRolled = "0";

      // () Build answer
      $iRolled = TD\DiceEngine::roll();

      // () Maintain session [seq 20210514°1125]
      if (! isset($_SESSION[TD\Spider::$sSESKEY_Counter])) {
         $_SESSION[TD\Spider::$sSESKEY_Counter] = 1;
      }
      else {
         $_SESSION[TD\Spider::$sSESKEY_Counter]++;
      }

      // () Assemble answer
      $sRet = 'You rolled ' . strval($iRolled) . ' [' . strval($_SESSION[TD\Spider::$sSESKEY_Counter]) . ']';

      return $sRet;
   }
}

/* eof */
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
