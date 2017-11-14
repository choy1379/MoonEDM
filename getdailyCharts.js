var request = require('request');
var config = require('./config');
var express = require('express');
var router = express.Router();
var YouTube = require('youtube-node');
var ytdl = require('ytdl-core');
 var async = require('async')
var fs = require('fs');
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds063406.mlab.com:63406/hashcollect');
var ffmpeg = require('fluent-ffmpeg')
 var youTube = new YouTube();

youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');  
 functions = {
                addtrackList: function(req,res){
                        tracks = req.body
                        tracklistarr = new Array();
                         function youtubesearch(i) {
                                                        return function(callback) {      
                                                                youTube.addParam("order", 'relevance');                       
                                                                youTube.search(tracks[i].artist + ' ' + tracks[i].albumtitle + ' audio', 1, function(error, result) {
                                                                        if (error) {
                                                                        console.log(error);
                                                                        }
                                                                        else {
                                                                        callback(null,result.items[0])    
                                                                        }
                                                                });
                                                        };
                                                }

                                                function youtube(callback) {
                                                try{
                                                        var endyoutube = function(err, result) {
                                                                console.log('end')
                                                                for(var i = 0; i < result.length; i++)
                                                                {
                                                                        youtubelist = new Object()
                                                                        youtubelist.track = tracks[i].albumtitle
                                                                        youtubelist.AlbumImg = tracks[i].albumImg
                                                                        if(result[i] == undefined){}
                                                                        else
                                                                        {
                                                                         youtubelist.videoURL = result[i].id.videoId
                                                                        }
                                                                        youtubelist.Artist = tracks[i].artist
                                                                        youtubelist.id = tracks[i].id
                                                                        tracklistarr.push(youtubelist)
                                                                        config.playlist_ADD.push(youtubelist)
                                                                } 
                                                                return callback();
                                                        };
                                                     }
                                                     finally{}
                                                        var youtubeFunctions = [];
                                                        //2 push youtubesearch function(k)
                                                        for (var i=0; i < tracks.length; i++) {
                                                                (function (k) {
                                                                        youtubeFunctions.push(youtubesearch(k));
                                                                })(i);
                                                        }
                                                        //3 async.parallel youtubeFuncrions --> endyoutube --> callback --> youtube
                                                        return async.parallel(youtubeFunctions, endyoutube );
                                                }
                                                //1 youtube function()
                                                youtube( function() {
                                                        db.playlist.save(tracklistarr, function(){
                                                                res.json({success: true, data:tracklistarr});
                                                        });     
                                                });

                },
                getDaily: function() {
                        
                                var albumArray = []
                                var dt = new Date();
                                var day = ('0'+ dt.getDate()).slice(-2);
                                var year = dt.getFullYear();
                                date = year + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + day
                                
                                var url = 'http://music.bugs.co.kr/chart/track/day/total'
                                var Spooky = require('spooky');
                                var spooky = new Spooky({
                                        casper: {
                                                logLevel: 'debug',
                                                verbose: false,
                                                options: {
                                                        clientScripts: ['https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js']
                                                },
                                                viewportSize: {
                                                                width: 1440, height: 768
                                                        },
                                                pageSettings: {
                                                        webSecurityEnabled: false, 
                                                        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11" // Spoof being Chrome on a Mac (https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx)
                                                }
                                                
                                        }
                                        }, function (err) {
                                        if (err) {
                                                e = new Error('Failed to initialize SpookyJS');
                                                e.details = err;
                                                throw e;
                                        }


                                        spooky.start(url);

                                        spooky.then(function(){
                                                //순위 1 ~ 100
                                                Rank = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#CHARTday > table > tbody > tr > td > div > strong');
                                                                return elements.map(function(e) {
                                                                        return e.innerText
                                                                });
                                                });
                                                // 이미지 작은거  //플레이리스트 곡추가시 큰이미지로 추가시켜줘야지 이미지 안깨짐
                                                albumImg = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#CHARTday > table > tbody > tr > td > a > img');
                                                                return elements.map(function(e) {
                                                                          return e.getAttribute('src')
                                                                });
                                                        });
                                                // 앨범노래명
                                                albumTitle = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#CHARTday > table > tbody > tr > th > p.title > a');
                                                                return elements.map(function(e) {
                                                                        // return e.getAttribute('track_title')
                                                                        return e.innerText
                                                                });
                                                         });
                                                // 아티스트
                                                artist = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#CHARTday > table > tbody > tr > td > p.artist > a:nth-child(1)');
                                                                return elements.map(function(e) {
                                                                                return e.getAttribute('title')
                                                                });
                                                          });
                                                // 앨범명
                                                album = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#CHARTday > table > tbody > tr > td > a.album');
                                                                return elements.map(function(e) {
                                                                                return e.getAttribute('title')
                                                                 });
                                                      });

                                                for(var i = 0; i<Rank.length; i++)
                                                {
                                                        Albumlist = new Object() 
                                                        Albumlist.Rank = Rank[i]
                                                        Albumlist.albumImg = albumImg[i].slice(0,38)+'/50'+albumImg[i].slice(40)
                                                        Albumlist.albumTitle = albumTitle[i]
                                                        Albumlist.artist = artist[i]
                                                        Albumlist.album = album[i]
                                                        var dt = new Date();
                                                        var day = ('0'+ dt.getDate()).slice(-2);
                                                        var year = dt.getFullYear();
                                                        Albumlist.date = year + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + day
                                                        this.emit('albumarr',Albumlist)
                                                }     
                                                        
                                        });

                                        spooky.then(function(){
                                                this.emit('end','end')
                                                this.exit()
                                        });

                                        spooky.run();
                                    
                                });
                                        spooky.on('logs', function (logs) {
                                                                console.log(logs)
                                                                });
                                        spooky.on('albumarr', function (Albumlist) {
                                                                albumArray.push(Albumlist)
                                                                });
                                        spooky.on('end', function (end) {
                                                                db.dailyCharts.remove({date:{$lte:date}}, (err, collect) => {  
                                                                                db.dailyCharts.save(albumArray, function(){
                                                                                });      
                                                                         });                             
                                                                });     
                        },
                dailyChartSearch: function(req, res) {
                        //날짜 가져오는부분중복됨 추후 통합 0731
                        var dt = new Date();
                        var day = ('0'+ dt.getDate()).slice(-2);                                      
                        var year = dt.getFullYear();
                          date = year + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + day
                                                      
                          db.dailyCharts.find({"date": date },{ "id" : false}).sort({ "Rank": 1} , (err, DBresult) => {
                                if (err) {
                                return res.send(err);
                        }
                        res.json({success: true, tracklist:DBresult});
                  } );
                      
            }              
 }
module.exports = functions;