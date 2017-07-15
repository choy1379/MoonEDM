// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var functions = require('./functions');

// var app = require('express')();


// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({
//         extended: true,
//     parameterLimit: 10000,
//     limit: 1024 * 1024 * 10
// }));
// app.use(cors());

// app.post('/searchDJ', functions.DJsearch);
// app.post('/searchPlaylist', functions.searchPlaylist)
// app.post('/youtube_dl',functions.youtube_dl)
// app.post('/youtube_dl_one',functions.youtube_dl_one)
// app.post('/youtube_dl_multiple',functions.youtube_dl_multiple)
// app.post('/textdownload',functions.textdownload)
// app.post('/bugsartist',functions.bugsartist)
// app.post('/bugstrack',functions.bugstrack)
// app.post('/PlaylistAdd',functions.PlaylistAdd)
// app.post('/PlaylistSearch',functions.PlaylistSearch)
// app.post('/temp',functions.temp)
// app.post('/PlaylistDelete',functions.PlaylistDelete)
// app.post('/toMp3',functions.toMp3)
// app.use(express.static(__dirname));

// app.listen(process.env.PORT || 4100);


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');
var app = require('express')();
var http = require('http')
var ss = require('socket.io-stream')
var fs = require('fs');
var async = require('async')
var youtubeStream = require('youtube-audio-stream'),
server = require('http').createServer(app),
io = require('socket.io').listen(server)


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
extended: true,
parameterLimit: 10000,
limit: 1024 * 1024 * 10
}));
app.use(cors());

app.post('/searchDJ', functions.DJsearch);
app.post('/searchPlaylist', functions.searchPlaylist)
app.post('/youtube_dl',functions.youtube_dl)
app.post('/youtube_dl_one',functions.youtube_dl_one)
app.post('/youtube_dl_multiple',functions.youtube_dl_multiple)
app.post('/textdownload',functions.textdownload)
app.post('/bugsartist',functions.bugsartist)
app.post('/bugstrack',functions.bugstrack)
app.post('/PlaylistAdd',functions.PlaylistAdd)
app.post('/PlaylistSearch',functions.PlaylistSearch)
app.post('/temp',functions.temp)
app.post('/PlaylistDelete',functions.PlaylistDelete)
app.post('/toMp3',functions.toMp3)
app.use(express.static(__dirname));


io.of('/stream').on('connection', (socket) => {
console.log('User Connected...');

ss(socket).on('PlayTrack',function(stream,data){

function getConnectedList ()
{
    let list = []

    for ( let client in io.sockets.connected )
    {
        list.push(client)
    }

    return list
}

console.log( getConnectedList() )


Object.keys(io.sockets.sockets).forEach(function(s) {
    if(socket.client.id != io.sockets.sockets[s].id)
    {
        console.log(io.sockets.sockets[s].id + ' _disconnected')
        io.sockets.sockets[s].disconnect(true);
    }
});

console.log( getConnectedList() )

var id = data.track
var url = 'https://www.youtube.com/watch?v=' + id;
var streams = ss.createStream()
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

server.listen(process.env.PORT || 4100);
