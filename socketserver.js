var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.of('/stream').on('connection', (socket) => {
    console.log('User Connected...');
    
    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });
    
    socket.on('add-message', (message, username) => {
        io.emit('message', {type: 'new-message', text: message, username: username});
    });
});

http.listen(8000, () => {
    console.log('Server running on port 8000');
});


// socket 서버 20170404
// var express = require('express');
// var http = require('http');
 
// var app = express();
// app.use(express.static(path.join(__dirname, 'public')));
 
// var httpServer =http.createServer(app).listen(3333, function(req,res){
//   console.log('Socket IO server has been started');
// });
// // upgrade http server to socket.io server
// var io = require('socket.io').listen(httpServer);


// io.of('/stream').on('connection', function(socket){
// 	ss(socket).on('videoURL', function(data) {

//        var videoURL = data.videoURL;
//           data = data || {};

//         var type = data.type;
//         var payload = data.payload;

//         var stream = ss.createStream();

//       url = 'https://www.youtube.com/watch?v=' + id;
//                 try {
//                  var filename;
//                  youtubeStream(url).pipe(filename) // 이거자체가 파일 스트림일 수도 있다 
//                  fs.createReadStream(filename).pipe(stream)
// 	               ss(socket).emit('onSocketMsg', {
// 		                type: 'resultChunkVideoData',
// 		                payload: {
// 		                    stream: stream
// 		                }
// 	           		});
// 	            /*   fs.createReadStream(youtubeStream(url).pipe(res)).pipe(stream) 
// 	               ss(socket).emit('onSocketMsg', {
// 		                type: 'resultChunkVideoData',
// 		                payload: {
// 		                    stream: stream
// 		                }
// 	           		});
// 	           		*/
//                  } catch (exception) {
//                  res.status(500).send(exception)
//                 } 
// 	});
// });



    