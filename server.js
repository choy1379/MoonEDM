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
// app.post('/toMp3',functions.toMp3)
app.use(express.static(__dirname));
app.listen(process.env.PORT || 4100);
 console.log("Server up on port 4100");

    