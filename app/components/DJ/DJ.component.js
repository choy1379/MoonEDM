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
var store_1 = require('@ngrx/store');
var search_service_1 = require('../../service/search.service');
var DJ_service_1 = require('../../service/DJ.service');
var DJComponent = (function () {
    function DJComponent(store, router, http, _searchService, _DJService) {
        this.store = store;
        this.router = router;
        this.http = http;
        this._searchService = _searchService;
        this._DJService = _DJService;
        this.DJlist = new Array();
        this.tempPlaylist = new Array();
        this.state$ = this.store.select('DJ');
    }
    DJComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var result;
            _this.loadingInit();
            _this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.MAIN_LOADING });
            result = _this._DJService.searchDJ(params);
            result.subscribe(function (x) {
                _this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.MAIN_LOADING, payload: 'false' });
                _this.DJlist = x.data;
                _this._searchService.getDocument('portfolio').style.display = 'inline';
            });
        });
    };
    DJComponent.prototype.imgClick = function (res) {
        var _this = this;
        this.tempPlaylist = [];
        this._searchService.getDocument(res.list).setAttribute('href', '#Playlist');
        this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.MODAL_LOADING });
        var playList = 'playList=' + res.Detail;
        var result;
        result = this._DJService.searchPlaylist(playList);
        result.subscribe(function (x) {
            _this.tempPlaylist = x.data;
            _this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.MODAL_LOADING, payload: 'false' });
            if (localStorage.getItem('profile') == null) {
                _this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.PLAYLIST_ADD });
            }
            else {
                _this.store.dispatch({ type: DJ_service_1.DJ_ACTIONS.PLAYLIST_ADD, payload: 'true' });
            }
        });
    };
    DJComponent.prototype.playlistclick = function (res, event) {
        if (this._searchService.getDocument(res.tbcell).style.display == 'inline') {
            this._searchService.getDocument(res.tbcell).style.display = 'none';
        }
        else {
            this._searchService.getDocument(res.tbcell).style.display = 'inline';
            this._searchService.getDocument(res.iframe).setAttribute('src', res.videoID);
        }
    };
    DJComponent.prototype.downloadclick = function (res, event) {
        var _this = this;
        if (res.track == event.path[5].id) {
            this.eventid = event.path[5].id;
            this.downloadloading = true;
        }
        var query = {
            "videoURL": res.videoURL,
            "videoName": res.track
        };
        var result;
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            var url = x.URL;
            _this.downloadloading = false;
            window.open(url);
        });
    };
    DJComponent.prototype.playlistAdd = function (res, event) {
        var result;
        var Add_track;
        if (res.tracks == event.path[7].id) {
            this.eventid = event.path[7].id;
        }
        var newTrack = {
            track: res.tracks,
            artist: res.Artist,
            videoURL: res.videoURL,
            albumImg: res.albumImg,
            frequencies: [[145, 5000], [145, 5000]]
        };
        var query = {
            "track": res.track,
            "Artist": '',
            "AlbumImg": res.albumImg,
            "id": JSON.parse(localStorage.getItem('profile')).nickname,
            "videoURL": res.videoURL
        };
        Add_track = this._searchService.PlaylistAdd(query);
        Add_track.subscribe(function (x) {
        });
    };
    DJComponent.prototype.loadingInit = function () {
        this.tempPlaylist = [];
        this.DJlist = [];
        this._searchService.getDocument('portfolio').style.display = 'none';
    };
    DJComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'DJ',
            templateUrl: 'DJ.component.html',
            styleUrls: ['DJ.component.css'],
            providers: [DJ_service_1.DJService]
        }), 
        __metadata('design:paramtypes', [store_1.Store, router_1.ActivatedRoute, http_1.Http, search_service_1.searchService, DJ_service_1.DJService])
    ], DJComponent);
    return DJComponent;
}());
exports.DJComponent = DJComponent;
//# sourceMappingURL=DJ.component.js.map