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
	
	//Obtenemos el id único para sincronizar
	var id_s=get_mob_url_id();
	var baseUrl = document.location.protocol + "//" + document.location.host;
	var mob_url=baseUrl + "/mobile/" + id_s;
	
	
	jQuery("#enlace_sync").html(mob_url);  
	
	//Opciones para generar el QR
	var options = {
					render: "canvas",

					fill: '#000000',
					background: "#ffffff",

					text: mob_url,
					size: 130,
					
					label: "PXM",
					fontname: 'Arial',
					fontcolor: '#3CF',
					mPosX: 0.5,
					mPosY: 0.5,
					mSize: 0.11,
					minVersion: 6,
					mode: 2,
					quiet: 1,
					radius: 0.5,

				};
	jQuery("#qr_sync").qrcode(options);
	
	//Obtenemos altura y anchura del navegador
	h_win=window.innerHeight;
	w_win=window.innerWidth;	
	
	jQuery('.box_gall').width(w_win);
	jQuery('.box_gall').height(h_win);
	
	//Acciones con la galería 
	var slider=jQuery('.bxslider').bxSlider({
						mode: 'horizontal',
					 	useCSS: false,
					  	pager: false,	
					});		
	
	//Operaciones con sockets
	var socket = io.connect(baseUrl);

     socket.emit('desktop-register', {id: id_s});

     socket.on('mobile-on', function(data) {
            jQuery("#sync_win").fadeOut(600);
     });
	 
	 socket.on('mobile-n-slide', function(data) {
		if(data.id=='next'){
		 	slider.goToNextSlide();
		}else{
			slider.goToPrevSlide();	
		}
     	/*slider.goToSlide(data.id);*/
     });
	 
	/* socket.on('disconnect', function(data) {
		// Mostramos la pantalla de inicio y reseteamos galería 
		 jQuery("#sync_win").fadeIn(600);
		 slider.reloadSlider();
		 socket.emit('desktop-close', {id: id_s});
	 });*/
	
});

/************************
FUNCIONES JAVASCRIPT
*************************/

function get_mob_url_id(){
	var baseUrl = document.location.protocol + "//" + document.location.host
    
    /*var allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";*/
	var allChars = "1234567890";
    var ranLength = 8;
    
    var uniqueId = "";
    
    for(var i=0; i<ranLength; i++) {
        uniqueId += allChars[Math.floor(Math.random() * allChars.length)];
    }
	
	return uniqueId;
}