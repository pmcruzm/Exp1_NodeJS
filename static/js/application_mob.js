/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 29-5-2014
***********************/
jQuery.noConflict();

//Variables 

//Event change orientation device
//window.addEventListener('orientationchange', doOnOrientationChange);


/*
jQuery(window).load(function(){
});
*/

jQuery(document).ready(function(){
	
	var baseUrl = document.location.protocol + "//" + document.location.host;
	
	//Operaciones con sockets
	var socket = io.connect(baseUrl);
	
	var uniqueId = jQuery("body").attr('id');

    socket.emit('mobile-register', {id: uniqueId});
	
	//Listo para empezar
    socket.on('start', function(data) {
		//Quitamos pantalla de inicio
		jQuery('#sync_win_mob').fadeOut(600);
	});
	
	//Se ha roto la vinculación
		
	//Obtenemos altura y anchura del navegador
	h_win=window.innerHeight;
	w_win=window.innerWidth;	
	
	jQuery('.box_gall').width(w_win);
	jQuery('.box_gall').height(h_win);
	
		
	//Acciones con la galería 
	var slider_mob=jQuery('.bxslider_mob').bxSlider({
						mode: 'horizontal',
					 	useCSS: false,
					  	pager: false,	
						onSlideNext: function(slideElement, oldIndex, newIndex){ 
						socket.emit('mobile-slider', {id:uniqueId, slide:'next'});	
					  },
					  onSlidePrev: function(slideElement, oldIndex, newIndex){
						 socket.emit('mobile-slider', {id:uniqueId, slide:'prev'});	
					  },
					  	/*onSlideAfter: function(slideElement, oldIndex, newIndex){
							var current = slider_mob.getCurrentSlide();
							//Enviar slider al servidor 
							socket.emit('mobile-slider', {id:uniqueId, slide:current});	
						}*/
					});		

	
});

/************************
FUNCIONES JAVASCRIPT
*************************/