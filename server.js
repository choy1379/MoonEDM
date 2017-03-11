var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');

var app = express();


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
app.use(express.static(__dirname));
app.listen(process.env.PORT || 4100);
 console.log("Server up on port 4100");

    