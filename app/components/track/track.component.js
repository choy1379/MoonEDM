"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var search_service_1 = require('../../service/search.service');
var ss = require('node_modules/socket.io-stream/socket.io-stream.js');
var trackComponent = (function () {
    function trackComponent(router, http, _searchService) {
        this.router = router;
        this.http = http;
        this._searchService = _searchService;
        this.tracklist = new Array();
    }
    trackComponent.prototype.ngOnInit = function () {
        var _this = this;
        var result;
        this.tracklist = [];
        this.router.params.subscribe(function (params) {
            result = _this._searchService.youtube_dl_one(params);
            result.subscribe(function (x) {
                _this.tracklist = x.data;
                document.getElementById('tracklistframe').setAttribute('src', _this.tracklist[0].videoID);
            });
        });
    };
    trackComponent.prototype.downloadclick = function (event) {
        this.loading = true;
        var query = {
            "videoURL": this.tracklist[0].videoURL
        };
        var socket = io.connect('http://localhost:8000/stream');
        var stream = ss.createStream();
        ss(socket).emit('test', stream, { result: query });
        ss(socket).on('result', function (data) {
            data = data || {};
            var type = data.type;
            var payload = data.payload;
            var ms = new MediaSource();
            var url = URL.createObjectURL(ms);
            var audio = new Audio();
            audio.src = url;
            audio.play();
            ms.addEventListener('sourceopen', callback, false);
            ms.addEventListener('sourceended', function (e) {
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
    };
    trackComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'track',
            templateUrl: 'track.component.html',
            styleUrls: ['track.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, search_service_1.searchService])
    ], trackComponent);
    return trackComponent;
}());
exports.trackComponent = trackComponent;
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
//# sourceMappingURL=track.component.js.map