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
var CATEGORY = 'Audiograph';
var audio = new Audio();
var selectedTracks = shuffle([
    {
        trackName: 'no way',
        artist: 'wizcalifa',
        src: '',
        frequencies: [[60, 4000], [20, 5000]],
        playing: false,
        active: false
    },
    {
        trackName: 'Strong Look (Codec Remix)',
        artist: 'Jett',
        src: '',
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
    playing: true
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
    NEXT_TRACK: "[" + CATEGORY + "] NEXT_TRACK",
    PREV_TRACK: "[" + CATEGORY + "] PREV_TRACK",
    TARGET_TRACK: "[" + CATEGORY + "] TARGET_TRACK"
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
    var changeTrack = function (direction, index) {
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
        state.playlist[currentTrackIndex].active = true;
        state.playlist[currentTrackIndex].playing = true;
        audio.src = state.playlist[currentTrackIndex].src;
        console.log("Track change: " + state.playlist[currentTrackIndex].trackName);
        audio.pause();
        action.payload = { playlist: state.playlist.slice(), playing: true };
    };
    switch (action.type) {
        case exports.AUDIOGRAPH_ACTIONS.ADD_TRACK:
            action.payload = { playlist: state.playlist.concat([action.payload]) };
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.REMOVE_TRACK:
            action.payload = {
                playlist: state.playlist.filter(function (item) {
                    return item.src != action.payload.src;
                })
            };
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TOGGLE_MENU:
            if (typeof action.payload === 'undefined') {
                action.payload = { menuOpen: !state.menuOpen };
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TOGGLE_PLAY:
            if (typeof action.payload === 'undefined') {
                action.payload = { playing: !state.playing };
            }
            if (action.payload.playing) {
                $audiograph.play();
            }
            else {
                $audiograph.pause();
            }
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.NEXT_TRACK:
            changeTrack(1);
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.PREV_TRACK:
            changeTrack(-1);
            return changeState();
        case exports.AUDIOGRAPH_ACTIONS.TARGET_TRACK:
            $audiograph.playIndex(action.payload);
            changeTrack(0, action.payload);
            return changeState();
        default:
            return state;
    }
};
var AudiographService = (function () {
    function AudiographService(store) {
        var _this = this;
        this.store = store;
        this.playlist = [];
        this._init = false;
        this.state$ = store.select('audiograph');
        //audiographReducer -> changestate() -> .subscribe()
        // state <- IAudiographState
        this.state$.subscribe(function (state) {
            if (typeof state.playing !== 'undefined') {
                console.log("Toggling playback: " + state.playing);
                if (state.playing == true) {
                    audio.play();
                }
                else {
                    audio.pause();
                }
            }
            // since $audiograph needs same instance, don't lose reference
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
        $audiograph.addListener('newPalette', function (palette) {
            console.log('Audiograph: the palette has been changed to - Background color = ' +
                palette.backgroundColor + ', Foreground colors = ' + palette.foregroundColors);
        });
    };
    AudiographService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
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
//# sourceMappingURL=audiograph.service.js.map