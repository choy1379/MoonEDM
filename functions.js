var request = require('request');
var config = require('./config');
var express = require('express');
var router = express.Router();
var YouTube = require('youtube-node');
var ytdl = require('ytdl-core');

var fs = require('fs');
var youtubeStream = require('youtube-audio-stream')
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
                                //마지막 데이터 짤림방지
                                config.Playlistarr.push('dummy')
                                var count = 0
                                var async = require('async')
                                var users = config.Playlistarr
                                // console.log(users)

                                async.forEachOfLimit(users, 1, function(user, index, cb) {
                                        // console.log(index + ': ' + user)
                                                async.waterfall([
                                                        function(callback) {
                                                                setTimeout(function() {
                                                                        var youTube = new YouTube();

                                                                        youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');

                                                                        youTube.search(user, 1, function(error, result) {
                                                                                if (error) {
                                                                                console.log(error);
                                                                                }
                                                                                else {
                                                                                youtubelist = new Object()
                                                                                // youtubelist.videoID = result.items[0].id.videoId, null, 1
                                                                                youtubelist.videoID =  "http://www.youtube.com/embed/"+result.items[0].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
                                                                                youtubelist.track = result.items[0].snippet.title, null, 1
                                                                                youtubelist.count = count++
                                                                                youtubelist.tbcell = randomString()
                                                                                youtubelist.iframe = randomString()
                                                                                youtubelist.videoURL = result.items[0].id.videoId
                                                                                config.Youtubearr.push(youtubelist)
                                                                                }
                                                                        });
                                        
                                                                        callback(null);
                                                                        }, 500);
                                                        }
                                                        
                                                ], function (err, result) {
                                                        // console.log(index + ": done")
                                                        cb()
                                                });
                                 },
                                 function() {
                                console.log('ALL done')
                                res.json({success: true, data:config.Youtubearr});
                                // console.log(config.Youtubearr)
                                })

                        });    
                      
                });
          },
          youtube_dl : function(req,res)
          {
                var offliberty = require('offliberty');
                var videoURL = req.body.videoURL 
                console.log('Requesting...');
                offliberty.off('http://www.youtube.com/watch?v='+videoURL, function (err, downloadUrl) {
                console.log(err || downloadUrl);
                res.json({success: true, URL:downloadUrl});
                });
       
          },
        youtube_dl_one : function(req,res)
        {
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

                        config.youtubedl_one = []
                        var youTube = new YouTube();

                        youTube.setKey('AIzaSyB2QPeJGn6xo9rrjjzZrk9OT33aO-Ubzxo');

                        youTube.search(req.body.id, 1, function(error, result) {
                        if (error) {
                                console.log(error);
                        }
                        else {
                                youtubelist = new Object()
                                youtubelist.videoID =  "http://www.youtube.com/embed/"+result.items[0].id.videoId+"?enablejsapi=1&theme=light&showinfo=0"
                                youtubelist.track = result.items[0].snippet.title, null, 1
                                youtubelist.videoURL = result.items[0].id.videoId
                                youtubelist.tbcell = randomString()
                                youtubelist.iframe = randomString()
                                config.youtubedl_one.push(youtubelist)
                                res.json({success: true, data:config.youtubedl_one});
                             }
                        });
          }
   
        }
module.exports = functions;

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


        // youtube mp4 다운 
        // stream = ytdl(url, {quality: 'highest'});

        // stream.on('info', function (info, data) {
        


        // res.writeHead(200, {
        //         'Content-disposition': 'attachment; filename=' + 'asd.mp4',
        //         'Content-Type': 'video/mp4'
        // });

        // console.log('Downloading ' + 'test' + 'asd.mp4');
        
        // stream.pipe(res);

        // req.on('close', function (chunk) {
        //         console.log('request cancelled');
        //         stream.unpipe(res);
        //         stream.end();
        //         res.end();
        // });

        // stream.on('data', function (chunk) {
        //         console.log('got %d bytes of data', chunk.length);
        // });


        // stream.on('end', function () {
        //         console.log('stream ended');
        //         res.end();
        // });
        // });