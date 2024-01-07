(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define("webtalklib", [], factory);
    else if (typeof exports === 'object')
        exports["webtalklib"] = factory();
    else
        root["webtalklib"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
    return /******/  __webpack_modules__ = ({

/***/ "./src/webtalklib.ts":
/*!***************************!*\
  !*** ./src/webtalklib.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebTalkLib: () => (/* binding */ WebTalkLib)
                    /* harmony export */
                });
                class WebTalkLib {
                    constructor(startElementId, scanAttributeName, language) {
                        this.scanAttributeName = 'aria-label';
                        this.className = 'webtalklib';
                        this.selectedClassName = 'webtalklib_selected';
                        this.currentSelected = null;
                        this.startElementId = null;
                        this.startElement = null;
                        this.commands = new Array();
                        this.systemCommands = ['clicca', 'esci'];
                        this.language = window.navigator.language;
                        this.startElementId = startElementId || this.startElementId;
                        this.scanAttributeName = scanAttributeName || this.scanAttributeName;
                        this.language = language || window.navigator.language;
                        this.configure();
                    }
                    configure() {
                        this.startElement = this.startElementId ? document.getElementById(this.startElementId) || document.body : document.body;
                        this.scanDocument();
                        // documentation of speech recognition in https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
                        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
                        this.recognition = new SpeechRecognition();
                        this.grammar = new SpeechGrammarList();
                        const systemCommandsGrammar = `#JSGF V1.0; grammar syscommands; public <syscommand> = ${this.systemCommands.join(" | ")};`;
                        const commandsGrammar = `#JSGF V1.0; grammar commands; public <command> = ${this.commands.join(" | ")};`;
                        this.grammar.speechRecognitionList.addFromString(systemCommandsGrammar);
                        this.grammar.speechRecognitionList.addFromString(commandsGrammar);
                        this.recognition.grammars = this.grammar;
                        this.recognition.continuous = false;
                        this.recognition.lang = this.language;
                        this.recognition.interimResults = false;
                        this.recognition.maxAlternatives = 1;
                        this.startElement.addEventListener('click', this.startRecognition);
                        this.recognition.addEventListener('result', this.onRecognitionResult);
                        this.recognition.addEventListener('speechend', this.onRecognitionSpeechEnd);
                        this.recognition.addEventListener('nomatch', this.onRecognitionNoMatch);
                    }
                    startRecognition() {
                        if (this.recognition && !this.recognition.started) {
                            this.recognition.start();
                            this.recognition.started = true;
                        }
                    }
                    onRecognitionNoMatch() {
                        console.log("I didn't recognize the command.");
                    }
                    onRecognitionResult(event) {
                        const command = event.results[0][0].transcript;
                        //console.log(`Result received: ${command}.`);
                        // console.log(`Confidence: ${event.results[0][0].confidence}`);
                        this.onCommand(command);
                    }
                    onRecognitionSpeechEnd() {
                        this.recognition.stop();
                        this.recognition.started = false;
                    }
                    scanDocument() {
                        this.commands = [];
                        document.querySelectorAll(`[${this.scanAttributeName}]`).forEach(c => {
                            c.classList.add(this.className);
                            let value = c.getAttribute(this.scanAttributeName);
                            if (value) {
                                this.commands.push(value);
                            }
                        });
                    }
                    removeSelection() {
                        this.currentSelected = null;
                        document.querySelectorAll(`.${this.className}.${this.selectedClassName}`).forEach(el => el.classList.remove(this.selectedClassName));
                    }
                    onCommand(commandName) {
                        if (commandName) {
                            switch (commandName.toLowerCase()) {
                                case this.systemCommands[1]: //esci 
                                    this.removeSelection();
                                    break;
                                case this.systemCommands[0]: //clicca
                                    this.currentSelected && this.currentSelected.click && this.currentSelected.click();
                                    break;
                                default:
                                    if (this.currentSelected) {
                                        if (this.currentSelected instanceof HTMLInputElement && this.currentSelected.value != undefined) {
                                            this.currentSelected.value = commandName;
                                            return;
                                        }
                                        else if (this.currentSelected instanceof HTMLTextAreaElement && this.currentSelected.innerText != undefined) {
                                            this.currentSelected.innerText = commandName;
                                            return;
                                        }
                                    }
                                    // console.log("find: " + commandName)
                                    this.currentSelected = this.find([commandName], (this.currentSelected && this.currentSelected.hasChildNodes()) ? this.currentSelected : document);
                            }
                        }
                    }
                    find(values, parentElement) {
                        var querySelector = this.getQuerySelector(values);
                        // console.log(querySelector)
                        let element = parentElement.querySelectorAll(querySelector);
                        if (element && element.length > 0) {
                            this.removeSelection();
                            let el = element[0];
                            el.classList.add(this.selectedClassName);
                            if (el instanceof HTMLButtonElement) {
                                el.focus();
                            }
                            else {
                                el.click();
                            }
                            return el;
                        }
                        else if (parentElement != document) {
                            return this.find(values, document);
                        }
                        return null;
                    }
                    getQuerySelector(values) {
                        if (values instanceof Array) {
                            var selectors = values.map(v => `[${this.scanAttributeName}=${v}]`);
                            return selectors.join(",");
                        }
                        return `[${this.scanAttributeName}=${values}]`;
                    }
                }


                /***/
            })

        /******/
    });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
            /******/
        }
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
            /******/
        };
