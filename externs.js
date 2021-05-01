/*!
 *  file : 20210429°1531
 *  version : Initial
 *  status : First attempt, much room for fine tuning
 *  see : The comment tags are described on [ref 20210416°1641]
 *      https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
 */

/**
 *  @fileoverview Public API of terminal.js
 *  @externs
 */

/**
 * This class provides a div with terminal functionalities
 *
 * @id 20190208°1923
 */
var Terminal;


/**
 * @type {Function} —
 * @_return {undefined} —
 */
Terminal.beep;

/**
 * @type {Function} —
 * @param {boolean} —
 * @_returns {undefined} —
 */
Terminal.blinkingCursor;

/**
 * @type {Function} —
 * @_returns {undefined} —
 */
Terminal.clear;

/*
   issue 20210430°1531 'JSC_TYPE_PARSE_ERROR'
   matter : When adding param annotation to a type declaration like this
      | /**
      |  * @type {Function} —
      |  * @param {Function} callback —
      | * /
      the GoCloCom emits 'WARNING - [JSC_TYPE_PARSE_ERROR] Bad type annotation'
   see : https://github.com/google/closure-compiler/issues/3767 [ref 20210430°1532] not so helpful
   workaround : Keep the offending parts outcommented
   priority : Low
   location : File 20210429°1531 extern.js
   status : Open
*/

/**
 * @type {Function} —
 * @note Remember issue 20210430°1531 'JSC_TYPE_PARSE_ERROR'
 * @param {string} // [message] —
 * @param {Function} // [callback] —
 * @_returns {undefined} —
 */
Terminal.confirm;

/**
 * @type {Node} —
 */
Terminal.html;

/**
 * @type {Function} —
 * @param {string} // message —
 * @param {Function} // callback —
 * @_returns {undefined} —
 */
Terminal.input;

/**
 * @type {Function} —
 * @param {string} // message —
 * @param {Function} // callback —
 * @_returns {undefined} —
 */
Terminal.password;

/**
 * @param {string} —
 * @type {Function} —
 */
Terminal.setBackgroundColor;

/**
 * @param {string} —
 * @type {Function} —
 */
Terminal.setHeight;

/**
 * @param {string} —
 * @type {Function} —
 */
Terminal.setWidth;

/**
 * @param {string} —
 * @type {Function} —
 */
Terminal.setTextSize;

/**
 * @param {string} —
 * @type {Function} —
 */
Terminal.setTextColor;

/**
 * @type {Function} —
 */
Terminal.sleep;

/* eof */
