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
var audiograph_service_1 = require('../../service/audiograph.service');
var DJComponent = (function () {
    function DJComponent(store, router, http, _searchService) {
        this.store = store;
        this.router = router;
        this.http = http;
        this._searchService = _searchService;
        this.DJlist = new Array();
        this.tempPlaylist = new Array();
    }
    DJComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var result;
            _this.loading = true;
            _this.playlistModal = true;
            result = _this._searchService.searchDJ(params);
            result.subscribe(function (x) {
                _this.loading = false;
                _this.DJlist = x.data;
                _this._searchService.getDocument('portfolio').style.display = 'inline';
            });
        });
    };
    DJComponent.prototype.imgClick = function (res) {
        var _this = this;
        this.tempPlaylist = [];
        this._searchService.getDocument(res.list).setAttribute('href', '#Playlist');
        this.modalloading = true;
        var playList = 'playList=' + res.Detail;
        var result;
        result = this._searchService.searchPlaylist(playList);
        result.subscribe(function (x) {
            _this.tempPlaylist = x.data;
            _this.modalloading = false;
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
        var _this = this;
        var result;
        var Add_track;
        if (res.tracks == event.path[7].id) {
            this.eventid = event.path[7].id;
        }
        var query = {
            "videoURL": res.videoURL
        };
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            var url = x.URL;
            var newTrack = {
                trackName: res.tracks,
                artist: res.Artist,
                src: url,
                frequencies: [[145, 5000], [145, 5000]]
            };
            if (localStorage.getItem('profile') == null) {
                _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
            }
            else {
                var query = {
                    "track": res.track,
                    "Artist": '',
                    "id": JSON.parse(localStorage.getItem('profile')).nickname,
                    "Url": url
                };
                Add_track = _this._searchService.PlaylistAdd(query);
                Add_track.subscribe(function (x) {
                });
            }
        });
    };
    DJComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'DJ',
            templateUrl: 'DJ.component.html',
            styleUrls: ['DJ.component.css']
        }), 
        __metadata('design:paramtypes', [store_1.Store, router_1.ActivatedRoute, http_1.Http, search_service_1.searchService])
    ], DJComponent);
    return DJComponent;
}());
exports.DJComponent = DJComponent;
//# sourceMappingURL=DJ.component.js.map