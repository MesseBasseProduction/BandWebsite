/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bw.js":
/*!*******************!*\
  !*** ./src/bw.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bw_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bw.scss */ \"./src/bw.scss\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\nvar BW = /*#__PURE__*/function () {\n  function BW() {\n    _classCallCheck(this, BW);\n\n    this._lang = navigator.language === 'fr' ? 'fr' : 'en';\n    this._nls = null;\n    this._version = '0.0.1';\n\n    this._fetchLang().then(this._init.bind(this));\n  }\n\n  _createClass(BW, [{\n    key: \"_fetchLang\",\n    value: function _fetchLang() {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"/assets/json/\".concat(_this._lang, \".json\")).then(function (data) {\n          data.json().then(function (nlsKeys) {\n            _this._nls = nlsKeys;\n            resolve();\n          })[\"catch\"](reject);\n        })[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      if (document.body.dataset.type === 'index') {\n        this._buildIndexPage();\n      } else if (document.body.dataset.type === 'listen') {\n        this._buildListenPage();\n      } else if (document.body.dataset.type === 'tree') {\n        this._buildTreePage();\n      }\n    }\n  }, {\n    key: \"_buildIndexPage\",\n    value: function _buildIndexPage() {\n      document.querySelector('#band-name').innerHTML = this._nls.band.name;\n      document.querySelector('#band-desc').innerHTML = this._nls.band.desc;\n      document.querySelector('#listen-link').innerHTML = this._nls.listenLink;\n      document.querySelector('#tree-link').innerHTML = this._nls.treeLink;\n    }\n  }, {\n    key: \"_buildListenPage\",\n    value: function _buildListenPage() {}\n  }, {\n    key: \"_buildTreePage\",\n    value: function _buildTreePage() {\n      // Iterate over link to create link content\n      for (var i = 0; i < this._nls.band.links.length; ++i) {\n        document.querySelector('#link-wrapper').innerHTML += \"\\n\\t\\t\\t\\t<a href=\\\"\".concat(this._nls.band.links[i].url, \"\\\" class=\\\"link\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\n\\t\\t\\t\\t\\t<img src=\\\"/assets/img/logo/\").concat(this._nls.band.links[i].type, \".svg\\\" alt=\\\"\").concat(this._nls.band.links[i].type, \"-logo\\\">\\n\\t\\t\\t\\t\\t<p>\").concat(this._nls.band.links[i].name, \"</p>\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\");\n      }\n    }\n  }]);\n\n  return BW;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BW);\n\n//# sourceURL=webpack://BW/./src/bw.js?");

/***/ }),

/***/ "./src/bw.scss":
/*!*********************!*\
  !*** ./src/bw.scss ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://BW/./src/bw.scss?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/bw.js");
/******/ 	window.BW = __webpack_exports__["default"];
/******/ 	
/******/ })()
;