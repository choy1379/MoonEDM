import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
const ss = require('node_modules/socket.io-stream/socket.io-stream.js')

@Component({
    moduleId:module.id,
    selector: 'track',
    templateUrl: 'track.component.html',
    styleUrls: ['track.component.css']
})

export class trackComponent implements OnInit { 
tracklist = new Array();


constructor(  private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    
    }
      loading: boolean;
      ngOnInit(){
        var result : any
        this.tracklist = []
        this.router.params.subscribe((params) => {
            result = this._searchService.youtube_dl_one(params);
            result.subscribe(x => {
                 this.tracklist = x.data
                 document.getElementById('tracklistframe').setAttribute('src',this.tracklist[0].videoID)
            });
        });
    }

    downloadclick(event:any)
    {
               this.loading = true 

            var query = {
                         "videoURL" : this.tracklist[0].videoURL
                        }
    
              var socket = io.connect('http://localhost:8000/stream');
              var stream = ss.createStream();

            ss(socket).emit('PlayTrack', stream, {result: query});

            ss(socket).on('result', function(data) {
                data = data || {};

                var type = data.type;
                var payload = data.payload;

                var ms = new MediaSource();
                var url = URL.createObjectURL(ms);

                var audio = new Audio()
                audio.src = url;
                audio.play()
                  ms.addEventListener('sourceopen', callback, false);
                    ms.addEventListener('sourceended', function(e) {
                        console.log('mediaSource readyState: ' + this.readyState);
                    }, false);
                 function callback() {
                                        // 재생하려는 영상 소스를 추가한다.
                                        var sourceBuffer = ms.addSourceBuffer('audio/mpeg;');
                                        
                                        sourceBuffer.addEventListener('updatestart', function (e) {
                                        });

                                        sourceBuffer.addEventListener('update', function () {
                                        }, false);

                                        sourceBuffer.addEventListener('updateend', function (e) {

                                        });

                                        sourceBuffer.addEventListener('error', function (e) {
                                            console.log('error: ' + ms.readyState);
                                        });
                                        sourceBuffer.addEventListener('abort', function (e) {
                                            // console.log('abort: ' + ms.readyState);
                                        });

                                        payload.stream.on('data', function (data) {
                                            sourceBuffer.appendBuffer(data);
                                        });
                                          // 데이터 전송이 완료되었을 경우 발생한다.
                                        payload.stream.on('end', function () {
                                            console.log('endOfStream call');
                                            // 스트림을 종료한다.
                                            ms.endOfStream();
                                        });
                                    }
            });
    }
    
    
}
        // this.loading = true 
        //     var headers = new Headers(); 
        //         var query = {
        //                     "videoURL" : this.tracklist[0].videoURL
        //                     }
        //         headers.append('Content-Type', 'application/json');
        //         this.http.post('http://localhost:4100/youtube_dl',query,{headers: headers}).subscribe((res) => {
        //             var url = res.json().URL
        //             this.loading = false
        //             console.log(url)
        //             window.open(url)
        //         });

        // 나중에 
        //   this.loading = true 
        //    var headers = new Headers(); 
        //     var query = {
        //                  "videoURL" : this.tracklist[0].videoURL
        //                 }
        //     headers.append('Content-Type', 'application/json');
        //     this.http.post('http://localhost:4100/toMp3',query,{headers: headers}).subscribe((res) => {
        //         console.log(res)
        //     });

                //      data = data || {};

                // var type = data.type;
                // var payload = data.payload;

                // console.log(payload.stream); // 내려받은 stream 데이터

                // var ms = new MediaSource();
                // var url = URL.createObjectURL(ms);
                // var audio = new Audio()
                // audio.src = url;
                
                //  ms.addEventListener('sourceopen', callback, false);

                //  function callback() {
                //                         // 재생하려는 영상 소스를 추가한다.
                //                         var sourceBuffer = ms.addSourceBuffer('audio/mpeg;');
                //                         // var sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp8,vorbis"');

                //                         sourceBuffer.addEventListener('updatestart', function (e) {
                //                             // console.log('updatestart: ' + ms.readyState);
                //                         });

                //                         sourceBuffer.addEventListener('update', function () {
                //                             // console.log('update: ' + ms.readyState);
                //                         }, false);

                //                         sourceBuffer.addEventListener('updateend', function (e) {
                //                             console.log('updateend: ' + ms.readyState);
                //                         });
                //                         sourceBuffer.addEventListener('error', function (e) {
                //                             console.log('error: ' + ms.readyState);
                //                         });
                //                         sourceBuffer.addEventListener('abort', function (e) {
                //                             console.log('abort: ' + ms.readyState);
                //                         });

                //                         payload.stream.on('data', function (data) {

                //                             // chunk data
                //                             console.log(data);

                //                             // 버퍼에 내려받은 스트림 데이터를 할당한다.
                //                             sourceBuffer.appendBuffer(payload.stream);

                //                         });

                //                         // 데이터 전송이 완료되었을 경우 발생한다.
                //                         payload.stream.on('end', function () {
                //                             console.log('endOfStream call');
                //                             // 스트림을 종료한다.
                //                             ms.endOfStream();
                //                         });
                //                     }