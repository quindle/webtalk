(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("webtalklib", [], factory);
	else if(typeof exports === 'object')
		exports["webtalklib"] = factory();
	else
		root["webtalklib"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/webtalklib.ts":
/*!***************************!*\
  !*** ./src/webtalklib.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebTalkLib: () => (/* binding */ WebTalkLib)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WebTalkLib = /*#__PURE__*/function () {
  function WebTalkLib(startElementId, scanAttributeName, language) {
    _classCallCheck(this, WebTalkLib);
    _defineProperty(this, "scanAttributeName", 'aria-label');
    _defineProperty(this, "className", 'webtalklib');
    _defineProperty(this, "selectedClassName", 'webtalklib_selected');
    _defineProperty(this, "currentSelected", null);
    _defineProperty(this, "startElementId", null);
    _defineProperty(this, "startElement", null);
    _defineProperty(this, "commands", new Array());
    _defineProperty(this, "systemCommands", ['clicca', 'esci']);
    _defineProperty(this, "language", window.navigator.language);
    _defineProperty(this, "recognition", void 0);
    _defineProperty(this, "grammar", void 0);
    this.startElementId = startElementId || this.startElementId;
    this.scanAttributeName = scanAttributeName || this.scanAttributeName;
    this.language = language || window.navigator.language;
    this.configure();
  }
  _createClass(WebTalkLib, [{
    key: "configure",
    value: function configure() {
      var _this = this;
      this.startElement = this.startElementId ? document.getElementById(this.startElementId) || document.body : document.body;
      this.scanDocument();

      // documentation of speech recognition in https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
      this.recognition = new SpeechRecognition();
      this.grammar = new SpeechGrammarList();
      var systemCommandsGrammar = "#JSGF V1.0; grammar syscommands; public <syscommand> = ".concat(this.systemCommands.join(" | "), ";");
      var commandsGrammar = "#JSGF V1.0; grammar commands; public <command> = ".concat(this.commands.join(" | "), ";");
      this.grammar.addFromString(systemCommandsGrammar);
      this.grammar.addFromString(commandsGrammar);
      this.recognition.grammars = this.grammar;
      this.recognition.continuous = false;
      this.recognition.lang = this.language;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.startElement.addEventListener('click', function () {
        return _this.startRecognition();
      });
      this.recognition.addEventListener('result', function (e) {
        return _this.onRecognitionResult(e);
      });
      this.recognition.addEventListener('speechend', function () {
        return _this.onRecognitionSpeechEnd();
      });
      this.recognition.addEventListener('nomatch', function () {
        return _this.onRecognitionNoMatch();
      });
    }
  }, {
    key: "startRecognition",
    value: function startRecognition() {
      if (this.recognition && !this.recognition.started) {
        console.log("startRecognition");
        this.recognition.start();
        this.recognition.started = true;
      }
    }
  }, {
    key: "onRecognitionNoMatch",
    value: function onRecognitionNoMatch() {
      console.log("I didn't recognize the command.");
    }
  }, {
    key: "onRecognitionResult",
    value: function onRecognitionResult(event) {
      console.log("onRecognitionResult");
      var command = event.results[0][0].transcript;
      console.log("Result received: ".concat(command, "."));
      console.log("Confidence: ".concat(event.results[0][0].confidence));
      this.onCommand(command);
    }
  }, {
    key: "onRecognitionSpeechEnd",
    value: function onRecognitionSpeechEnd() {
      console.log("onRecognitionSpeechEnd");
      this.recognition.stop();
      this.recognition.started = false;
    }
  }, {
    key: "scanDocument",
    value: function scanDocument() {
      var _this2 = this;
      this.commands = [];
      document.querySelectorAll("[".concat(this.scanAttributeName, "]")).forEach(function (c) {
        c.classList.add(_this2.className);
        var value = c.getAttribute(_this2.scanAttributeName);
        if (value) {
          _this2.commands.push(value);
        }
      });
    }
  }, {
    key: "removeSelection",
    value: function removeSelection() {
      var _this3 = this;
      this.currentSelected = null;
      document.querySelectorAll(".".concat(this.className, ".").concat(this.selectedClassName)).forEach(function (el) {
        return el.classList.remove(_this3.selectedClassName);
      });
    }
  }, {
    key: "onCommand",
    value: function onCommand(commandName) {
      if (commandName) {
        switch (commandName.toLowerCase()) {
          case this.systemCommands[1]:
            //esci 
            this.removeSelection();
            break;
          case this.systemCommands[0]:
            //clicca
            this.currentSelected && this.currentSelected.click && this.currentSelected.click();
            break;
          default:
            if (this.currentSelected) {
              if (this.currentSelected instanceof HTMLInputElement && this.currentSelected.value != undefined) {
                this.currentSelected.value = commandName;
                return;
              } else if (this.currentSelected instanceof HTMLTextAreaElement && this.currentSelected.innerText != undefined) {
                this.currentSelected.innerText = commandName;
                return;
              }
            }

            // console.log("find: " + commandName)
            this.currentSelected = this.find([commandName], this.currentSelected && this.currentSelected.hasChildNodes() ? this.currentSelected : document);
        }
      }
    }
  }, {
    key: "find",
    value: function find(values, parentElement) {
      var querySelector = this.getQuerySelector(values);

      // console.log(querySelector)

      var element = parentElement.querySelectorAll(querySelector);
      if (element && element.length > 0) {
        this.removeSelection();
        var el = element[0];
        el.classList.add(this.selectedClassName);
        if (el instanceof HTMLButtonElement) {
          el.focus();
        } else {
          el.click();
        }
        return el;
      } else if (parentElement != document) {
        return this.find(values, document);
      }
      return null;
    }
  }, {
    key: "getQuerySelector",
    value: function getQuerySelector(values) {
      var _this4 = this;
      if (values instanceof Array) {
        var selectors = values.map(function (v) {
          return "[".concat(_this4.scanAttributeName, "=").concat(v, "]");
        });
        return selectors.join(",");
      }
      return "[".concat(this.scanAttributeName, "=").concat(values, "]");
    }
  }]);
  return WebTalkLib;
}();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebTalkLib: () => (/* reexport safe */ _webtalklib__WEBPACK_IMPORTED_MODULE_0__.WebTalkLib)
/* harmony export */ });
/* harmony import */ var _webtalklib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webtalklib */ "./src/webtalklib.ts");

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBQSxFQUVELFNBQUFxRSxpQkFBaUJILE1BQThCLEVBQVU7TUFBQSxJQUFBUSxNQUFBO01BRXZELElBQUlSLE1BQU0sWUFBWXhFLEtBQUssRUFBRTtRQUMzQixJQUFJaUYsU0FBUyxHQUFHVCxNQUFNLENBQUNVLEdBQUcsQ0FBQyxVQUFBQyxDQUFDO1VBQUEsV0FBQS9ELE1BQUEsQ0FBUTRELE1BQUksQ0FBQ3BGLGlCQUFpQixPQUFBd0IsTUFBQSxDQUFJK0QsQ0FBQztRQUFBLENBQUcsQ0FBQztRQUNuRSxPQUFPRixTQUFTLENBQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDO01BQzVCO01BRUEsV0FBQUYsTUFBQSxDQUFXLElBQUksQ0FBQ3hCLGlCQUFpQixPQUFBd0IsTUFBQSxDQUFJb0QsTUFBTTtJQUM3QztFQUFDO0VBQUEsT0FBQTlFLFVBQUE7QUFBQTs7Ozs7O1VDM0xIO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi8uL3NyYy93ZWJ0YWxrbGliLnRzIiwid2VicGFjazovL3dlYnRhbGtsaWIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnRhbGtsaWIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJ0YWxrbGliLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwid2VidGFsa2xpYlwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3ZWJ0YWxrbGliXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndlYnRhbGtsaWJcIl0gPSBmYWN0b3J5KCk7XG59KSgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpLCAoKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IGNsYXNzIFdlYlRhbGtMaWIge1xyXG5cclxuICBwcml2YXRlIHNjYW5BdHRyaWJ1dGVOYW1lOiBzdHJpbmcgPSAnYXJpYS1sYWJlbCdcclxuICBwcml2YXRlIGNsYXNzTmFtZTogc3RyaW5nID0gJ3dlYnRhbGtsaWInXHJcbiAgcHJpdmF0ZSBzZWxlY3RlZENsYXNzTmFtZTogc3RyaW5nID0gJ3dlYnRhbGtsaWJfc2VsZWN0ZWQnXHJcbiAgcHJpdmF0ZSBjdXJyZW50U2VsZWN0ZWQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGxcclxuICBwcml2YXRlIHN0YXJ0RWxlbWVudElkOiBzdHJpbmcgfCBudWxsID0gbnVsbFxyXG4gIHByaXZhdGUgc3RhcnRFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsXHJcbiAgcHJpdmF0ZSBjb21tYW5kczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KClcclxuICBwcml2YXRlIHN5c3RlbUNvbW1hbmRzOiBBcnJheTxzdHJpbmc+ID0gWydjbGljY2EnLCAnZXNjaSddXHJcbiAgcHJpdmF0ZSBsYW5ndWFnZSA9IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2VcclxuXHJcbiAgcHJpdmF0ZSByZWNvZ25pdGlvbjogYW55XHJcbiAgcHJpdmF0ZSBncmFtbWFyOiBhbnlcclxuXHJcbiAgY29uc3RydWN0b3Ioc3RhcnRFbGVtZW50SWQ/OiBzdHJpbmcgfCBudWxsLCBzY2FuQXR0cmlidXRlTmFtZT86IHN0cmluZywgbGFuZ3VhZ2U/OiBzdHJpbmcpIHtcclxuXHJcbiAgICB0aGlzLnN0YXJ0RWxlbWVudElkID0gc3RhcnRFbGVtZW50SWQgfHwgdGhpcy5zdGFydEVsZW1lbnRJZFxyXG4gICAgdGhpcy5zY2FuQXR0cmlidXRlTmFtZSA9IHNjYW5BdHRyaWJ1dGVOYW1lIHx8IHRoaXMuc2NhbkF0dHJpYnV0ZU5hbWVcclxuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuc3RhcnRFbGVtZW50ID0gdGhpcy5zdGFydEVsZW1lbnRJZCA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuc3RhcnRFbGVtZW50SWQpIHx8IGRvY3VtZW50LmJvZHkgOiBkb2N1bWVudC5ib2R5XHJcbiAgICB0aGlzLnNjYW5Eb2N1bWVudCgpXHJcblxyXG4gICAgLy8gZG9jdW1lbnRhdGlvbiBvZiBzcGVlY2ggcmVjb2duaXRpb24gaW4gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TcGVlY2hfQVBJL1VzaW5nX3RoZV9XZWJfU3BlZWNoX0FQSVxyXG4gICAgY29uc3QgU3BlZWNoUmVjb2duaXRpb24gPSAoPGFueT53aW5kb3cpLlNwZWVjaFJlY29nbml0aW9uIHx8ICg8YW55PndpbmRvdykud2Via2l0U3BlZWNoUmVjb2duaXRpb247XHJcbiAgICBjb25zdCBTcGVlY2hHcmFtbWFyTGlzdCA9ICg8YW55PndpbmRvdykuU3BlZWNoR3JhbW1hckxpc3QgfHwgKDxhbnk+d2luZG93KS53ZWJraXRTcGVlY2hHcmFtbWFyTGlzdDtcclxuXHJcbiAgICB0aGlzLnJlY29nbml0aW9uID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKCk7XHJcbiAgICB0aGlzLmdyYW1tYXIgPSBuZXcgU3BlZWNoR3JhbW1hckxpc3QoKTtcclxuXHJcbiAgICBjb25zdCBzeXN0ZW1Db21tYW5kc0dyYW1tYXIgPSBgI0pTR0YgVjEuMDsgZ3JhbW1hciBzeXNjb21tYW5kczsgcHVibGljIDxzeXNjb21tYW5kPiA9ICR7dGhpcy5zeXN0ZW1Db21tYW5kcy5qb2luKFxyXG4gICAgICBcIiB8IFwiLFxyXG4gICAgKX07YFxyXG5cclxuICAgIGNvbnN0IGNvbW1hbmRzR3JhbW1hciA9IGAjSlNHRiBWMS4wOyBncmFtbWFyIGNvbW1hbmRzOyBwdWJsaWMgPGNvbW1hbmQ+ID0gJHt0aGlzLmNvbW1hbmRzLmpvaW4oXHJcbiAgICAgIFwiIHwgXCIsXHJcbiAgICApfTtgXHJcblxyXG4gICAgdGhpcy5ncmFtbWFyLmFkZEZyb21TdHJpbmcoc3lzdGVtQ29tbWFuZHNHcmFtbWFyKVxyXG4gICAgdGhpcy5ncmFtbWFyLmFkZEZyb21TdHJpbmcoY29tbWFuZHNHcmFtbWFyKVxyXG5cclxuICAgIHRoaXMucmVjb2duaXRpb24uZ3JhbW1hcnMgPSB0aGlzLmdyYW1tYXI7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcclxuICAgIHRoaXMucmVjb2duaXRpb24ubGFuZyA9IHRoaXMubGFuZ3VhZ2U7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uLmludGVyaW1SZXN1bHRzID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uLm1heEFsdGVybmF0aXZlcyA9IDE7XHJcblxyXG4gICAgdGhpcy5zdGFydEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnN0YXJ0UmVjb2duaXRpb24oKSlcclxuXHJcbiAgICB0aGlzLnJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3VsdCcsIChlOiBhbnkpID0+IHRoaXMub25SZWNvZ25pdGlvblJlc3VsdChlKSlcclxuXHJcblxyXG4gICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKCdzcGVlY2hlbmQnLCAoKSA9PiB0aGlzLm9uUmVjb2duaXRpb25TcGVlY2hFbmQoKSk7XHJcblxyXG4gICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKCdub21hdGNoJywgKCkgPT4gdGhpcy5vblJlY29nbml0aW9uTm9NYXRjaCgpKTtcclxuXHJcbiAgfVxyXG5cclxuICBzdGFydFJlY29nbml0aW9uKCk6IHZvaWQge1xyXG5cclxuICAgIGlmICh0aGlzLnJlY29nbml0aW9uICYmICF0aGlzLnJlY29nbml0aW9uLnN0YXJ0ZWQpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRSZWNvZ25pdGlvblwiKTtcclxuICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydCgpO1xyXG4gICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0ZWQgPSB0cnVlXHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG9uUmVjb2duaXRpb25Ob01hdGNoKCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJJIGRpZG4ndCByZWNvZ25pemUgdGhlIGNvbW1hbmQuXCIpO1xyXG5cclxuICB9XHJcblxyXG4gIG9uUmVjb2duaXRpb25SZXN1bHQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJvblJlY29nbml0aW9uUmVzdWx0XCIpO1xyXG4gICAgY29uc3QgY29tbWFuZDogc3RyaW5nID0gZXZlbnQucmVzdWx0c1swXVswXS50cmFuc2NyaXB0O1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBSZXN1bHQgcmVjZWl2ZWQ6ICR7Y29tbWFuZH0uYCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYENvbmZpZGVuY2U6ICR7ZXZlbnQucmVzdWx0c1swXVswXS5jb25maWRlbmNlfWApO1xyXG4gICAgdGhpcy5vbkNvbW1hbmQoY29tbWFuZClcclxuICB9XHJcblxyXG4gIG9uUmVjb2duaXRpb25TcGVlY2hFbmQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uUmVjb2duaXRpb25TcGVlY2hFbmRcIik7XHJcbiAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcclxuICAgIHRoaXMucmVjb2duaXRpb24uc3RhcnRlZCA9IGZhbHNlXHJcblxyXG5cclxuICB9XHJcblxyXG4gIHNjYW5Eb2N1bWVudCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmNvbW1hbmRzID0gW11cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske3RoaXMuc2NhbkF0dHJpYnV0ZU5hbWV9XWApLmZvckVhY2goYyA9PiB7XHJcbiAgICAgIGMuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZSlcclxuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgfCBudWxsID0gYy5nZXRBdHRyaWJ1dGUodGhpcy5zY2FuQXR0cmlidXRlTmFtZSlcclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHZhbHVlKVxyXG4gICAgICB9XHJcblxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlbW92ZVNlbGVjdGlvbigpIHtcclxuICAgIHRoaXMuY3VycmVudFNlbGVjdGVkID0gbnVsbFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jbGFzc05hbWV9LiR7dGhpcy5zZWxlY3RlZENsYXNzTmFtZX1gKS5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZWxlY3RlZENsYXNzTmFtZSkpXHJcbiAgfVxyXG5cclxuICBvbkNvbW1hbmQoY29tbWFuZE5hbWU6IHN0cmluZykge1xyXG5cclxuICAgIGlmIChjb21tYW5kTmFtZSkge1xyXG5cclxuICAgICAgc3dpdGNoIChjb21tYW5kTmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSB0aGlzLnN5c3RlbUNvbW1hbmRzWzFdOiAgLy9lc2NpIFxyXG4gICAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24oKVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLnN5c3RlbUNvbW1hbmRzWzBdOiAvL2NsaWNjYVxyXG4gICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWQgJiYgdGhpcy5jdXJyZW50U2VsZWN0ZWQuY2xpY2sgJiYgdGhpcy5jdXJyZW50U2VsZWN0ZWQuY2xpY2soKVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNlbGVjdGVkKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2VsZWN0ZWQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIHRoaXMuY3VycmVudFNlbGVjdGVkLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkLnZhbHVlID0gY29tbWFuZE5hbWVcclxuICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRTZWxlY3RlZCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgJiYgdGhpcy5jdXJyZW50U2VsZWN0ZWQuaW5uZXJUZXh0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkLmlubmVyVGV4dCA9IGNvbW1hbmROYW1lXHJcbiAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJmaW5kOiBcIiArIGNvbW1hbmROYW1lKVxyXG4gICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWQgPSB0aGlzLmZpbmQoW2NvbW1hbmROYW1lXSwgKHRoaXMuY3VycmVudFNlbGVjdGVkICYmIHRoaXMuY3VycmVudFNlbGVjdGVkLmhhc0NoaWxkTm9kZXMoKSkgPyB0aGlzLmN1cnJlbnRTZWxlY3RlZCA6IGRvY3VtZW50KVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmluZCh2YWx1ZXM6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG5cclxuICAgIHZhciBxdWVyeVNlbGVjdG9yID0gdGhpcy5nZXRRdWVyeVNlbGVjdG9yKHZhbHVlcylcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhxdWVyeVNlbGVjdG9yKVxyXG5cclxuICAgIGxldCBlbGVtZW50OiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeVNlbGVjdG9yKVxyXG5cclxuICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgdGhpcy5yZW1vdmVTZWxlY3Rpb24oKVxyXG5cclxuICAgICAgbGV0IGVsID0gZWxlbWVudFswXVxyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKHRoaXMuc2VsZWN0ZWRDbGFzc05hbWUpXHJcblxyXG4gICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGVsLmZvY3VzKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5jbGljaygpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBlbFxyXG5cclxuICAgIH0gZWxzZSBpZiAocGFyZW50RWxlbWVudCAhPSBkb2N1bWVudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5maW5kKHZhbHVlcywgZG9jdW1lbnQpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbFxyXG4gIH1cclxuXHJcbiAgZ2V0UXVlcnlTZWxlY3Rvcih2YWx1ZXM6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xyXG5cclxuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICB2YXIgc2VsZWN0b3JzID0gdmFsdWVzLm1hcCh2ID0+IGBbJHt0aGlzLnNjYW5BdHRyaWJ1dGVOYW1lfT0ke3Z9XWApXHJcbiAgICAgIHJldHVybiBzZWxlY3RvcnMuam9pbihcIixcIilcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYFske3RoaXMuc2NhbkF0dHJpYnV0ZU5hbWV9PSR7dmFsdWVzfV1gXHJcbiAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgeyBXZWJUYWxrTGliIH0gZnJvbSAnLi93ZWJ0YWxrbGliJyJdLCJuYW1lcyI6WyJXZWJUYWxrTGliIiwic3RhcnRFbGVtZW50SWQiLCJzY2FuQXR0cmlidXRlTmFtZSIsImxhbmd1YWdlIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiQXJyYXkiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJjb25maWd1cmUiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsIl90aGlzIiwic3RhcnRFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImJvZHkiLCJzY2FuRG9jdW1lbnQiLCJTcGVlY2hSZWNvZ25pdGlvbiIsIndlYmtpdFNwZWVjaFJlY29nbml0aW9uIiwiU3BlZWNoR3JhbW1hckxpc3QiLCJ3ZWJraXRTcGVlY2hHcmFtbWFyTGlzdCIsInJlY29nbml0aW9uIiwiZ3JhbW1hciIsInN5c3RlbUNvbW1hbmRzR3JhbW1hciIsImNvbmNhdCIsInN5c3RlbUNvbW1hbmRzIiwiam9pbiIsImNvbW1hbmRzR3JhbW1hciIsImNvbW1hbmRzIiwiYWRkRnJvbVN0cmluZyIsImdyYW1tYXJzIiwiY29udGludW91cyIsImxhbmciLCJpbnRlcmltUmVzdWx0cyIsIm1heEFsdGVybmF0aXZlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydFJlY29nbml0aW9uIiwiZSIsIm9uUmVjb2duaXRpb25SZXN1bHQiLCJvblJlY29nbml0aW9uU3BlZWNoRW5kIiwib25SZWNvZ25pdGlvbk5vTWF0Y2giLCJzdGFydGVkIiwiY29uc29sZSIsImxvZyIsInN0YXJ0IiwiZXZlbnQiLCJjb21tYW5kIiwicmVzdWx0cyIsInRyYW5zY3JpcHQiLCJjb25maWRlbmNlIiwib25Db21tYW5kIiwic3RvcCIsIl90aGlzMiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZSIsImdldEF0dHJpYnV0ZSIsInB1c2giLCJyZW1vdmVTZWxlY3Rpb24iLCJfdGhpczMiLCJjdXJyZW50U2VsZWN0ZWQiLCJzZWxlY3RlZENsYXNzTmFtZSIsImVsIiwicmVtb3ZlIiwiY29tbWFuZE5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNsaWNrIiwiSFRNTElucHV0RWxlbWVudCIsInVuZGVmaW5lZCIsIkhUTUxUZXh0QXJlYUVsZW1lbnQiLCJpbm5lclRleHQiLCJmaW5kIiwiaGFzQ2hpbGROb2RlcyIsInZhbHVlcyIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0UXVlcnlTZWxlY3RvciIsImVsZW1lbnQiLCJsZW5ndGgiLCJIVE1MQnV0dG9uRWxlbWVudCIsImZvY3VzIiwiX3RoaXM0Iiwic2VsZWN0b3JzIiwibWFwIiwidiJdLCJzb3VyY2VSb290IjoiIn0=