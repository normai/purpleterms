<?php

/**
 * This module hosts class Spider
 *
 * file      : 20210506°1211 (after 20190209°0411)
 * license : BSD 3-Clause License //// (formerly GNU AGPL v3)
 * copyright : © 2019 - 2021 Norbert C. Maier
 * authors   : ncm
 * encoding  : UTF-8-without-BOM
 * callers   :
 */

namespace Trekta\Daftari;

//use Trekta\Daftari as TD;
////use Trekta\Daftari\Globals as Glb;

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
    * This method analyses the current address to feed the scanner
    *
    * @id 20190312°0611
    * @callers • self::spin()
    * @param $sTarget {String} The current target address to spin from
    * @return {Array} Two fields: current folder, current file
    */
   /*
   private static function analyseCurrent($sTarget) : array
   {
      $sCurrFolder = '';                                               // foldername only
      $sCurrFile = '';                                                 // plain filename only

      // Guarantee valid target container [seq 20190312°0621]

      // (.1) Extract the two components
      $a = pathinfo($sTarget);
      $sCurrFolder = $a['dirname'] ?? ''; // without trailing slash
      $sCurrFile = $a['basename'] ?? '';

      // (.2) Target folder valid?
      if ( is_dir($sCurrFolder) ) {
         // Fine
      }
      else {
         // (.3) Fetch target from configuration
         // note : Not sure yet, whether it is a good idea to access the Configo
         //    class statically, or better use getInstance, as other callers do.
         $sCurrFold = self::$cfg->getValue('SpiderCurrentFolder');

         $a = pathinfo($sCurrFold);
         $sCurrFolder = $a['dirname'] ?? '';                           // Without trailing slash
         $sCurrFile = $a['basename'] ?? '';
      }

      // Build answer
      $aRet = array();
      $aRet[0] = $sCurrFolder;
      $aRet[1] = $sCurrFile;
      return $aRet;
   }
   */

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

      //// // [line 20190312°0731]
      //// self::$cfg = Configo::getInstance();
      ////
      //// // Guarantee valid folder value [seq 20190312°0521]
      //// $a = self::analyseCurrent($sTarget_);
      //// $sCurrFolder = $a[0];                                       // Must be an existing folder
      //// $sCurrFile = $a[1];                                         // Does not need to exist

      // [seq 20190312°0531]
      ////$sNext = self::getNextEntry($sCurrFolder, $sCurrFile);
      $sNext = self::getNextEntry();

      // Build answer
      $sRet = "Spin " . time() . " " . $sNext;

      // Does not work, the pointed brackets are converted to HTML entities
      ///$sRet = $sRet . '<br />' . $sFolder;

      //// // Write back current scan address
      //// self::$cfg->setValue('SpiderCurrentFolder', $sNext);

      return $sRet;
   }

   /**
    * This method retrieves the next item
    *
    * @id 20190312°0541
    * @note At some other places so far we always used readdir(). Here
    *   we try scandir(), which is different in the following aspects :
    *    • It yields an array with all entries, not one single entry
    *    • It has sort options
    *    • The manual says, it can also handle URLs
    * @callers • self::spin()
    * @param $sFolder {String} The current folder
    * @param $sFile {String} The current file
    * @return {String} The wanted next entry
    */
   ////private static function getNextEntry($sFolder, $sFile) : string
   private static function getNextEntry() : string
   {
      //
      $sNext = 'äkjölkj.xyz';

      // [seq 20190312°0551]
      ////$aEntries = scandir($sFolder);
      $iNext = rand(100, 999);                                         // [chg 20210506°1221]
      $sNext = strval($iNext);                                         // [chg 20210506°1221`02]

      return $sNext;
   }

   //// /**
   ////  * @id 20190312°0721
   ////  * @todo Possibly create and store this in Go.php, since there is the single entry point
   ////  * @var {Object} Store the Configo instance
   ////  */
   //// private static $cfg = NULL;

}

/* eof */
