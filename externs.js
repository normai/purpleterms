/*!
 *  file : 20210429°1531
 *  version : Initial
 *  status : First attempt, much room for fine tuning
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

/**
 * @type {Function} —
 * @param {string} //// message —
 * @param {Function} //// callback —
 * @_returns {undefined} —
 */
Terminal.confirm;

/**
 * @type {Node} —
 */
Terminal.html;

/**
 * @type {Function} —
 * @param {string} //// message —
 * @param {Function} //// callback —
 * @_returns {undefined} —
 */
Terminal.input;

/**
 * @type {Function} —
 * @param {string} //// message —
 * @param {Function} //// callback —
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
