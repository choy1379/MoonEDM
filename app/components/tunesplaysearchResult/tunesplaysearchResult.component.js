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
var store_1 = require('@ngrx/store');
var search_service_1 = require('../../service/search.service');
var tunesplaysearch_service_1 = require('../../service/tunesplaysearch.service');
var audiograph_service_1 = require('../../service/audiograph.service');
var tunesplaysearchResultComponent = (function () {
    function tunesplaysearchResultComponent(store, _searchService, _tunesplaysearchService) {
        this.store = store;
        this._searchService = _searchService;
        this._tunesplaysearchService = _tunesplaysearchService;
        //tunesplaysearchReducer 
        //changestate()
        //return Object.assign({}, state, action.payload) -> observable state$
        this.state$ = this.store.select('tunesplaysearch');
    }
    tunesplaysearchResultComponent.prototype.add = function (track, playbtn) {
        var _this = this;
        //offliberty get mp3
        var result;
        var query = {
            "videoURL": track.videoURL
        };
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            var url = x.URL;
            var newTrack = {
                trackName: track.track,
                artist: '',
                src: url,
                frequencies: [[145, 5000], [145, 5000]]
            };
            _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
            // display successfully added message
            if (playbtn) {
                playbtn.setAttribute('data-hint', 'Added');
                playbtn.setAttribute('class', 'play-btn hint--left hint--always');
                setTimeout(function () {
                    playbtn.setAttribute('class', 'play-btn hint--left');
                    setTimeout(function () {
                        playbtn.setAttribute('data-hint', 'Add to Playlist');
                    }, 800);
                }, 1500);
            }
        });
    };
    tunesplaysearchResultComponent.prototype.close = function () {
        this.store.dispatch({ type: tunesplaysearch_service_1.tunesplaysearch_ACTIONS.RESULTS_HIDE });
    };
    tunesplaysearchResultComponent = __decorate([
        core_1.Component({
            selector: 'tunesplaysearchResult',
            templateUrl: './app/components/tunesplaysearchResult/tunesplaysearchResult.component.html',
            styleUrls: ['./app/components/tunesplaysearchResult/tunesplaysearchResult.component.scss'],
        }), 
        __metadata('design:paramtypes', [store_1.Store, search_service_1.searchService, tunesplaysearch_service_1.tunesplaysearchService])
    ], tunesplaysearchResultComponent);
    return tunesplaysearchResultComponent;
}());
exports.tunesplaysearchResultComponent = tunesplaysearchResultComponent;
//# sourceMappingURL=tunesplaysearchResult.component.js.map