var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds063406.mlab.com:63406/hashcollect');
var config = require('./config');

function playlistfindID(id){
        db.playlist.find({"id": id},{ "id" : false}, (err, DBresult) => {
                        if (err) {
                        return res.send(err);
                                }
                        result = DBresult
                        for(var i = 0; i <result.length; i++)
                        {
                                youtubelist = new Object()
                                youtubelist.videoURL = result[i].videoURL
                                youtubelist.track = result[i].track
                                youtubelist.Artist = result[i].Artist
                                youtubelist.freequencies = [[145, 5000], [145, 5000]]
                                youtubelist._id =  result[i].id
                                config.playlist_ADD.push(youtubelist)
                        }
                });
}
dbSearch = {
        PlaylistAdd: function(req, res) {
                          db.playlist.save(req.body, function(){
                                        youtubelist = new Object()
                                        youtubelist.videoURL = req.body.videoURL
                                        youtubelist.track = req.body.track
                                        youtubelist.Artist = req.body.Artist
                                        youtubelist.AlbumImg = req.body.AlbumImg
                                        youtubelist.freequencies = [[145, 5000], [145, 5000]]
                                        config.playlist_ADD.push(youtubelist)  
                                        res.json({success: true});
                         });        
            },
        PlaylistDelete: function(req, res) {
                var id = req.body.id
                config.playlist_ADD = []
                if(req.body.track == undefined)
                {
                  db.playlist.remove({"id":id},(err) => {   
                        if (err) {
                                return console.log(err);
                        }  
                        playlistfindID(id)
                        res.json({success: true, tracklist:config.playlist_ADD});
                  });
                }
                else
                {
                 db.playlist.remove({"id": id,"videoURL":req.body.videoURL,"track":req.body.track},(err, res) => {      
                        if (err) {
                                 return console.log(err);
                                }
                                playlistfindID(id)
                        });
                }
        },

        PlaylistSearch: function(req, res) {
                var result = []
                config.playlist_ADD = []
                var id = req.body.id
                  db.playlist.find({"id": id},{ "id" : false}).sort({"_id":1}, (err, DBresult) => {
                        if (err) {
                        return res.send(err);
                }
                config.playlist_ADD = DBresult;
                res.json({success: true, tracklist:config.playlist_ADD});
                  });
            }
}
module.exports = dbSearch;
module.exports.playlistfindID = playlistfindID;