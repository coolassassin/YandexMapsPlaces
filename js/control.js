;
(function(){
	"use strict";
	console.log('Инициализация приложения');
	
	var myMap,
		mapClusterer;
	ymaps.ready(init);

	function init () { // init yandex map function
		
		// function decalration
		function loadMap() {
			var YaPromise = new Promise (function(resolve,reject){
				navigator.geolocation.getCurrentPosition(function(e){
					resolve(e);
				});
			});
			
			YaPromise.then(function(output){
				return new Promise (function (resolve) {
					var coords = output.coords; // Geting coordinates
					
					// Map initializing
					myMap = new ymaps.Map('map', {
						center:[coords.latitude, coords.longitude],
						zoom:15,
						behaviors:['default', 'scrollZoom']
					});
					
					destroyBut.classList.remove('hide');
					resolve();
				});
			}).then(function (){ // Get all marksInfo
				return new Promise (function (resolve) {
					var xhr = new XMLHttpRequest(),
						json = JSON.stringify({op: "all"});

					xhr.open("POST", "http://localhost:3000/");

					xhr.onreadystatechange = function(e){
						if (xhr.readyState == 4) {
							var resultObj = JSON.parse(xhr.responseText);
							for (var adr in resultObj) {
								markArray.push({
									address: adr,
									marks: resultObj[adr]
								});
							}
							resolve();
						}
					};

					xhr.send(json);
				});
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
				
				// fill cluster
				markArray.forEach(function(obj, ind){
					obj.marks.forEach(t => createMark(t, ind));
				});
				
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
				date: getTime()
			};
			
			sendMark(newMark,function(e){
				markArray[pasteIndex].marks.push(newMark);
				createMark(newMark,pasteIndex);
				renderPlaceList(currentPosition.address);
				formInputs.forEach(t => t.value = '');
			});
		}
		
		function openFormByIndex (index,pos) {
			var currentAddress = markArray[index];
			currentPosition = {pos: [currentAddress.marks[0].coords.x,currentAddress.marks[0].coords.y], address: currentAddress.address};
			editFormTitle.innerHTML = currentPosition.address;
			editForm.classList.remove('hide');
			setElementPosition(editForm,pos[0] || 0,pos[1] || 0);
			renderPlaceList(currentPosition.address);
		}
		
		function createMark (mark,pasteIndex) {
			var myPlacemark = new ymaps.Placemark([mark.coords.x,mark.coords.y], { // create new mark
				iconContent: '1',
				balloonContentHeader: mark.name,
				balloonContentBody: '<div><a href="javascript:void(0);" class="address_link" data-index="'+ pasteIndex +'">' + mark.address + '</a></div><div>' + mark.text + '</div>',
				balloonContentFooter: prepareDate(mark.date),
				hintContent: 'Стандартный значок метки'
			}, 
			{
				preset: 'twirl#violetIcon'
			});
			
			mapClusterer.add(myPlacemark); // Fill claster
		}
		
		function getTime (date) {
			console.log(date);
			function doubleNumber (num) {
				return num < 10 ? '0' + num : num;
			}
			var now = date ? new Date(date) : new Date();
			return  now.getFullYear() + '.' + 
					doubleNumber(now.getMonth()) + '.' + 
					doubleNumber(now.getDate()) + ' ' + 
					doubleNumber(now.getHours()) + ':' +
					doubleNumber(now.getMinutes()) + ':' +
					doubleNumber(now.getSeconds());
		}
		
		function prepareDate (date) {
			return (date.length == parseInt(date).toString().length || typeof date == 'number' ? getTime(parseInt(date)) : date);
		}
		
		function sendMark (obj, callback) {
			var xhr = new XMLHttpRequest();

			var json = JSON.stringify({"op" : "add","review" : obj});

			xhr.open("POST", "http://localhost:3000/");

			xhr.onreadystatechange = function(e){
				if (xhr.readyState == 4) {
					if (typeof callback == 'function') {
						var result = JSON.parse(xhr.responseText);
						if (result.error) {
							console.error(result.error.message);
							addNotification('error', result.error.message);
							return false;
						}
						callback(result);
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
				messageBox.innerHTML = markArray[findIndex].marks.map( t => renderListObject (t) ).reverse().join('');
			}
		}
		
		function renderListObject (obj) {
			return '<div class="form-group-margin">'+
					'<div><strong>'+ obj.name + '</strong> ' + obj.place + ' <span class="pull-right">' + prepareDate(obj.date) + '</span></div><div class="place-description">' + obj.text + '</div>';
		}
		
		function addNotification (type, text) {
			var new_notification = document.createElement('DIV');
			new_notification.innerHTML = text;
			new_notification.setAttribute('class','notification' + (type == 'error' ? ' error' : ' success'));
			document.getElementsByClassName('notification_list')[0].appendChild(new_notification);
			setTimeout(function(){
				new_notification.remove();
			},5000);
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
			markArray = [];
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
				openFormByIndex(e.target.getAttribute('data-index'), [baloon.offsetLeft, baloon.offsetTop + baloon.offsetHeight + 10]);
			}
		});
		
		
		
		loadMap(); // on Load map init
	}
})();