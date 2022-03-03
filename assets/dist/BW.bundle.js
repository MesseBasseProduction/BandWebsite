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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bw_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bw.scss */ \"./src/bw.scss\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\nvar DEBUG = true;\n\nvar BW = /*#__PURE__*/function () {\n  function BW() {\n    var _this = this;\n\n    _classCallCheck(this, BW);\n\n    this._lang = navigator.language === 'fr' ? 'fr' : 'en';\n    this._nls = null;\n    this._version = '0.0.1';\n\n    if (DEBUG === true) {\n      console.log(\"BandWebsite v\".concat(this._version, \" : Begin website initialization\"));\n    }\n\n    this._fetchLang().then(this._init.bind(this))[\"catch\"](function (err) {\n      // Error are displayed even if DEBUG is set to false, to notify end user to contact support\n      console.error(\"BandWebsite v\".concat(_this._version, \" : Fatal error during initialization, please contact support :\\n\"), err);\n    })[\"finally\"](function () {\n      if (DEBUG === true) {\n        console.log(\"BandWebsite v\".concat(_this._version, \" : Website initialization done\"));\n      }\n    });\n  }\n\n  _createClass(BW, [{\n    key: \"_fetchLang\",\n    value: function _fetchLang() {\n      var _this2 = this;\n\n      if (DEBUG === true) {\n        console.log(\"1. Fetch language keys with \".concat(this._lang, \" locale\"));\n      }\n\n      return new Promise(function (resolve, reject) {\n        fetch(\"/assets/json/\".concat(_this2._lang, \".json\")).then(function (data) {\n          data.json().then(function (nlsKeys) {\n            if (DEBUG === true) {\n              console.log(\"2. Language keys successfully retrieven\");\n            }\n\n            _this2._nls = nlsKeys;\n            resolve();\n          })[\"catch\"](function (err) {\n            if (DEBUG === true) {\n              console.log(\"Err. Can't parse language keys, the JSON file may be is invalid\");\n            }\n\n            reject(err);\n          });\n        })[\"catch\"](function (err) {\n          if (DEBUG === true) {\n            console.log(\"Err. Couldn't retrieve language keys\");\n          }\n\n          reject(err);\n        });\n      });\n    }\n  }, {\n    key: \"_init\",\n    value: function _init() {\n      var _this3 = this;\n\n      if (DEBUG === true) {\n        console.log(\"3. Build HTML DOM depending on the page type\");\n      }\n\n      return new Promise(function (resolve, reject) {\n        if (document.body.dataset.type === 'index') {\n          _this3._buildIndexPage();\n        } else if (document.body.dataset.type === 'listen') {\n          _this3._buildListenPage();\n        } else if (document.body.dataset.type === 'tree') {\n          _this3._buildTreePage();\n        } else {\n          if (DEBUG === true) {\n            console.log(\"Err. Unknown page type to init the website with\");\n          }\n\n          reject(new Error('Invalid <body> type. Should be either index, listen or tree'));\n        }\n\n        resolve();\n      });\n    }\n  }, {\n    key: \"_buildIndexPage\",\n    value: function _buildIndexPage() {\n      if (DEBUG === true) {\n        console.log(\"4. Init website with the artist main page\");\n      }\n\n      document.querySelector('#band-name').innerHTML = this._nls.band.name;\n      document.querySelector('#band-desc').innerHTML = this._nls.band.desc;\n      document.querySelector('#listen-link').innerHTML = this._nls.listenLink;\n      document.querySelector('#tree-link').innerHTML = this._nls.treeLink;\n    }\n  }, {\n    key: \"_buildListenPage\",\n    value: function _buildListenPage() {\n      var _this4 = this;\n\n      if (DEBUG === true) {\n        console.log(\"4. Init website with the artist listen page\");\n      } // Update page nls\n\n\n      document.querySelector('#release-from').innerHTML = this._nls.from;\n      document.querySelector('#listen-online').innerHTML = this._nls.listenOnline;\n      document.querySelector('#see-more-links').innerHTML = this._nls.seeMore;\n      document.querySelector('#published-on').innerHTML = this._nls.publishedOn; // Internal useful variables\n\n      var progress = document.getElementById('current-progress');\n      var overlay = document.getElementById('modal-overlay');\n      var audio = new Audio();\n      var activeRelease = 0; // Define internal functions to update UI according to selected release\n\n      var updateRelease = function updateRelease() {\n        // Reset audio playback and playback UI\n        audio.pause();\n        audio.currentTime = 0;\n        progress.style.width = '0'; // Update active release\n\n        var release = _this4._nls.band.releases[activeRelease]; // Update blurred backgrounds\n\n        document.getElementById('release-background').style.backgroundImage = \"url('/assets/img/releases/\".concat(release.cover, \"')\");\n        document.getElementById('release-background-bottom').style.backgroundImage = \"url('/assets/img/releases/\".concat(release.cover, \"')\"); // Update release primitive information\n\n        document.getElementById('release-cover').src = \"/assets/img/releases/\".concat(release.cover);\n        document.getElementById('release-duration').innerHTML = release.duration;\n        document.getElementById('release-title').innerHTML = release.title;\n        document.getElementById('release-artist').innerHTML = release.artist;\n        document.getElementById('release-date').innerHTML = release.date;\n        document.getElementById('label-link').innerHTML = release.label;\n        document.getElementById('label-link').href = release.labelLink; // Update view links according to the selected release\n\n        for (var i = 0; i < release.links.length; ++i) {\n          if (release.links[i].url === '') {\n            // Link type has no url and should be disabled\n            document.getElementById(release.links[i].type).classList.add('disabled'); // Only disabled button\n          } else {\n            // Update link information\n            document.getElementById(release.links[i].type).classList.remove('disabled'); // Clear previous disabled class\n\n            document.getElementById(release.links[i].type).href = release.links[i].url; // Update url href link\n          }\n        } // Create tracks and append them to the concerned DOM\n\n\n        document.getElementById('release-tracklist').innerHTML = _this4._buildTrackCredits(release.tracks); // Update justify content if scroll exists\n\n        if (document.getElementById('release-tracklist').scrollHeight > document.getElementById('release-tracklist').clientHeight) {\n          document.getElementById('release-tracklist').style.justifyContent = 'space-between';\n        }\n\n        audio = new Audio(\"/assets/audio/\".concat(release.audio));\n        handlePlayback(audio);\n      }; // Handle the audio playback and events\n\n\n      var handlePlayback = function handlePlayback() {\n        var button = document.getElementById('play-pause');\n        button.src = '/assets/img/controls/play.svg';\n        var progressTrack = document.getElementById('progress-bar');\n        var progress = document.getElementById('current-progress');\n        var playing = false; // Handle click on play/pause button\n\n        button.addEventListener('click', function () {\n          if (playing === true) {\n            playing = false;\n            button.src = '/assets/img/controls/play.svg';\n            audio.pause();\n          } else {\n            playing = true;\n            button.src = '/assets/img/controls/pause.svg';\n            audio.play();\n          }\n        }); // Update progress on audio playing\n\n        audio.addEventListener('timeupdate', function () {\n          progress.style.width = \"\".concat(audio.currentTime / audio.duration * 100, \"%\");\n        }); // Reset progress and audio when playback reached the end of tracks\n\n        audio.addEventListener('ended', function () {\n          audio.currentTime = 0;\n          progress.style.width = '0';\n          button.src = '/assets/img/controls/play.svg';\n          playing = false;\n        }); // User manually seek a part of audio\n\n        progressTrack.addEventListener('click', function (event) {\n          if (playing === true) {\n            var box = progressTrack.getBoundingClientRect();\n            audio.currentTime = (event.clientX - box.left) / box.width * audio.duration;\n            progress.style.width = \"\".concat(audio.currentTime / audio.duration * 100, \"%\");\n          }\n        });\n      }; // Previous and next release event handling if more than one release\n\n\n      if (this._nls.band.releases.length === 1) {\n        document.getElementById('release-previous').style.display = 'none';\n        document.getElementById('release-next').style.display = 'none';\n      } else {\n        document.getElementById('release-previous').addEventListener('click', function (e) {\n          e.target.blur();\n          activeRelease = (_this4._nls.band.releases.length + activeRelease - 1) % _this4._nls.band.releases.length;\n          updateRelease(activeRelease);\n        });\n        document.getElementById('release-next').addEventListener('click', function (e) {\n          e.target.blur();\n          activeRelease = (activeRelease + 1) % _this4._nls.band.releases.length;\n          updateRelease(activeRelease);\n        });\n      } // Blur modal event\n\n\n      document.getElementById('modal-overlay').addEventListener('click', function () {\n        overlay.style.opacity = 0;\n        setTimeout(function () {\n          overlay.innerHTML = '';\n          overlay.style.display = 'none';\n        }, 400);\n      }); // Open modal event\n\n      document.getElementById('see-more-links').addEventListener('click', function () {\n        fetch('/assets/html/seemoremodal.html').then(function (data) {\n          overlay.style.display = 'flex';\n          data.text().then(function (htmlString) {\n            overlay.appendChild(document.createRange().createContextualFragment(htmlString));\n            var release = _this4._nls.band.releases[activeRelease];\n\n            for (var i = 0; i < release.moreLinks.length; ++i) {\n              if (release.moreLinks[i].url === '') {\n                // Link type has no url and should be disabled\n                document.getElementById(release.moreLinks[i].type).classList.add('disabled'); // Only disabled button\n              } else {\n                // Update link information\n                document.getElementById(release.moreLinks[i].type).classList.remove('disabled'); // Clear previous disabled class\n\n                document.getElementById(release.moreLinks[i].type).href = release.moreLinks[i].url; // Update url href link\n              }\n            }\n\n            requestAnimationFrame(function () {\n              return overlay.style.opacity = 1;\n            });\n          });\n        })[\"catch\"](function (e) {\n          return console.error(e);\n        });\n      }); // Update UI with first release available in array\n\n      updateRelease(activeRelease);\n    }\n  }, {\n    key: \"_buildTreePage\",\n    value: function _buildTreePage() {\n      if (DEBUG === true) {\n        console.log(\"4. Init website with the artist link tree\");\n      } // Iterate over link to create link content\n\n\n      for (var i = 0; i < this._nls.band.links.length; ++i) {\n        document.querySelector('#link-wrapper').innerHTML += \"\\n\\t\\t\\t\\t<a href=\\\"\".concat(this._nls.band.links[i].url, \"\\\" class=\\\"link\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">\\n\\t\\t\\t\\t\\t<img src=\\\"/assets/img/logo/\").concat(this._nls.band.links[i].type, \".svg\\\" alt=\\\"\").concat(this._nls.band.links[i].type, \"-logo\\\">\\n\\t\\t\\t\\t\\t<p>\").concat(this._nls.band.links[i].name, \"</p>\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\");\n      }\n    } // Utils for listen page\n\n  }, {\n    key: \"_buildTrackCredits\",\n    value: function _buildTrackCredits(tracks) {\n      var dom = '';\n\n      for (var i = 0; i < tracks.length; ++i) {\n        dom += \"<h3>\".concat(i + 1, \". \").concat(tracks[i].title, \" \\u2013 \").concat(tracks[i].duration, \"</h3><p>\");\n\n        if (tracks[i].composer !== '') {\n          // Add composer if any\n          dom += \"<i>\".concat(this._nls.composer, \"</i> : \").concat(tracks[i].composer, \"<br>\");\n        }\n\n        if (tracks[i].author !== '') {\n          // Add author if any\n          dom += \"<i>\".concat(this._nls.author, \"</i> : \").concat(tracks[i].author);\n        }\n\n        dom += \"</p>\";\n      }\n\n      return dom;\n    }\n  }]);\n\n  return BW;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BW);\n\n//# sourceURL=webpack://BW/./src/bw.js?");

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