var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream')
var fs = require('fs');
var async = require('async')
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg')

io.of('/stream').on('connection', (socket) => {
    console.log('User Connected...');

     ss(socket).on('test',function(stream,data){
        var id = data.result.videoURL
        var title = 'temp' 
        var url = 'https://www.youtube.com/watch?v=' + id;
        var ytdls = ytdl(url); 

        //set stream for conversion
        var proc = new ffmpeg({source: ytdls});
        var track = ''
        proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .output(fs.createWriteStream('rockbye.mp3'))
        .run();
        proc.on('end', function() {
                data = data || {};
                var type = data.type;
                var payload = data.payload;
                // 파일생성하는 방법으로 임시로 만듬 
                var streams = ss.createStream()
                     ss(socket).emit('result', {
                payload: {
                    stream: streams
                }
            });
                fs.createReadStream(__dirname+'/rockbye.mp3').pipe(streams)
        });
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



    