/*
 PurpleTerms v0.3.1.2~ — Single-file JavaScript to put up terminals on a web page
 BSD 3-Clause License
 (c) 2014 Erik Österberg | https://github.com/eosterberg/terminaljs/
 (c) 2021 Norbert C. Maier and contributors | https://github.com/normai/terminaljs/
*/
Terminal = function() {
  var _VersionString = "v0.3.1.2~";
  var _PROMPT_CONFIRM = 3;
  var _PROMPT_INPUT = 1;
  var _PROMPT_PASSWORD = 2;
  var _aIds = [];
  var _b_Choose_Div_Not_Pre_FREE_FOR_RECYCLING = true;
  var _b_Line_Style_FontFamily_Inherit;
  var _b_Use_ScrollTo_With_InnerWindow;
  var _b_DebugBorders = false;
  var _inputPromptGlobal = ">\\00a0";
  var _outputPromptGlobal = "<\\00a0";
  var firstPrompt = true;
  var _generateId = function(idGiven) {
    var sIdRet = "";
    if (!idGiven) {
      var iCount = 0;
      while (true) {
        iCount++;
        if (_aIds.indexOf(iCount.toString()) >= 0) {
          continue;
        }
        break;
      }
      sIdRet = iCount.toString();
    } else {
      var bAllowed = true;
      if (idGiven.length < 1 || idGiven.length > 32) {
        bAllowed = false;
      }
      if (bAllowed) {
        for (var i = 0; i < idGiven.length; i++) {
          var c = idGiven.charAt(i);
          if (!c.match(/[a-zA-Z0-9_]/i)) {
            bAllowed = false;
            break;
          }
        }
      }
      if (_aIds.indexOf(idGiven) >= 0) {
        bAllowed = false;
      }
      if (!bAllowed) {
        sIdRet = _generateId(null);
      } else {
        sIdRet = idGiven.toString();
      }
    }
    return sIdRet;
  };
  var fireCursorInterval = function(inputField, oThis) {
    var cursor = oThis._cursor;
    setTimeout(function() {
      if (inputField.parentElement && oThis._shouldBlinkCursor) {
        cursor.style.visibility = cursor.style.visibility === "visible" ? "hidden" : "visible";
        fireCursorInterval(inputField, oThis);
      } else {
        cursor.style.visibility = "visible";
      }
    }, 500);
  };
  var s_IdDelim = "_";
  var sClass_1_Html_Div = "Terminal";
  var s_Terminal_Complete = "Terminal_Complete";
  var s_Terminal_Output = "Terminal_Output";
  var sStyle_P_OutputBox = "Terminal_Output";
  var s_Output_One_Line = "Output_One_Line";
  var s_Term_OutLine_FormerIn = "Terminal_OutputLine_FormerInput";
  var s_Terminal_Input = "Terminal_Input";
  var promptInput = function(oThis, message, iPROMPT_TYPE, callback) {
    var bShouldDisplayInput = iPROMPT_TYPE === _PROMPT_INPUT;
    var inputField = document.createElement("input");
    inputField.style.position = "absolute";
    inputField.style.zIndex = "-100";
    inputField.style.outline = "none";
    inputField.style.border = "none";
    inputField.style.opacity = "0";
    inputField.style.fontSize = "0.2em";
    oThis._inputLine.textContent = oThis._inputLine.textPrefix ? oThis._inputLine.textPrefix : "";
    oThis._inputElement.style.display = "block";
    oThis.html.appendChild(inputField);
    fireCursorInterval(inputField, oThis);
    if (message !== null) {
      oThis.print(iPROMPT_TYPE === _PROMPT_CONFIRM ? message + " (y/n)" : message);
    }
    inputField.onblur = function() {
      oThis._cursor.style.display = "none";
    };
    inputField.onfocus = function() {
      inputField.value = oThis._inputLine.textContent;
      oThis._cursor.style.display = "inline";
    };
    oThis.html.onclick = function() {
      inputField.focus();
    };
    inputField.onkeydown = function(e) {
      if ((e.code === "Backspace" || e.which === 8) && inputField.value.length === inputField.value.length || inputField.value.length <= oThis._inputLine.textPrefix) {
        oThis._inputLine.textContent = oThis._inputLine.textPrefix;
        e.preventDefault();
      } else {
        if (e.code === "ArrowLeft" || e.which === 37 || (e.code === "ArrowUp" || e.which === 38) || (e.code === "ArrowRight" || e.which === 39) || (e.code === "ArrowDown" || e.which === 40) || (e.code === "Tab" || e.which === 9)) {
          e.preventDefault();
        } else {
          if (bShouldDisplayInput && !(e.code === "Enter" || e.which === 13)) {
            setTimeout(function() {
              oThis._inputLine.textContent = inputField.value;
            }, 1);
          }
        }
      }
    };
    inputField.onkeyup = function(e) {
      if (iPROMPT_TYPE === _PROMPT_CONFIRM || (e.code === "Enter" || e.which === 13)) {
        oThis._inputElement.style.display = "none";
        var inputValue = inputField.value;
        if (inputValue === oThis._inputLine.textPrefix + "clear") {
          oThis.clear();
          oThis.input("", false);
          return true;
        }
        if (bShouldDisplayInput) {
          oThis.print(inputValue, s_Term_OutLine_FormerIn + s_IdDelim + oThis.getId());
        }
        oThis.html.removeChild(inputField);
        if (oThis._backend) {
          var xhr = new XMLHttpRequest;
          xhr.open("POST", oThis._backend, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              oThis.print(xhr.responseText);
              oThis.input("", false);
            }
          };
          xhr.send("prefix=" + oThis._inputLine.textPrefix + "&ssh=" + inputValue);
        } else {
          if (typeof callback === "function") {
            if (iPROMPT_TYPE === _PROMPT_CONFIRM) {
              callback(inputValue.toUpperCase()[0] === "Y" ? true : false);
            } else {
              callback(inputValue);
            }
          }
        }
      }
    };
    if (firstPrompt) {
      firstPrompt = false;
      setTimeout(function() {
        inputField.focus();
      }, 50);
    } else {
      var iY = window.scrollY;
      inputField.focus();
      window.scrollTo(0, iY);
    }
  };
  var elTerminalBeep = null;
  var TerminalCtor = function(idParam) {
    this.getId = function() {
      return this._objId.toString();
    };
    var _mountCssRules = function(oThis) {
      var sIdent = s_IdDelim + oThis.getId();
      var sStyleElementId = "Kog2frh5cbfn47pm" + sIdent;
      var sColorCompleteBox = "Magenta";
      var sColorOutputBox = "Gold";
      var sColorOutputLine = "GreenYellow";
      var sColorOutputPrompt = "Orange";
      var sColorOutLineInput = "Magenta";
      var sColorOutLineInPrompt = "HotPink";
      var sColorInputLine = "Red";
      var sColorInputPrompt = "Yellow";
      var el = document.getElementById(sStyleElementId);
      if (el) {
        el.remove();
      }
      var eStyle = document.createElement("style");
      eStyle.type = "text/css";
      var at = document.createAttribute("id");
      at.value = sStyleElementId;
      eStyle.setAttributeNode(at);
      var sRu1CompleteBox = _b_DebugBorders ? "\n" + "div." + s_Terminal_Complete + sIdent + " {" + " " + "border:1px solid " + sColorCompleteBox + "; border-radius:0.3em; padding:0.2em;" + " " + "}" : "\n" + "div." + s_Terminal_Complete + sIdent + " { }";
      var sRu2OutputBox = _b_DebugBorders ? "\n" + "p." + s_Terminal_Output + sIdent + " {" + " " + "border:1px solid " + sColorOutputBox + "; border-radius:0.3em; padding:0.2em;" + " " + "}" : "\n" + "p." + s_Terminal_Output + sIdent + " { }";
      var sRu3OutputLine = _b_DebugBorders ? "\n" + "div." + s_Output_One_Line + sIdent + " { " + "border:1px solid " + sColorOutputLine + "; border-radius:0.3em; padding:0.2em;" + " }" + "\n" + "div." + s_Output_One_Line + sIdent + ":before {" + " " + "border:1px solid " + sColorOutputPrompt + "; border-radius:0.2em;" + " " + "padding:0.1em; content:'" + _outputPromptGlobal + "'; }" : "\n" + "div." + s_Output_One_Line + sIdent + " { }" + "\n" + "div." + s_Output_One_Line + sIdent + ":before { content:'" + 
      _outputPromptGlobal + "'; }";
      var sRu4OutFormerInput = _b_DebugBorders ? "\n" + "div." + s_Term_OutLine_FormerIn + sIdent + " { " + "border:1px solid " + sColorOutLineInput + "; border-radius:0.3em; padding:0.2em;" + " }" + "\n" + "div." + s_Term_OutLine_FormerIn + sIdent + ":before {" + " " + "border:1px solid " + sColorOutLineInPrompt + "; border-radius:0.2em;" + " " + "padding:0.1em; content:'" + _inputPromptGlobal + "'; }" : "\n" + "div." + s_Term_OutLine_FormerIn + sIdent + " { }" + "\n" + "div." + s_Term_OutLine_FormerIn + 
      sIdent + ":before { content:'" + _inputPromptGlobal + "'; }";
      var sRu5InputLine = "";
      if (_b_DebugBorders) {
        sRu5InputLine = "\n" + "span." + s_Terminal_Input + sIdent + " {" + " " + "border:1px solid " + sColorInputLine + "; border-radius:0.3em; padding:0.2em;" + " " + "}" + "\n" + "span." + s_Terminal_Input + sIdent + ":before" + " " + "{" + " " + "border:1px solid " + sColorInputPrompt + "; border-radius:0.2em;" + " " + "padding:0.1em; content:'" + _inputPromptGlobal + "'; }";
      } else {
        sRu5InputLine = "\n" + "span." + s_Terminal_Input + sIdent + " { }" + "\n" + "span." + s_Terminal_Input + sIdent + ":before { content:'" + _inputPromptGlobal + "'; }";
      }
      eStyle.innerHTML = sRu1CompleteBox + sRu2OutputBox + sRu3OutputLine + sRu4OutFormerInput + sRu5InputLine;
      document.getElementsByTagName("head")[0].appendChild(eStyle);
    };
    this.html = document.createElement("div");
    this.html.className = sClass_1_Html_Div;
    this._objId = "";
    var _n_Volume = 0.7;
    var s = _generateId(idParam);
    _aIds.push(s);
    this._objId = s;
    this.html.id = this._objId;
    if (!elTerminalBeep) {
      elTerminalBeep = document.createElement("audio");
      var sData = "data:audio/mp3;base64," + sBase64_Beep_Mp3;
      elTerminalBeep.innerHTML = '<source type="audio/mp3" src="' + sData + '">';
      elTerminalBeep.volume = _n_Volume;
    }
    this._cursor = document.createElement("span");
    this._history = [];
    this._historyLast = -1;
    this._innerWindow = null;
    this._innerWindow = document.createElement("div");
    this._inputElement = document.createElement("p");
    this._inputLine = document.createElement("span");
    this._inputLine.className = s_Terminal_Input + s_IdDelim + this.getId();
    this._inputPrompt = ">\\00a0";
    this._output = document.createElement("p");
    this._output.className = s_Terminal_Output + s_IdDelim + this.getId();
    this._outputPrompt = "<\\00a0";
    this._shouldBlinkCursor = true;
    this.beep = function() {
      elTerminalBeep.load();
      elTerminalBeep.play();
    };
    this.blinkingCursor = function(sBool) {
      sBool = sBool.toString().toUpperCase();
      this._shouldBlinkCursor = sBool === "TRUE" || sBool === "1" || sBool === "YES";
    };
    this.clear = function() {
      this._output.innerHTML = "";
    };
    this.clearHistory = function() {
      this.history = [];
      this.lasthistory = -1;
    };
    this.confirm = function(message, callback) {
      promptInput(this, message, _PROMPT_CONFIRM, callback);
    };
    this.connect = function(url) {
      this._backend = url;
      promptInput(this, "", 1, null);
    };
    this.getVersion = function() {
      return _VersionString;
    };
    this.input = function(message, callback) {
      promptInput(this, message, _PROMPT_INPUT, callback);
    };
    this.password = function(message, callback) {
      promptInput(this, message, _PROMPT_PASSWORD, callback);
    };
    this.print = function(message, sOptionalRule) {
      var sRule = sOptionalRule || s_Output_One_Line + s_IdDelim + this.getId();
      var eNewLine = document.createElement("div");
      eNewLine.textContent = message;
      if (_b_Line_Style_FontFamily_Inherit) {
        eNewLine.style.fontFamily = "inherit";
      }
      eNewLine.className = sRule;
      this._output.appendChild(eNewLine);
      if (this.html.scrollTo) {
        if (_b_Use_ScrollTo_With_InnerWindow) {
          this.html.scrollTo(0, this._innerWindow.scrollHeight);
        } else {
          this.html.scrollTo(0, this._output.scrollHeight);
        }
      }
    };
    this.setBackgroundColor = function(col) {
      this.html.style.background = col;
    };
    this.setDebugBorders = function(bStatus) {
      _b_DebugBorders = bStatus;
      _mountCssRules(this);
    };
    this.setHeight = function(height) {
      this.html.style.height = height;
    };
    this.setInputPrompt = function(sParam) {
      this._inputPrompt = sParam;
      _inputPromptGlobal = sParam;
      _mountCssRules(this);
    };
    this.setOutputPrompt = function(sParam) {
      this._outputPrompt = sParam;
      _outputPromptGlobal = sParam;
      _mountCssRules(this);
    };
    this.setTextColor = function(col) {
      this.html.style.color = col;
      this._cursor.style.background = col;
    };
    this.setTextSize = function(size) {
      this._output.style.fontSize = size;
      this._inputElement.style.fontSize = size;
    };
    this.setVolume = function(value) {
      if (typeof value !== "number") {
        this.print("Error — Volume be number, not '" + value.toString() + "'", undefined);
        return;
      } else {
        if (value < 0 || value > 1) {
          this.print("Error — Volume be from 0.0 to 1.0, not '" + value.toString() + "'", undefined);
          return;
        }
      }
      _n_Volume = value;
      elTerminalBeep.volume = _n_Volume;
    };
    this.setWidth = function(width) {
      this.html.style.width = width;
    };
    this.sleep = function(milliseconds, callback) {
      setTimeout(callback, milliseconds);
    };
    this._inputElement.appendChild(this._inputLine);
    this._inputElement.appendChild(this._cursor);
    this._innerWindow.appendChild(this._output);
    this._innerWindow.appendChild(this._inputElement);
    this._innerWindow.style.padding = "10px";
    this._innerWindow.className = s_Terminal_Complete + s_IdDelim + this.getId();
    this.html.appendChild(this._innerWindow);
    this.setBackgroundColor("black");
    this.setHeight("100%");
    this.setTextColor("white");
    this.setTextSize("1em");
    this.setWidth("100%");
    this._inputElement.style.display = "none";
    this._inputElement.style.margin = "0";
    this._cursor.innerHTML = "X";
    this._cursor.style.background = "white";
    this._cursor.style.display = "none";
    this._output.style.margin = "0";
    this.html.style.fontFamily = "Courier, Monaco, Ubuntu Mono, monospace";
    this.html.style.margin = "0";
    this.html.style.overflow = "auto";
    this.html.style.resize = "auto";
    this._backend = false;
    _mountCssRules(this);
    return;
  };
  var sBase64_Beep_Mp3 = "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" + "BKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqq//sQZLiP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqq" + 
  "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqr/+xBk2o/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT8j/AA" + "AGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0g" + "AAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu" + "OTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAA" + 
  "IAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/" + "+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkA" + 
  "AAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAAB" + "AAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTgu" + "Mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAA" + "NIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqq" + 
  "qqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk" + "/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAI" + "AAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxB" + "TUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAAB" + "pAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqq" + 
  "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAA" + "AASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/w" + "AABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + 
  "qqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAAN" + "IAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUz" + "Ljk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAA" + "ACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqq" + 
  "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "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" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAA" + "aQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + 
  "qqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAA" + "AAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45" + "OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAg" + "AAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqq" + 
  "qqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7" + "EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAA" + "AAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "TEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEA" + "AAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4y" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0" + 
  "gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/" + "j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqkxBTUUzLjk4LjKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgA" + 
  "AA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFN" + "RTMuOTguMqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGk" + "AAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OC4yqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAA" + "BKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + 
  "qqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AA" + "AGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZP+P8AAAaQAAAAgAAA0g" + "AAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk/4/wAABpAAAACAAADSAAAAEAAAGkAAAA" + "IAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + 
  "qqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqq" + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq" + "qqqqqqqqqqqqQVBFVEFHRVjQBwAAVQAAAAIAAAAAAACgAAAAAAAAAAAOAAAAAAAAAEFydGlzdABT" + "b3VuZEJpYmxlLmNvbQoAAAAAAAAAVGl0bGUAQmVlcCBTb3VuZEFQRVRBR0VY0AcAAFUAAAACAAAA" + "AAAAgAAAAAAAAAAAVEFHQmVlcCBTb3VuZAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRCaWJsZS5j" + "b20AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8=";
  return TerminalCtor;
}();
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty("remove")) {
      return;
    }
    Object.defineProperty(item, "remove", {configurable:true, enumerable:true, writable:true, value:function remove() {
      this.parentNode && this.parentNode.removeChild(this);
    }});
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype].filter(Boolean));

