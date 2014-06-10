var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
   res.render('index.ejs');
});
app.get('/mobile/:id', function(req, res){
    res.render('mobile.ejs',{id_s:req.params.id});
});

server.listen(8080);

var roomUsers = {};

io.sockets.on('connection', function (socket) {

	var deskSocket;
    var mobileSocket
	
	socket.on('desktop-register', function(data) {
        roomUsers[data.id] = deskSocket = socket;
		//console.log('Registro D:'+data.id);
    });
	
	socket.on('mobile-register', function(data) {
        mobileSocket = socket;
		
		//console.log('Registro M:'+data.id);		
		//console.log('Res Array:'+roomUsers[data.id]);

        if(typeof(roomUsers[data.id]) !== "undefined") {
            deskSocket = roomUsers[data.id];
            
            deskSocket.emit('mobile-on');
            mobileSocket.emit('start');
        }
    });
	
	socket.on('mobile-slider', function(data) {
		mobileSocket = socket;
		console.log(data.id+'--'+data.slide);
		if(typeof(roomUsers[data.id]) !== "undefined") {
            deskSocket = roomUsers[data.id];
            deskSocket.emit('mobile-n-slide',{id: data.slide});
        }
	});
	
	/*socket.on('desktop-close', function(data) {
		//Cerrar Escritorio
		console.log('Cerrar escritotio'); 
	});*/
	
	/*
	 //When a user disconnects
  socket.on("disconnect", function(){
    console.log(rooms.length);
    var destroyThis = null;

    if(typeof socket.store.data.roomi == 'undefined'){
      for(var i in rooms){
        if(rooms[i].roomSocket.id == socket.id){
          destroyThis = rooms[i];
        }
      }
      if(destroyThis !== null){rooms.splice(destroyThis, 1);}
      console.log(rooms.length);
    }else{
      var roomId = socket.store.data.roomi;
      for(var i in rooms[roomId].mobileSockets){
        if(rooms[roomId].mobileSockets[i] == socket){
          destroyThis = i;
        }
      }
      if(destroyThis !== null){rooms[roomId].mobileSockets.splice(destroyThis, 1);}
      rooms[roomId].roomSocket.emit('remove user', socket.id);
    }
  });
	*/
 

});