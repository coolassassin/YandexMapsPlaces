;
(function(){
	"use strict";
	console.log('Инициализация приложения');
	
	var myMap;
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
				var coords = output.coords;
				myMap = new ymaps.Map('map', {
					center:[coords.latitude, coords.longitude],
					zoom:12
				});
				console.log('Ваши координаты: %f, %f', coords.latitude, coords.longitude);
			}).then(function(e){
				var myPlacemark1 = new ymaps.Placemark([59.873296200000006,30.988187399999997], {
					iconContent: '1',
					balloonContent: 'Балун',
					hintContent: 'Стандартный значок метки'
				}, 
				{
					preset: 'twirl#violetIcon'
				});
				
				myMap.geoObjects.add(myPlacemark1);
			}).catch(function(e){
				console.error(e);
			});
		}
		
		// variables
		var destroyBut = document.getElementById('destroyButton'),
			loadBut = document.getElementById('loadButton');
		
		// events declaration
		destroyBut.addEventListener('click',function () {
			myMap.destroy();
			this.classList.add('hide');
			loadBut.classList.remove('hide');
			
		});
		
		loadBut.addEventListener('click',function () {
			loadMap();
			this.classList.add('hide');
			destroyBut.classList.remove('hide');
		});
		
		loadMap();
	}
})();