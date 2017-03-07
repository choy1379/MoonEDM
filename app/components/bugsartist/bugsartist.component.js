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
var bugs_service_1 = require('../../service/bugs.service');
var bugsartistComponent = (function () {
    function bugsartistComponent(_bugsService, _searchService, router, http) {
        this._bugsService = _bugsService;
        this._searchService = _searchService;
        this.router = router;
        this.http = http;
    }
    bugsartistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var result;
            _this.Artist = [];
            _this.loading = true;
            _this.playlistModal = true;
            result = _this._bugsService.bugsartist(params);
            result.subscribe(function (x) {
                _this.loading = false;
                _this.Artist = x.data;
                _this._searchService.getDocument('portfolio').style.display = 'inline';
            });
        });
    };
    bugsartistComponent.prototype.imgClick = function (res) {
        var _this = this;
        this.bugs = [];
        this.bugstracks = [];
        this.modalloading = true;
        this._searchService.getDocument(res.Album).setAttribute('href', '#Playlist');
        var result;
        var playList = 'href=' + res.href;
        result = this._bugsService.bugstrack(playList);
        result.subscribe(function (x) {
            _this.modalloading = false;
            x.album[0].Albumtrack.pop();
            _this.bugs = x.album;
            _this.bugstracks = x.tracklist;
        });
    };
    bugsartistComponent.prototype.playlistclick = function (res, event) {
        // 이 부분을 ... dispatch store 로 해결을 할까... 아 일단 내일 보자 
        if (this._searchService.getDocument(res.tbcell).style.display == 'inline') {
            this._searchService.getDocument(res.tbcell).style.display = 'none';
        }
        else {
            this._searchService.getDocument(res.tbcell).style.display = 'inline';
            this._searchService.getDocument(res.iframe).setAttribute('src', res.videoID);
        }
    };
    bugsartistComponent.prototype.downloadclick = function (res, event) {
        var _this = this;
        if (res.tracks == event.path[5].id) {
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
            // var url = x.URL
            _this.downloadloading = false;
            _this._searchService.getDocument(res.tbcell).style.display = 'none';
            // window.open(url)
        });
    };
    bugsartistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bugsartist',
            templateUrl: 'bugsartist.component.html',
            styleUrls: ['bugsartist.component.css'],
            providers: [bugs_service_1.bugsService]
        }), 
        __metadata('design:paramtypes', [bugs_service_1.bugsService, search_service_1.searchService, router_1.ActivatedRoute, http_1.Http])
    ], bugsartistComponent);
    return bugsartistComponent;
}());
exports.bugsartistComponent = bugsartistComponent;
//# sourceMappingURL=bugsartist.component.js.map