var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream')
var fs = require('fs');
var async = require('async')
var youtubeStream = require('youtube-audio-stream')

io.of('/stream').on('connection', (socket) => {
    console.log('User Connected...');

     ss(socket).on('PlayTrack',function(stream,data){
         console.log(data)
        var id = data.track // 경로 추후 확인필요
        var url = 'https://www.youtube.com/watch?v=' + id;
            var streams = ss.createStream()
            //writestream 한 값을 받아와서 ss.createStream 으로 전송 
            youtubeStream(url).pipe(streams)
              ss(socket).emit('result', {
                payload: {
                    stream: streams
                }
            });
   
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });
});

http.listen(8000, () => {
    console.log('Server running on port 8000');
});
