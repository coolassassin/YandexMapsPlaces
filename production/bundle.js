/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "body {\r\n    background: #fff;\r\n\theight: 100%;\r\n\tmargin: 0px;\r\n\tfont-family: \"Open Sans\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\r\n}\r\n\r\ndiv#map {\r\n\theight: 100% !important;\r\n\tbottom: 0px;\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n}\r\n\r\n#destroyButton {\r\n\tposition: fixed;\r\n\tleft: 10px;\r\n\tbottom: 40px;\r\n}\r\n\r\n#loadButton {\r\n\tposition: fixed;\r\n\tleft: 10px;\r\n\ttop: 10px;\r\n}\r\n\r\n#fill_info_form {\r\n\tz-index: 10;\r\n\tposition: fixed;\r\n\twidth: 500px;\r\n}\r\n\r\n#fill_info_form .header {\r\n\tcursor: move;\r\n}\r\n\r\n.form-group-margin {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.message_box {\r\n\theight: 100px;\r\n\toverflow: auto;\r\n}\r\n\r\n.message_box:empty::after {\r\n\tcontent: \"\\41E\\442\\437\\44B\\432\\44B   \\43E\\442\\441\\443\\442\\441\\442\\432\\443\\44E\\442\";\r\n\tfont-style: italic;\r\n}\r\n\r\ntextarea {\r\n\twidth: 100%;\r\n\tmin-width: 100%;\r\n}\r\n\r\n#fill_info_form .header .title {\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\ttext-overflow: ellipsis;\r\n\tdisplay: inline-block;\r\n\tmax-width: calc(100% - 25px);\r\n\tfont-size: 13px;\r\n\theight: 17px;\r\n\tmargin-bottom: -2px;\r\n}\r\n\r\n.place-description {\r\n\tfont-style: italic;\r\n}\r\n\r\n.ballon_body {\r\n\theight:100px;\r\n}", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	;
	(function(){
		"use strict";
		console.log('Инициализация приложения');
		
		var myMap,
			mapClusterer;
		ymaps.ready(init);

		function init () { // init yandex map function
			console.log('Загрузилась карта');
			
			// function decalration
			function loadMap() {
				var YaPromise = new Promise (function(resolve,reject){
					navigator.geolocation.getCurrentPosition(function(e){
						resolve(e);
					});
				});
				
				YaPromise.then(function(output){
					var coords = output.coords; // Geting coordinates
					
					// Map initializing
					myMap = new ymaps.Map('map', {
						center:[coords.latitude, coords.longitude],
						zoom:15,
						behaviors:['default', 'scrollZoom']
					});
					
					destroyBut.classList.remove('hide');
					
					console.log('Ваши координаты: %f, %f', coords.latitude, coords.longitude);
				}).then(function(e){
					var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
						// Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
						'<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
						'<div class="ballon_body place-description">{{ properties.balloonContentBody|raw }}</div>' +
						'<div class=ballon_footer><span class="pull-right">{{ properties.balloonContentFooter|raw }}</span></div>'
					);
					
					mapClusterer = new ymaps.Clusterer({ // Claster init
						clusterDisableClickZoom: true,
						clusterOpenBalloonOnClick: true,
						clusterBalloonContentLayout: 'cluster#balloonCarousel',
						clusterBalloonItemContentLayout: customItemContentLayout,
						clusterBalloonPanelMaxMapArea: 0,
						clusterBalloonContentLayoutWidth: 400,
						clusterBalloonContentLayoutHeight: 200,
						clusterBalloonPagerSize: 5
					});
					
					myMap.geoObjects.add(mapClusterer); // Add claster to map
					
					// Set events
					myMap.events.add('click', function (e) {
						var coords = e.get('coords'),		// get Click-map coordinates
							modalPosition = e.get('clientPixels');  // get click-screen coordinates
						ymaps.geocode(coords, { // Get Adress Row
							results: 1
						}).then(function(res){
							var address = null;
							if (res.geoObjects.get(0)){ // Open window if address founded
								address = res.geoObjects.get(0).properties.get('text');
								editFormTitle.innerHTML = address;
								editForm.classList.remove('hide');
								setElementPosition(editForm,modalPosition[0],modalPosition[1]);
								currentPosition = {pos: coords, address: address};
							}
						});
						
					});
				}).catch(function(e){
					console.error(e);
				});
			}
			
			function setElementPosition (element,x,y) { // Set element position (@element - DOM object, @(x,y) - page coordinates)
				if (x + element.offsetWidth <= window.innerWidth && x > 0) {
					element.style.left = x + 'px';
				} else {
					if (x <= 0) {
						element.style.left = 0 + 'px';
					} else {
						element.style.left = window.innerWidth - element.offsetWidth + 'px';
					}
				}
				if (y + element.offsetHeight <= window.innerHeight && y > 0) {
					element.style.top = y + 'px';
				} else {
					if (y <= 0) {
						element.style.top = 0 + 'px';
					} else {
						element.style.top = window.innerHeight - element.offsetHeight + 'px';
					}
				}
			}
			
			function setNewMark () {
				var pasteIndex = null,
					formInputs = Array.from(document.querySelectorAll('#fill_info_form .input_form .form-control')),
					formValues = formInputs.map(t => t.value);
				if (markArray.length) {
					pasteIndex = markArray.findIndex(t => t.address == currentPosition.address);
				}
				if (pasteIndex == null || pasteIndex == -1) {
					markArray.push({
						address:currentPosition.address
					});
					pasteIndex = markArray.length - 1;
				}
				if (!markArray[pasteIndex].marks) {
					markArray[pasteIndex].marks = [];
				}
				
				var newMark = {
					coords: {'x': currentPosition.pos[0], 'y' : currentPosition.pos[1]},
					address: currentPosition.address,
					name: formValues[0],
					place: formValues[1],
					text: formValues[2],
					date: getCurrentTime()
				};
				
				sendMark(newMark,function(e){
					var result = JSON.parse(e);
					if (result.error) {
						console.error(result.error.message);
						return false;
					}
					markArray[pasteIndex].marks.push(newMark);
					
					var myPlacemark = new ymaps.Placemark(currentPosition.pos, { // create new mark
						iconContent: '1',
						balloonContentHeader: newMark.name,
						balloonContentBody: '<div><a href="javascript:void(0);" class="address_link" data-index="'+ pasteIndex +'">' + newMark.address + '</a></div><div>' + newMark.text + '</div>',
						balloonContentFooter: newMark.date,
						hintContent: 'Стандартный значок метки'
					}, 
					{
						preset: 'twirl#violetIcon'
					});
					
					mapClusterer.add(myPlacemark); // Fill claster
					
					renderPlaceList(currentPosition.address);
				});
				
				formInputs.forEach(t => t.value = '');
			}
			
			function openFormByIndex (index,pos) {
				var currentAddress = markArray[index];
				console.log(index,currentAddress);
				currentPosition = {pos: [currentAddress.marks[0].coords.x,currentAddress.marks[0].coords.y], address: currentAddress.address};
				editFormTitle.innerHTML = currentPosition.address;
				editForm.classList.remove('hide');
				setElementPosition(editForm,pos[0] || 0,pos[1] || 0);
			}
			
			function getCurrentTime () {
				function doubleNumber (num) {
					return num < 10 ? '0' + num : num;
				}
				var now = new Date();
				return  now.getFullYear() + '.' + 
						doubleNumber(now.getMonth()) + '.' + 
						doubleNumber(now.getDate()) + ' ' + 
						doubleNumber(now.getHours()) + ':' +
						doubleNumber(now.getMinutes()) + ':' +
						doubleNumber(now.getSeconds());
			}
			
			function sendMark (obj, callback) {
				var xhr = new XMLHttpRequest();

				var json = JSON.stringify({"op" : "add","review" : obj});

				xhr.open("POST", "http://localhost:3000/");

				xhr.onreadystatechange = function(e){
					if (xhr.readyState == 4) {
						if (typeof callback == 'function') {
							callback(xhr.responseText);
						}
					}
				};

				xhr.send(json);
			}
			
			function renderPlaceList (address) {
				var findIndex = null;
				if (markArray.length) {
					findIndex = markArray.findIndex(t => t.address == currentPosition.address);
				}
				if (findIndex != null && findIndex != -1) {
					messageBox.innerHTML = markArray[findIndex].marks.map( t => renderListObject (t) ).join('');
				}
			}
			
			function renderListObject (obj) {
				return '<div class="form-group-margin">'+
						'<div><strong>'+ obj.name + '</strong> ' + obj.place + ' <span class="pull-right">' + obj.date + '</span></div><div class="place-description">' + obj.text + '</div>';
			}
			
			// variables
			var destroyBut = document.getElementById('destroyButton'), // Base buttons
				loadBut = document.getElementById('loadButton'),
				closeFormBut = document.querySelector('#fill_info_form .header .close'), // Form buttons
				addNewMarkBut = document.getElementById('save_form_info'),
				editForm = document.getElementById('fill_info_form'), // Form objects
				editFormTitle = document.querySelector('#fill_info_form .header .title'),
				messageBox = document.querySelector('#fill_info_form .message_box'),
				markArray = [], // Init empty mark array
				currentPosition = null, // values to paste mark
				drag = 0, // drag values
				dragHeader = null,
				lastPosition = {
					x : 0, 
					y : 0
				};
			
			// events declaration
			destroyBut.addEventListener('click',function () { // destroy map by click
				myMap.destroy();
				this.classList.add('hide');
				loadBut.classList.remove('hide');
			});
			
			loadBut.addEventListener('click',function () { // load map by click
				loadMap();
				this.classList.add('hide');
				destroyBut.classList.remove('hide');
			});
			
			closeFormBut.addEventListener('click',function () { // close edit form
				editForm.classList.add('hide');
			});
			
			addNewMarkBut.addEventListener('click',function () { // close edit form
				setNewMark();
			});
			
			document.addEventListener('mousemove',function(e){ // DragNDrop form event
				if (e.buttons == 1) {
					if (!dragHeader) {
						if (e.target.classList.contains('drag-header')) {
							dragHeader = e.target;
						} else if (e.target.closest('.drag-header')){
							dragHeader = e.target.closest('.drag-header');
						}
					}
					else {;
						if (drag) {
							setElementPosition(editForm,editForm.offsetLeft + (e.pageX - lastPosition.x),editForm.offsetTop + (e.pageY - lastPosition.y));
						} else {
							setElementPosition(editForm,editForm.offsetLeft,editForm.offsetTop);
							drag = 1;
						}
						lastPosition.x = e.pageX;
						lastPosition.y = e.pageY;
					}
				} else {
					drag = 0;
					dragHeader = null;
				}
			});
			
			document.addEventListener('click',function(e){
				if (e.target.classList.contains('address_link')){
					var baloon = e.target.closest('.ymaps-2-1-38-balloon-overlay');
					console.log(baloon);
					openFormByIndex(e.target.getAttribute('data-index'), [baloon.offsetLeft, baloon.offsetTop + baloon.offsetHeight + 10]);
				}
			});
			
			
			
			loadMap(); // on Load map init
		}
	})();

/***/ }
/******/ ]);