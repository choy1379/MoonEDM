var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream')

io.of('/stream').on('connection', (socket) => {
    console.log('User Connected...');

     ss(socket).on('test',function(stream,data){
        var id = data.result.videoURL
            url = 'https://www.youtube.com/watch?v=' + id;
            try {
                    var filename = '';
                    youtubeStream(url).pipe(filename) // 이거자체가 파일 스트림일 수도 있다 
                    fs.createReadStream(filename).pipe(stream)
                    ss(socket).emit('result', {
                        type: 'Audio',
                        payload: {
                              stream: stream
                        }
                    });
            /*   fs.createReadStream(youtubeStream(url).pipe(res)).pipe(stream) 
                ss(socket).emit('onSocketMsg', {
                    type: 'resultChunkVideoData',
                    payload: {
                        stream: stream
                    }
                });
                */
                } catch (exception) {
                // res.status(500).send(exception)
                console.log('error')
            } 

    })

    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });
});

http.listen(8000, () => {
    console.log('Server running on port 8000');
});


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



    