/******/
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
        /******/
    }
/******/
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for (var key in definition) {
/******/ 			if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
/******/
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
        /******/
    })();
/******/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/
            }
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
            /******/
        };
        /******/
    })();
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
            /* harmony export */
        });
/* harmony import */ var _webtalklib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webtalklib */ "./src/webtalklib.ts");


    })();

/******/ return __webpack_exports__;
    ;
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VidGFsa2xpYl9wYWNrLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7QUNWTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQscUJBQXFCLHdCQUF3QixpQ0FBaUM7QUFDakksNkNBQTZDLGtCQUFrQixxQkFBcUIsMkJBQTJCO0FBQy9HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRCxzQ0FBc0MsK0JBQStCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsdUJBQXVCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGVBQWUsR0FBRyx1QkFBdUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsdUJBQXVCLEdBQUcsRUFBRTtBQUM1RTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QixHQUFHLE9BQU87QUFDcEQ7QUFDQTs7Ozs7OztTQzVIQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTjBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi8uL3NyYy93ZWJ0YWxrbGliLnRzIiwid2VicGFjazovL3dlYnRhbGtsaWIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VidGFsa2xpYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnRhbGtsaWIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJ0YWxrbGliLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwid2VidGFsa2xpYlwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ3ZWJ0YWxrbGliXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIndlYnRhbGtsaWJcIl0gPSBmYWN0b3J5KCk7XG59KSgodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpLCAoKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IGNsYXNzIFdlYlRhbGtMaWIge1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0RWxlbWVudElkLCBzY2FuQXR0cmlidXRlTmFtZSwgbGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy5zY2FuQXR0cmlidXRlTmFtZSA9ICdhcmlhLWxhYmVsJztcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSAnd2VidGFsa2xpYic7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDbGFzc05hbWUgPSAnd2VidGFsa2xpYl9zZWxlY3RlZCc7XG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGFydEVsZW1lbnRJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnRFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB0aGlzLnN5c3RlbUNvbW1hbmRzID0gWydjbGljY2EnLCAnZXNjaSddO1xuICAgICAgICB0aGlzLmxhbmd1YWdlID0gd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgdGhpcy5zdGFydEVsZW1lbnRJZCA9IHN0YXJ0RWxlbWVudElkIHx8IHRoaXMuc3RhcnRFbGVtZW50SWQ7XG4gICAgICAgIHRoaXMuc2NhbkF0dHJpYnV0ZU5hbWUgPSBzY2FuQXR0cmlidXRlTmFtZSB8fCB0aGlzLnNjYW5BdHRyaWJ1dGVOYW1lO1xuICAgICAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ3VhZ2UgfHwgd2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZTtcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICB9XG4gICAgY29uZmlndXJlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0RWxlbWVudCA9IHRoaXMuc3RhcnRFbGVtZW50SWQgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnN0YXJ0RWxlbWVudElkKSB8fCBkb2N1bWVudC5ib2R5IDogZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy5zY2FuRG9jdW1lbnQoKTtcbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBvZiBzcGVlY2ggcmVjb2duaXRpb24gaW4gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9TcGVlY2hfQVBJL1VzaW5nX3RoZV9XZWJfU3BlZWNoX0FQSVxuICAgICAgICBjb25zdCBTcGVlY2hSZWNvZ25pdGlvbiA9IHdpbmRvdy5TcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cud2Via2l0U3BlZWNoUmVjb2duaXRpb247XG4gICAgICAgIGNvbnN0IFNwZWVjaEdyYW1tYXJMaXN0ID0gd2luZG93LlNwZWVjaEdyYW1tYXJMaXN0IHx8IHdpbmRvdy53ZWJraXRTcGVlY2hHcmFtbWFyTGlzdDtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xuICAgICAgICB0aGlzLmdyYW1tYXIgPSBuZXcgU3BlZWNoR3JhbW1hckxpc3QoKTtcbiAgICAgICAgY29uc3Qgc3lzdGVtQ29tbWFuZHNHcmFtbWFyID0gYCNKU0dGIFYxLjA7IGdyYW1tYXIgc3lzY29tbWFuZHM7IHB1YmxpYyA8c3lzY29tbWFuZD4gPSAke3RoaXMuc3lzdGVtQ29tbWFuZHMuam9pbihcIiB8IFwiKX07YDtcbiAgICAgICAgY29uc3QgY29tbWFuZHNHcmFtbWFyID0gYCNKU0dGIFYxLjA7IGdyYW1tYXIgY29tbWFuZHM7IHB1YmxpYyA8Y29tbWFuZD4gPSAke3RoaXMuY29tbWFuZHMuam9pbihcIiB8IFwiKX07YDtcbiAgICAgICAgdGhpcy5ncmFtbWFyLnNwZWVjaFJlY29nbml0aW9uTGlzdC5hZGRGcm9tU3RyaW5nKHN5c3RlbUNvbW1hbmRzR3JhbW1hcik7XG4gICAgICAgIHRoaXMuZ3JhbW1hci5zcGVlY2hSZWNvZ25pdGlvbkxpc3QuYWRkRnJvbVN0cmluZyhjb21tYW5kc0dyYW1tYXIpO1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmdyYW1tYXJzID0gdGhpcy5ncmFtbWFyO1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5sYW5nID0gdGhpcy5sYW5ndWFnZTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5pbnRlcmltUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLm1heEFsdGVybmF0aXZlcyA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFydFJlY29nbml0aW9uKTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5hZGRFdmVudExpc3RlbmVyKCdyZXN1bHQnLCB0aGlzLm9uUmVjb2duaXRpb25SZXN1bHQpO1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ3NwZWVjaGVuZCcsIHRoaXMub25SZWNvZ25pdGlvblNwZWVjaEVuZCk7XG4gICAgICAgIHRoaXMucmVjb2duaXRpb24uYWRkRXZlbnRMaXN0ZW5lcignbm9tYXRjaCcsIHRoaXMub25SZWNvZ25pdGlvbk5vTWF0Y2gpO1xuICAgIH1cbiAgICBzdGFydFJlY29nbml0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvZ25pdGlvbiAmJiAhdGhpcy5yZWNvZ25pdGlvbi5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uUmVjb2duaXRpb25Ob01hdGNoKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkkgZGlkbid0IHJlY29nbml6ZSB0aGUgY29tbWFuZC5cIik7XG4gICAgfVxuICAgIG9uUmVjb2duaXRpb25SZXN1bHQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhgUmVzdWx0IHJlY2VpdmVkOiAke2NvbW1hbmR9LmApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29uZmlkZW5jZTogJHtldmVudC5yZXN1bHRzWzBdWzBdLmNvbmZpZGVuY2V9YCk7XG4gICAgICAgIHRoaXMub25Db21tYW5kKGNvbW1hbmQpO1xuICAgIH1cbiAgICBvblJlY29nbml0aW9uU3BlZWNoRW5kKCkge1xuICAgICAgICB0aGlzLnJlY29nbml0aW9uLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yZWNvZ25pdGlvbi5zdGFydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHNjYW5Eb2N1bWVudCgpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLnNjYW5BdHRyaWJ1dGVOYW1lfV1gKS5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgYy5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGMuZ2V0QXR0cmlidXRlKHRoaXMuc2NhbkF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLmNsYXNzTmFtZX0uJHt0aGlzLnNlbGVjdGVkQ2xhc3NOYW1lfWApLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNlbGVjdGVkQ2xhc3NOYW1lKSk7XG4gICAgfVxuICAgIG9uQ29tbWFuZChjb21tYW5kTmFtZSkge1xuICAgICAgICBpZiAoY29tbWFuZE5hbWUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoY29tbWFuZE5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5zeXN0ZW1Db21tYW5kc1sxXTogLy9lc2NpIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuc3lzdGVtQ29tbWFuZHNbMF06IC8vY2xpY2NhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkICYmIHRoaXMuY3VycmVudFNlbGVjdGVkLmNsaWNrICYmIHRoaXMuY3VycmVudFNlbGVjdGVkLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNlbGVjdGVkIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiB0aGlzLmN1cnJlbnRTZWxlY3RlZC52YWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZC52YWx1ZSA9IGNvbW1hbmROYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY3VycmVudFNlbGVjdGVkIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJiB0aGlzLmN1cnJlbnRTZWxlY3RlZC5pbm5lclRleHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWQuaW5uZXJUZXh0ID0gY29tbWFuZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZmluZDogXCIgKyBjb21tYW5kTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWQgPSB0aGlzLmZpbmQoW2NvbW1hbmROYW1lXSwgKHRoaXMuY3VycmVudFNlbGVjdGVkICYmIHRoaXMuY3VycmVudFNlbGVjdGVkLmhhc0NoaWxkTm9kZXMoKSkgPyB0aGlzLmN1cnJlbnRTZWxlY3RlZCA6IGRvY3VtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5kKHZhbHVlcywgcGFyZW50RWxlbWVudCkge1xuICAgICAgICB2YXIgcXVlcnlTZWxlY3RvciA9IHRoaXMuZ2V0UXVlcnlTZWxlY3Rvcih2YWx1ZXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhxdWVyeVNlbGVjdG9yKVxuICAgICAgICBsZXQgZWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeVNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbGV0IGVsID0gZWxlbWVudFswXTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQodGhpcy5zZWxlY3RlZENsYXNzTmFtZSk7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcmVudEVsZW1lbnQgIT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmQodmFsdWVzLCBkb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGdldFF1ZXJ5U2VsZWN0b3IodmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IHZhbHVlcy5tYXAodiA9PiBgWyR7dGhpcy5zY2FuQXR0cmlidXRlTmFtZX09JHt2fV1gKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcnMuam9pbihcIixcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBbJHt0aGlzLnNjYW5BdHRyaWJ1dGVOYW1lfT0ke3ZhbHVlc31dYDtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCB7IFdlYlRhbGtMaWIgfSBmcm9tICcuL3dlYnRhbGtsaWInO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9