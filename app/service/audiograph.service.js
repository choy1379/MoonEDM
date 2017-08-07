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
var store_1 = require('@ngrx/store');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var search_service_1 = require('../service/search.service');
var ss = require('node_modules/socket.io-stream/socket.io-stream.js');
var CATEGORY = 'Audiograph';
var audio = new Audio();
audio.controls = true;
var selectedTracks = shuffle([
    {
        trackName: '',
        artist: '',
        albumImg: '',
        videoURL: '',
        frequencies: [[60, 4000], [20, 5000]],
        playing: false,
        active: false
    }
]);
// first one from randomized playlist starts playing
selectedTracks[0].playing = true;
selectedTracks[0].active = true;
var initialState = {
    playlist: selectedTracks,
    menuOpen: false,
    chartsOpen: false,
    playing: true,
    random: false
};
window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 39) {
        $audiograph.playNext();
    }
});
window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 37) {
        $audiograph.playPrevious();
    }
});
exports.AUDIOGRAPH_ACTIONS = {
    ADD_TRACK: "[" + CATEGORY + "] ADD_TRACK",
    REMOVE_TRACK: "[" + CATEGORY + "] REMOVE_TRACK",
    TOGGLE_MENU: "[" + CATEGORY + "] TOGGLE_MENU",
    TOGGLE_PLAY: "[" + CATEGORY + "] TOGGLE_PLAY",
    TOGGLE_CHARTS: "[" + CATEGORY + "] TOGGLE_CHARTS",
    NEXT_TRACK: "[" + CATEGORY + "] NEXT_TRACK",
    PREV_TRACK: "[" + CATEGORY + "] PREV_TRACK",
    TARGET_TRACK: "[" + CATEGORY + "] TARGET_TRACK",
    VOLUME_CONTROL: "[" + CATEGORY + "] VOLUME_CONTROL",
    RANDOM_TRACK: "[" + CATEGORY + "] RANDOM_TRACK",
    CURRENT_CLICK: "[" + CATEGORY + "] CURRENT_CLICK"
};
exports.audiograph = function (state, action) {
    if (state === void 0) { state = initialState; }
    var changeState = function () {
        return Object.assign({}, state, action.payload);
    };
    // resets playing states of all tracks in playlist and returns index of what the currently active track was
    var resetPlaying = function () {
        var currentTrackIndex = 0;
        for (var i = 0; i < state.playlist.length; i++) {
            if (state.playlist[i].active) {
                currentTrackIndex = i;
            }
            state.playlist[i].playing = false;
        }
        return currentTrackIndex;
    };
    var changeTrack = function (direction, index, random) {
        var currentTrackIndex = resetPlaying();
        state.playlist[currentTrackIndex].active = false;
        if (typeof index !== 'undefined') {
            currentTrackIndex = index;
        }
        else {
            if (direction > 0) {
                currentTrackIndex++;
            }
            else {
                currentTrackIndex--;
            }
        }
        if (currentTrackIndex === state.playlist.length) {
            // back to beginning
            currentTrackIndex = 0;
        }
        else if (currentTrackIndex < 0) {
            // go to the end (looping back in reverse)
            currentTrackIndex = state.playlist.length - 1;
        }
        //random 0724
        if (random == true) {
            for (var k = 0; k < direction; k++) {
                currentTrackIndex++;
            }
        }
        state.playlist[currentTrackIndex].active = true;
        state.playlist[currentTrackIndex].playing = true;
        //socket stream
        var socket = io.connect('http://localhost:4100/stream');
        var stream = ss.createStream();
        ss(socket).emit('PlayTrack', stream, { track: state.playlist[currentTrackIndex].videoURL });
        ss(socket).on('result', function (data) {
            var type = data.type;
            var payload = data.payload;
            var ms = new MediaSource();
            var url = URL.createObjectURL(ms);
            getAlbumart(state.playlist[currentTrackIndex].AlbumImg);
            audio.load();
            audio.src = url;
            ms.addEventListener('sourceopen', callback, false);
            ms.addEventListener('sourceended', function (e) {
                console.log('mediaSource readystate: ' + this.readystate);
            }, false);
            function callback() {
                var sourceBuffer = ms.addSourceBuffer('audio/mpeg');
                // sourceBuffer.appendWindowEnd = 4.0;
                sourceBuffer.addEventListener('abort', function (e) {
                    console.log('abort: ' + ms.readyState);
                    ms.endOfStream();
                    socket.close();
                });
                payload.stream.on('data', function (data) {
                    sourceBuffer.appendBuffer(data);
                });
                // 데이터 전송이 완료되었을 경우 발생한다.
                payload.stream.on('end', function () {
                    console.log('endOfStream call');
                    ms.endOfStream();
                    socket.close();
                });
            }
        });
        console.log("Track change: " + state.playlist[currentTrackIndex].trackName);
        action.payload = { playlist: state.playlist.slice(), playing: true };
    };
    switch (action.type) {
        case exports.AUDIOGRAPH_ACTIONS.ADD_TRACK:
            action.payload = { playlist: state.playlist.concat([action.payload]) };
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.REMOVE_TRACK:
            action.payload = {
                playlist: state.playlist.filter(function (item) {
                    return item.videoURL != action.payload.videoURL; //이거도 교체함 src -> videoURL
                })
            };
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TOGGLE_MENU:
            if (typeof action.payload === 'undefined') {
                if (state.chartsOpen == true) {
                    action.payload = { menuOpen: !state.menuOpen, chartsOpen: false };
                }
                else {
                    action.payload = { menuOpen: !state.menuOpen };
                }
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TOGGLE_CHARTS:
            if (typeof action.payload === 'undefined') {
                action.payload = { chartsOpen: !state.chartsOpen };
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TOGGLE_PLAY:
            if (typeof action.payload === 'undefined') {
                action.payload = { playing: !state.playing };
            }
            if (action.payload.playing) {
                $audiograph.play();
                if (audio.paused == true)
                    audio.play();
                else
                    audio.load();
            }
            else {
                $audiograph.pause();
                audio.pause();
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.RANDOM_TRACK:
            if (state.random == true)
                state.random = false;
            else
                state.random = true;
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.NEXT_TRACK:
            if (state.random == true) {
                var random = generateRandom(0, state.playlist.length);
                changeTrack(random, 0, true);
            }
            else {
                changeTrack(1);
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.PREV_TRACK:
            changeTrack(-1);
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TARGET_TRACK:
            $audiograph.playIndex(action.payload);
            changeTrack(0, action.payload);
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.VOLUME_CONTROL:
            var maxVolume = 1;
            if (action.payload.bool == 'minus') {
                var volume = audio.volume + action.payload.volume;
                if (audio.volume <= 0) {
                    document.getElementById('volumetext').innerHTML = String(audio.volume);
                }
                else {
                    audio.volume = volume;
                    document.getElementById('volumetext').innerHTML = String(audio.volume);
                }
            }
            else {
                var volume = audio.volume + action.payload.volume;
                if (volume <= maxVolume)
                    audio.volume = volume;
                document.getElementById('volumetext').innerHTML = String(audio.volume);
            }
            return state;
        case exports.AUDIOGRAPH_ACTIONS.CURRENT_CLICK:
            var currentTime = action.payload.currentLeft / action.payload.currentOff * audio.duration;
            audio.currentTime = currentTime;
            return state;
        default:
            return state;
    }
};
var AudiographService = (function () {
    function AudiographService(_searchService, _http, store) {
        var _this = this;
        this._searchService = _searchService;
        this._http = _http;
        this.store = store;
        this.playlist = [];
        this._init = false;
        this.state$ = store.select('audiograph');
        //audiographReducer -> changestate() -> .subscribe()
        // state <- IAudiographState
        audio.onended = function () {
            $audiograph.playNext();
        };
        audio.ontimeupdate = function () {
            var duration = audio.duration;
            var currentTime = audio.currentTime;
            var dsec;
            var dmin;
            var csec;
            var cmin;
            dsec = Math.floor(duration);
            dmin = Math.floor(dsec / 60);
            dmin = dmin >= 10 ? dmin : '0' + dmin;
            dsec = Math.floor(dsec % 60);
            dsec = dsec >= 10 ? dsec : '0' + dsec;
            csec = Math.floor(currentTime);
            cmin = Math.floor(csec / 60);
            cmin = cmin >= 10 ? cmin : '0' + cmin;
            csec = Math.floor(csec % 60);
            csec = csec >= 10 ? csec : '0' + csec;
            var remain = currentTime / duration * 100;
            if (dsec == "0NaN" && dmin == Infinity) {
                dsec = "loading";
                dmin = "";
            }
            document.querySelector('body > my-app > div > div > tunesplaylist > div.player-c > div.player-timeline > div.bar.bar--elapsed').setAttribute('style', 'width :' + remain + '%');
            document.querySelector('body > my-app > div > div > tunesplaylist > div.player-c > div.player-timeline > div.bar.bar--buffered.bar--animated').setAttribute('style', 'width :100%');
            document.getElementById('tracktime').innerHTML = cmin + ':' + csec + ' / ' + dmin + ':' + dsec;
        };
        audio.oncanplaythrough = function () {
            audio.play();
        };
        this.state$.subscribe(function (state) {
            if (typeof state.playing !== 'undefined') {
                console.log("Toggling playback: " + state.playing);
            }
            _this.playlist.length = 0;
            for (var _i = 0, _a = state.playlist; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.playlist.push(item);
            }
            if (!_this._init) {
                _this._init = true;
                _this.init();
            }
        });
    }
    AudiographService.prototype.init = function () {
        var _this = this;
        $audiograph.init(this.playlist);
        $audiograph.addListener('playNext', function () {
            _this.store.dispatch({ type: exports.AUDIOGRAPH_ACTIONS.NEXT_TRACK });
            // console.log('Audiograph: playNext() function called!');
        });
        $audiograph.addListener('playPrevious', function () {
            _this.store.dispatch({ type: exports.AUDIOGRAPH_ACTIONS.PREV_TRACK });
            // console.log('Audiograph: playPrevious() function called!');
        });
        $audiograph.addListener('playIndex', function (index) {
            // console.log('Audiograph: playIndex() function called with index "' + index + '"!');
        });
        $audiograph.addListener('pause', function () {
            // console.log('Audiograph: pause() function called!');
        });
        $audiograph.addListener('play', function () {
            // console.log('Audiograph: play() function called!');
        });
        // $audiograph.addListener('random', () => {
        //   this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.RANDOM_TRACK });
        // });
        $audiograph.addListener('newPalette', function (palette) {
            console.log('Audiograph: the palette has been changed to - Background color = ' +
                palette.backgroundColor + ', Foreground colors = ' + palette.foregroundColors);
        });
    };
    AudiographService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [search_service_1.searchService, http_1.Http, store_1.Store])
    ], AudiographService);
    return AudiographService;
}());
exports.AudiographService = AudiographService;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function getAlbumart(url) {
    var getImage = document.querySelector('.intro-2');
    //  getImage.innerHTML = '<img src="'+url+'" style="width: 480px;height: 360px;border-bottom-left-radius: 30px 30px;border-bottom-right-radius: 30px 30px;border-top-left-radius: 50px 50px;border-top-right-radius: 50px 50px;opacity: 0.9;">'
    getImage.innerHTML = '<img src="' + url + '" style="width: 60%;height: 60%;border-bottom-left-radius: 30px 30px;border-bottom-right-radius: 30px 30px;border-top-left-radius: 50px 50px;border-top-right-radius: 50px 50px;opacity: 0.9;">';
}
function generateRandom(min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}
//# sourceMappingURL=audiograph.service.js.map