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
// var youtubeStream = require('youtube-audio-stream')
var ffmpeg = require('fluent-ffmpeg')
 var youTube = new YouTube();
var offliberty = require('offliberty');
youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');    

//textdownload , searchPlaylist
function parallelDJ (tracks,arr,count,res) {
                                                        function youtubesearch(i) {
                                                        return function(callback) {
                                                                youTube.search(tracks[i], 1, function(error, result) {
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
                                                        var endyoutube = function(err, result) {
                                                                console.log('end')
                                                                for(var i = 0; i < result.length; i++)
                                                                {
                                                                        youtubelist = new Object()
                                                                        youtubelist.videoID =  "https://www.youtube.com/embed/"+result[i].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
                                                                        youtubelist.track = result[i].snippet.title, null, 1
                                                                        youtubelist.count = count++
                                                                        youtubelist.tbcell = randomString()
                                                                        youtubelist.iframe = randomString()
                                                                        youtubelist.videoURL = result[i].id.videoId
                                                                        if(arr == 'Youtubearr')
                                                                        config.Youtubearr.push(youtubelist)
                                                                        else
                                                                        config.textdownload.push(youtubelist)    
                                                                } 
                                                                return callback();
                                                        };
                                                        var youtubeFunctions = [];
                                                        for (var i=0; i < tracks.length; i++) {
                                                                (function (k) {
                                                                        youtubeFunctions.push(youtubesearch(k));
                                                                })(i);
                                                        }
                                                        return async.parallel(youtubeFunctions, endyoutube );
                                                }

                                                youtube( function() {
                                                        if(arr == 'Youtubearr')
                                                        res.json({success: true, data:config.Youtubearr});
                                                        else
                                                        res.json({success: true, data:config.textdownload});
                                                        console.log('--------------- end youtube');
                                                });
}
    function parallelbugs(tracks,Artist,count,res,Add) {
                var start = new Date().getTime();
                var tempplaylist_ADD = []
                //성능이슈문제 async.parallel 만 쓰이게..  변경할예정
              async.forEachOfLimit(tracks, 1, function(track, index, cb) {
                                                                        async.parallel([
                                                                                function(callback) {
                                                                                                if(!Add == true)
                                                                                                {
                                                                                                        youTube.addParam("order", 'relevance');
                                                                                                        youTube.search(Artist + ' ' + track, 1, function(error, result) {
                                                                                                                if (error) {
                                                                                                                console.log(error);
                                                                                                                }
                                                                                                                else {
                                                                                                                        callback(null,result.items[0].id.videoId)                                                                                                          
                                                                                                                }
                                                                                                        });                               
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                        console.log(track.Artist + ' ' + track.track)
                                                                                                        youTube.addParam("order", 'relevance');
                                                                                                        youTube.search(track.Artist + ' ' + track.track, 1, function(error, result) {
                                                                                                                if (error) {
                                                                                                                console.log(error);
                                                                                                                }
                                                                                                                else {
                                                                                                                        callback(null,result.items[0].id.videoId)                                                                                                          
                                                                                                                }
                                                                                                        });  
                                                                                                }
                                                                                                                                                    
                                                                                }
                                                                                
                                                                        ], function (err, result) {
                                                                                 if(!Add == true)
                                                                                {
                                                                                        youtubelist = new Object()
                                                                                        youtubelist.videoID =  "https://www.youtube.com/embed/"+result+"?enablejsapi=1&theme=light&showinfo=0"
                                                                                        youtubelist.count = count++
                                                                                        youtubelist.tbcell = randomString()
                                                                                        youtubelist.iframe = randomString()
                                                                                        youtubelist.videoURL = result
                                                                                        //bugsResult albumtitle
                                                                                        youtubelist.tracks = track
                                                                                        youtubelist.Artist = Artist
                                                                                        config.bugsYoutubearr.push(youtubelist)
                                                                                        cb()
                                                                                }
                                                                                else
                                                                                {
                                                                                                youtubelist = new Object()
                                                                                                youtubelist.result = result
                                                                                                youtubelist.trackName = track.track
                                                                                                youtubelist.artist = track.Artist
                                                                                                tempplaylist_ADD.push(youtubelist)
                                                                                                cb()                                                                                  
                                                                                }
                                                                        });
                                                        },
                                                        function(err,result) { 
                                                        if(!Add == true)
                                                        res.json({success: true, album : config.bugstrack,tracklist:config.bugsYoutubearr});
                                                        else  
                                                        {
                                                                function offsearch(i) {
                                                                        console.log('make function: '+i);
                                                                        return function(callback) {
                                                                                console.log('test Function: '+i);
                                                                                // convertMp3(tempplaylist_ADD[i].result ,function (err, Url) {                                                                                                                                                     
                                                                                //         callback(null,Url)                                                                      
                                                                                // });   
                                                                              
                                                                                offliberty.off('https://www.youtube.com/watch?v='+tempplaylist_ADD[i].result, function (err, Url) {                                                                                                                                                     
                                                                                        callback(null,Url)                                                                      
                                                                                });   
                                                                        };
                                                                }

                                                                function offlberty(callback) {
                                                                        var endofflberty = function(err, result) {
                                                                                console.log('end')
                                                                                for(var i = 0; i < result.length; i++)
                                                                                {
                                                                                        youtubelist = new Object()
                                                                                        youtubelist.src = result[i]
                                                                                        youtubelist.trackName = tempplaylist_ADD[i].trackName
                                                                                        youtubelist.artist = tempplaylist_ADD[i].artist
                                                                                        youtubelist.freequencies = [[145, 5000], [145, 5000]]
                                                                                        youtubelist._id =  tracks[i]._id
                                                                                        config.playlist_ADD.push(youtubelist)                 
                                                                                } 
                                                                                return callback();
                                                                        };
                                                                        var offFunctions = [];
                                                                        for (var i=0; i < tempplaylist_ADD.length; i++) {
                                                                                (function (k) {
                                                                                        offFunctions.push(offsearch(k));
                                                                                })(i);
                                                                        }
                                                                        return async.parallel(offFunctions, endofflberty );
                                                                }

                                                                offlberty( function() {
                                                                        console.log(config.playlist_ADD)
                                                                        res.json({success: true, tracklist:config.playlist_ADD});
                                                                        console.log('--------------- end offliberty');
                                                                });
                                                        }
                                         })
        }

function randomString() {
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
                var string_length = 15;
                var randomstring = '';
                for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
                }
                //document.randform.randomfield.value = randomstring;
                return randomstring;
        }
function convertMp3(videoid,callback){
            
                var url = 'http://api.convert2mp3.cc/button/?v='+videoid+'&f=mp3'
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
                                       downloadURL = this.evaluate(function() {
                                                var elements = __utils__.findAll('#input_background > a');
                                                return elements.map(function(e) {
                                                        return e.getAttribute('href')
                                                });
                                        });
                                this.emit('return',downloadURL)
                        });
                        spooky.run();

                        spooky.on('return', function (downloadURL) {
                                callback(null,downloadURL[0]) //error 가 있으면 콜백 null값에 에러내용  위의함수 function (err, Url) 에서 받는다
                        });    
                      
                });
            
}
functions = {

        DJsearch: function(req, res) {
                config.DJarr = []
                var DJname = req.body.id
                var url = 'http://www.1001tracklists.com/dj/'+DJname+'/index.html'
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
                                 DJsetMonth = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td > article > div > div.calendar > div.cMonth.text-uppercase');
                                                return elements.map(function(e) {
                                                        return e.innerText
                                                //     return e.getAttribute('id')
                                                });
                                        });
                                 DJsetDay = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td > article > div > div.calendar > div.cDay');
                                                return elements.map(function(e) {
                                                        return e.innerText
                                                });
                                        });
                                 DJsetyear = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td > article > div > div.calendar > div.cYear');
                                                return elements.map(function(e) {
                                                        return e.innerText
                                                });
                                        });
                                DJsetlist = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td > article > div > div.tlInfo > div.tlLink');
                                                return elements.map(function(e) {
                                                        return e.innerText
                                                });
                                        });
                                DJsetDetail = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td > article > div > div.tlInfo > div.tlLink > a');
                                                return elements.map(function(e) {
                                                       return e.getAttribute('href')
                                                });
                                        });
                                DJsetImage = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > table > tbody > tr > td.noPad.topAlign > div > img');
                                                return elements.map(function(e) {
                                                       return e.getAttribute('src')
                                                });
                                        });

                         for(var i = 0; i<DJsetlist.length; i++)
                            {
                                DJlist = new Object() 
                                DJlist.Month = DJsetMonth[i]
                                DJlist.Day = DJsetDay[i]
                                DJlist.year = DJsetyear[i]
                                DJlist.list = DJsetlist[i]
                                DJlist.Detail = DJsetDetail[i]
                                DJlist.Image = DJsetImage[i]
                                this.emit('DJsetarr',DJlist)
                            }

                        });
                        spooky.then(function(){
                                this.emit('end','end')
                        });
                        spooky.run();
                      
                        });
                spooky.on('DJsetarr', function (DJlist) {
                                                config.DJarr.push(DJlist)
                                                });
                spooky.on('end', function (end) {
                                               res.json({success: true, data:config.DJarr});
                                                });     
        },
          searchPlaylist: function(req, res) {
                config.Playlistarr = []
                config.Youtubearr = [] 
                var url = 'http://www.1001tracklists.com'+req.body.playList+''
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
                                       Playlist_DJ = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > div:nth-child(1) > table > tbody> tr > td > div.tlToogleData > meta:nth-child(1)');
                                                return elements.map(function(e) {
                                                        return e.getAttribute('content')
                                                //     return e.getAttribute('id')
                                                });
                                        });
                                        Playlist_Track = this.evaluate(function() {
                                                var elements = __utils__.findAll('#middleTbl > tbody > tr > td > div:nth-child(1) > table > tbody> tr > td > div.tlToogleData > meta:nth-child(2)');
                                                return elements.map(function(e) {
                                                        return e.getAttribute('content')
                                                //     return e.getAttribute('id')
                                                });
                                        });

                         for(var i = 0; i<Playlist_DJ.length; i++)
                            {
                                Playlist = new Object() 
                                Playlist.track = Playlist_DJ[i]+'-'+Playlist_Track[i]
                                this.emit('PlaylistArr',Playlist)
                            }
                            
                        });

                        spooky.then(function(){
                                this.emit('end','end')
                        });
                        
                        spooky.run();

                        spooky.on('PlaylistArr', function (Playlist_DJ) {
                        config.Playlistarr.push(Playlist_DJ.track)
                        });

                        spooky.on('end', function (end) {
                                var count = 0
                                var tracks = config.Playlistarr                  
                                parallelDJ(tracks, 'Youtubearr' ,count,res)
                        });    
                      
                });
          },
          youtube_dl : function(req,res)
          {
                var videoURL = req.body.videoURL 
                console.log('Requesting...');
                offliberty.off('https://www.youtube.com/watch?v='+videoURL, function (err, downloadUrl) {
                console.log(err || downloadUrl);
                res.json({success: true, URL:downloadUrl});
                });
       
          },
        youtube_dl_one : function(req,res)
        {
                        config.youtubedl_one = []
                        var youTube = new YouTube();

                        youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');
                        console.log(req.body)
                        youTube.search(req.body.id, 1, function(error, result) {
                        if (error) {
                                console.log(error);
                        }
                        else {
                                youtubelist = new Object()
                                youtubelist.videoID =  "https://www.youtube.com/embed/"+result.items[0].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
                                youtubelist.track = result.items[0].snippet.title, null, 1
                                youtubelist.videoURL = result.items[0].id.videoId
                                youtubelist.tbcell = randomString()
                                youtubelist.iframe = randomString()
                                config.youtubedl_one.push(youtubelist)
                                res.json({success: true, data:config.youtubedl_one});
                             }
                        });
          },
        youtube_dl_multiple : function(req,res)
        {
                        config.youtubedl_multi = []
                        var youTube = new YouTube();

                        youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');
                        youTube.search(req.body.track, 20, function(error, result) {
                        if (error) {
                                console.log(error);
                        }
                        else {
                                for(var i = 0 ; i<result.items.length; i++)
                                {
                                        youtubelist = new Object()
                                        youtubelist.videoID =  "https://www.youtube.com/embed/"+result.items[i].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
                                        youtubelist.track = result.items[i].snippet.title, null, 1
                                        youtubelist.videoURL = result.items[i].id.videoId
                                        youtubelist.tbcell = randomString()
                                        youtubelist.iframe = randomString()
                                        config.youtubedl_multi.push(youtubelist)
                                }
                                        // console.log(config.youtubedl_multi)
                                        res.json({success: true, data:config.youtubedl_multi});
                             }
                        });
          },
          
          textdownload : function(req,res) {
                                config.textdownload = []      
                                trackarr = req.body              
                                count = 0
                                parallelDJ(trackarr, 'bugsYoutubearr',count,res)
                               
          },
          bugsartist: function(req, res) {
                config.bugsartistarr = []
                var melonArtist = req.body.id
                var url = 'http://search.bugs.co.kr/album?q='+melonArtist + '&flac_only=false&target=ARTIST_ALBUM&page=1&sort=R'
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
                                 Album = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > a.albumTitle');
                                                return elements.map(function(e) {
                                                        // return e.innerText
                                                    return e.getAttribute('title')
                                                });
                                  });
                                 href = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > a.albumTitle');
                                                return elements.map(function(e) {
                                                        // return e.innerText
                                                    return e.getAttribute('href')
                                                });
                                  });
                                 Artist = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p.artist > a');
                                                return elements.map(function(e) {
                                                    return e.getAttribute('title')
                                                });
                                  });
                                 AlbumDate = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p:nth-child(2) > time');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumType = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p:nth-child(2) > span > span');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                Albumimg = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > div.thumbnail > a > img');
                                                return elements.map(function(e) {
                                                    return e.getAttribute('src')
                                                });
                                  });

                                 
                                for(var i = 0; i<Album.length; i++)
                                {
                                        Albumlist = new Object() 
                                        Albumlist.Album = Album[i]
                                        Albumlist.href = href[i]
                                        Albumlist.Artist = Artist[i]
                                        Albumlist.AlbumDate = AlbumDate[i]
                                        Albumlist.AlbumType = AlbumType[i]
                                        Albumlist.Albumimg = Albumimg[i]  
                                        this.emit('albumarr',Albumlist)
                                }     
                         });

                        var selectXPath = 'xPath = function(expression) { return {    type: "xpath", path: expression, toString: function() {return this.type + " selector: " + this.path; }  };};'
                         for(var i =2; i<9; i++)
                        {
                                spooky.then([{x: selectXPath,i:i},function(){  
                                                paging = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > div.paging > a');
                                                                return elements.map(function(e) {
                                                                return e.innerText
                                                                });
                                                });   

                                                //첫페이지 일경우
                                                if(paging.length <2)
                                                {
                                                        this.emit('end','end')
                                                        this.exit()
                                                }
                                                //페이지값이 i값 보다 클경우 
                                                else if(paging.length < i) 
                                                {   
                                                        this.emit('end','end')
                                                        this.exit()
                                                }
                                                else
                                                {
                                                        var xpathExpr1 = '//*[@id="container"]/section/div/div[2]/a['+i+']'
                                                        eval(x);
                                                        this.click(xPath(xpathExpr1));
                                                        this.wait(1000);   
                                                }
                                           
                                                         
                                }]);

                                spooky.then(function(){
                                               href = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > a.albumTitle');
                                                                return elements.map(function(e) {
                                                                        // return e.innerText
                                                                return e.getAttribute('href')
                                                                });
                                                 });
                                                Album = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > a.albumTitle');
                                                                return elements.map(function(e) {
                                                                        // return e.innerText
                                                                return e.getAttribute('title')
                                                                });
                                                });
                                                Artist = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p.artist > a');
                                                                return elements.map(function(e) {
                                                                return e.getAttribute('title')
                                                                });
                                                });
                                                AlbumDate = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p:nth-child(2) > time');
                                                                return elements.map(function(e) {
                                                                return e.innerText
                                                                });
                                                });
                                                AlbumType = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > figcaption > div > p:nth-child(2) > span > span');
                                                                return elements.map(function(e) {
                                                                return e.innerText
                                                                });
                                                });
                                                Albumimg = this.evaluate(function() {
                                                                var elements = __utils__.findAll('#container > section > div > ul > li > figure > div.thumbnail > a > img');
                                                                return elements.map(function(e) {
                                                                return e.getAttribute('src')
                                                                });
                                                });     
                                                for(var i = 0; i<Album.length; i++)
                                                {
                                                        Albumlist = new Object() 
                                                        Albumlist.Album = Album[i]
                                                        Albumlist.href = href[i]
                                                        Albumlist.Artist = Artist[i]
                                                        Albumlist.AlbumDate = AlbumDate[i]
                                                        Albumlist.AlbumType = AlbumType[i]
                                                        Albumlist.Albumimg = Albumimg[i]  
                                                        this.emit('albumarr',Albumlist)
                                                }     
                                                
                                         });
                        }

                         spooky.then(function(){
                                this.emit('end','end')
                        });

                        spooky.run();
                      
                });
                        spooky.on('logs', function (logs) {
                                                console.log(logs)
                                                });
                        spooky.on('albumarr', function (Albumlist) {
                                                config.bugsartistarr.push(Albumlist)
                                                
                                                });
                        spooky.on('end', function (end) {
                                                res.json({success: true, data:config.bugsartistarr});
                                                });     
        },
        bugstrack: function(req, res) {
                config.bugstrack = []
                config.bugsYoutubearr = []
                var albumtrackarr = []
                var url = req.body.href
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
                                 AlbumImg = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > div > ul > li > a > img');
                                                return elements.map(function(e) {
                                                        // return e.innerText
                                                    return e.getAttribute('src')
                                                });
                                  });
                                  Artist = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(1) > td > a');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumType = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(2) > td');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumDate = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(3) > td > time');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumGenre = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(4) > td > a');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumStyle = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(5) > td > a:nth-child(1)');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumCopo = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(6) > td');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  AlbumPlaytime = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.summaryInfo.summaryAlbum > div > div.basicInfo > table > tbody > tr:nth-child(8) > td > time');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  Albumtrackindex = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.contents.track > div > div > table > tbody > tr > td > p.trackIndex > em');
                                                return elements.map(function(e) {
                                                    return e.innerText
                                                });
                                  });
                                  Albumtrack = this.evaluate(function() {
                                                var elements = __utils__.findAll('#container > section.sectionPadding.contents.track > div > div > table > tbody > tr > th > p.title > a ');
                                                return elements.map(function(e) {
                                                    return e.getAttribute('title')
                                                });
                                  });

                                  for(var i = 0; i < AlbumImg.length; i ++)
                                  {
                                        Album = new Object() 
                                        Album.AlbumImg = AlbumImg[i]
                                        Album.Artist = Artist[i]
                                        Album.AlbumType = AlbumType[i]
                                        Album.AlbumDate = AlbumDate[i]
                                        Album.AlbumGenre = AlbumGenre[i]
                                        Album.AlbumStyle = AlbumStyle[i]
                                        Album.AlbumCopo = AlbumCopo[i]
                                        Album.AlbumPlaytime = AlbumPlaytime[i]
                                        Album.Albumtrackindex = Albumtrackindex
                                        Album.Albumtrack = Albumtrack
                                        this.emit('album',Album)       
                                  }
                                
                         });


                         spooky.then(function(){
                                this.emit('end','end')
                        });

                        spooky.run();
                      
                });
                        spooky.on('album', function (Albumlist) {
                                                config.bugstrack.push(Albumlist)
                                                albumtrackarr = Albumlist.Albumtrack
                                        });
                        spooky.on('end', function (end) {
                                                // 아티스트명 한글만추출
                                                var Artist = config.bugstrack[0].Artist.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"")
                                                var count = 0
                                                var tracks = albumtrackarr           
                                                parallelbugs(tracks,Artist,count,res,false)
                                                });     

        },
                PlaylistAdd: function(req, res) {
                          db.playlist.save(req.body, function(){
                                        youtubelist = new Object()
                                        youtubelist.src = req.body.Url
                                        youtubelist.trackName = req.body.track
                                        youtubelist.artist = req.body.Artist
                                        youtubelist.freequencies = [[145, 5000], [145, 5000]]
                                        config.playlist_ADD.push(youtubelist)  
                                        res.json({success: true});
                         });        
            },
                PlaylistDelete: function(req, res) {
                           var id = req.body.id
                           config.playlist_ADD = []
                                 db.playlist.remove({"id": id,"Artist":req.body.Artist,"track":req.body.track},(err, res) => {      
                                                if (err) {
                                                        return console.log(err);
                                                        }
                                        db.playlist.find({"id": id},{ "id" : false}, (err, DBresult) => {
                                                if (err) {
                                                return res.send(err);
                                                        }
                                                result = DBresult
                                                for(var i = 0; i <result.length; i++)
                                                {
                                                        youtubelist = new Object()
                                                        youtubelist.src = result[i].Url
                                                        youtubelist.trackName = result[i].track
                                                        youtubelist.artist = result[i].Artist
                                                        youtubelist.freequencies = [[145, 5000], [145, 5000]]
                                                        youtubelist._id =  result[i].id
                                                        config.playlist_ADD.push(youtubelist)
                                                }
                                        });
                                 });
            },

           PlaylistSearch: function(req, res) {
                         var result = []
                         config.playlist_ADD = []
                        var id = req.body.id
                          db.playlist.find({"id": id},{ "id" : false}, (err, DBresult) => {
                                if (err) {
                                return res.send(err);
                        }
                        result = DBresult
                        parallelbugs(result,'',0,res,true)
                  });
                      
            },
        temp : function(req,res)
          {
                res.json({success: true, tracklist:config.playlist_ADD});
          },
        toMp3 : function(req, res)
          {
                
                var id = req.body.videoURL; // extra param from front end
                var title = 'temp' // extra param from front end
                var url = 'https://www.youtube.com/watch?v=' + id;
                var stream = ytdl(url); //include youtbedl ... var youtubedl = require('ytdl');

                //set response headers
                res.setHeader('Content-disposition', 'attachment; filename=' + title + '.mp3');
                res.setHeader('Content-type', 'audio/mpeg');

                //set stream for conversion
                var proc = new ffmpeg({source: stream});

                //currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
                // proc.setFfmpegPath(ffmpegLocation);
                proc.withAudioCodec('libmp3lame')
                .toFormat('mp3')
                .output(res)
                .run();
                proc.on('end', function() {
                console.log('finished');
                });
        // fs.createWriteStream('rockbye.mp3')
          }    

}
module.exports = functions;
module.exports.randomString = randomString;
module.exports.parallelDJ = parallelDJ;
module.exports.parallelbugs = parallelbugs;
module.exports.convertMp3 = convertMp3;

        // 나중에 
        //   toMp3 : function(req, res)
        //   {
       
        //         var id = req.body.videoURL; // extra param from front end
        //         var url = 'https://www.youtube.com/watch?v=' + id;
        //         try {
        //         youtubeStream(url).pipe(res)
        //         } catch (exception) {
        //         res.status(500).send(exception)
        //         } 
        //   }    

        // foreach 스킵할때 사용 
        // ex 
        // 0: a
        // 0: done
        // 1: b
        // 1: skip
        // 2: c
        // 2: done
        // ALL done

        //     async.forEachOfLimit(users, 1, function(user, index, cb) {

        //     console.log(index + ': ' + user)

        //     async.waterfall([
        //         function(callback) {
        //             callback(null);
        //         },
        //         function(callback) {
        //             // Skip execution of the rest of waterfall method immediately
        //             if(index == 1)
        //                 return callback()

        //             // Some additional code here

        //             callback(null);
        //         }
        //     ], function (err, result) {
        //         console.log(index + ": done")
        //         cb()
        //     });

        // }, function() {
        //     console.log('ALL done')
        // })


         // 2017-03-07 문자열비교값 for문 임시 주석
         // bugstrack spooky end -> spooky youtube
        // for(var i =0; i< result.items.length; i ++)
        // {
        //         //  console.log(result.items[i].snippet.title.search(track))
        //         if(result.items[i].snippet.title.indexOf(track) != -1)
        //         {                                                                                                                        
        //                 youtubelist.videoID =  "https://www.youtube.com/embed/"+result.items[i].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
        //                 //youtubelist.track = result.items[0].snippet.title, null, 1
        //                 youtubelist.count = count++
        //                 youtubelist.tbcell = randomString()
        //                 youtubelist.iframe = randomString()
        //                 youtubelist.videoURL = result.items[i].id.videoId
        //                 youtubelist.tracks = track
        //                 config.bugsYoutubearr.push(youtubelist)
        //                 break;
        //         }
                
        // }

        // 2017-03-11 속도비교 유튜브 다운만 따로 뺀거
        // function parallelbugs(tracks,Artist,count,res,Add) {
        //         var start = new Date().getTime();
        //         var tempplaylist_ADD = []
        //       async.forEachOfLimit(tracks, 1, function(track, index, cb) {
        //                                                                 async.parallel([
        //                                                                         function(callback) {
        //                                                                                         if(!Add == true)
        //                                                                                         {
        //                                                                                                 youTube.addParam("order", 'relevance');
        //                                                                                                 youTube.search(Artist + ' ' + track, 1, function(error, result) {
        //                                                                                                         if (error) {
        //                                                                                                         console.log(error);
        //                                                                                                         }
        //                                                                                                         else {
        //                                                                                                                 callback(null,result.items[0].id.videoId)                                                                                                          
        //                                                                                                         }
        //                                                                                                 });                               
        //                                                                                         }
        //                                                                                         else
        //                                                                                         {
        //                                                                                                 console.log(track.Artist + ' ' + track.track)
        //                                                                                                 youTube.addParam("order", 'relevance');
        //                                                                                                 youTube.search(track.Artist + ' ' + track.track, 1, function(error, result) {
        //                                                                                                         if (error) {
        //                                                                                                         console.log(error);
        //                                                                                                         }
        //                                                                                                         else {
        //                                                                                                                 callback(null,result.items[0].id.videoId)                                                                                                          
        //                                                                                                         }
        //                                                                                                 });  
        //                                                                                         }
                                                                                                                                                    
        //                                                                         }
                                                                                
        //                                                                 ], function (err, result) {
        //                                                                          if(!Add == true)
        //                                                                         {
        //                                                                                 youtubelist = new Object()
        //                                                                                 youtubelist.videoID =  "https://www.youtube.com/embed/"+result+"?enablejsapi=1&theme=light&showinfo=0"
        //                                                                                 youtubelist.count = count++
        //                                                                                 youtubelist.tbcell = randomString()
        //                                                                                 youtubelist.iframe = randomString()
        //                                                                                 youtubelist.videoURL = result
        //                                                                                 //bugsResult albumtitle
        //                                                                                 youtubelist.tracks = track
        //                                                                                 youtubelist.Artist = Artist
        //                                                                                 config.bugsYoutubearr.push(youtubelist)
        //                                                                                 cb()
        //                                                                         }
        //                                                                         else
        //                                                                         {
        //                                                                                 // offliberty.off('https://www.youtube.com/watch?v='+result, function (err, Url) {
        //                                                                                         youtubelist = new Object()
        //                                                                                         youtubelist.result = result
        //                                                                                         // youtubelist.src = Url
        //                                                                                         // //  youtubelist.src = ''
        //                                                                                         // youtubelist.trackName = track.track
        //                                                                                         // youtubelist.artist = track.Artist
        //                                                                                         // youtubelist.freequencies = [[145, 5000], [145, 5000]]
        //                                                                                         tempplaylist_ADD.push(youtubelist)
        //                                                                                         cb()
        //                                                                                 // });
                                                                                      
        //                                                                         }
        //                                                                 });
        //                                                 },
        //                                                 function(err,result) {
        //                                                 // console.log('ALL done')
        //                                                 // console.log('걸린시간 : '+(new Date().getTime() - start));              
        //                                                 if(!Add == true)
        //                                                 res.json({success: true, album : config.bugstrack,tracklist:config.bugsYoutubearr});
        //                                                 else
        //                                                 console.log(tempplaylist_ADD)
        //                                                    async.forEachOfLimit(tempplaylist_ADD, 1, function(youtubeResult, index, cb) {
        //                                                                 async.parallel([
        //                                                                                 function(callback) {
        //                                                                                                         offliberty.off('https://www.youtube.com/watch?v='+youtubeResult.result, function (err, Url) {                                                                                    
        //                                                                                                                  callback(null,Url)        
        //                                                                                                         });

        //                                                                                                 }
        //                                                                                         ], function (err, Url) {
        //                                                                                                                         console.log(Url)
        //                                                                                                                         youtubelist = new Object()
        //                                                                                                                         youtubelist.src = Url[0]
        //                                                                                                                         youtubelist.trackName = ''
        //                                                                                                                         youtubelist.artist = ''
        //                                                                                                                         youtubelist.freequencies = [[145, 5000], [145, 5000]]
        //                                                                                                                         config.playlist_ADD.push(youtubelist)
        //                                                                                                                         cb()                 
        //                                                                                         });
        //                                                                         },
        //                                                                         function() {
        //                                                                                         console.log('ALL done')
        //                                                                                         console.log('걸린시간 : '+(new Date().getTime() - start));                                                     
        //                                                                                         console.log('playlist_ADD 리셋')
        //                                                                                         config.tempplaylist_ADD = []
        //                                                                                         res.json({success: true, tracklist:config.playlist_ADD});
                                                                                                
        //                                                                         })
        //                                                                         // res.json({success: true, tracklist:config.playlist_ADD});
        //                                                 })
        // }