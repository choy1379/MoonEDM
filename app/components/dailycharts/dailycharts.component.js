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
var audiograph_service_1 = require('../../service/audiograph.service');
var bugs_service_1 = require('../../service/bugs.service');
var auth_service_1 = require('../../service/auth.service');
var dailychartsComponent = (function () {
    function dailychartsComponent(_bugsService, store, _auth) {
        this._bugsService = _bugsService;
        this.store = store;
        this._auth = _auth;
        this.tracklist = new Array();
        this.state$ = this.store.select('audiograph');
    }
    dailychartsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //..
        var result = this._bugsService.bugsCharts();
        result.subscribe(function (x) {
            var sortingField = "Rank";
            x.tracklist.sort(function (a, b) {
                return a[sortingField] - b[sortingField];
            });
            _this.tracklist = x;
        });
    };
    dailychartsComponent.prototype.selectAll = function () {
        for (var i = 0; i < this.tracklist["tracklist"].length; i++) {
            this.tracklist["tracklist"][i].selected = this.selectedAll;
        }
    };
    dailychartsComponent.prototype.checkIfAllSelected = function () {
        this.selectedAll = this.tracklist.every(function (item) {
            return item.selected == true;
        });
    };
    dailychartsComponent.prototype.add = function () {
        var _this = this;
        var album = new Array();
        this.tracklist["tracklist"].forEach(function (element) {
            if (element.selected == true) {
                var albumObj = new Object();
                albumObj['albumtitle'] = element.albumTitle;
                albumObj['artist'] = element.artist;
                albumObj['albumImg'] = element.albumImg; //50짜리 500으로 정규식변환..?
                albumObj['id'] = JSON.parse(localStorage.getItem('profile')).nickname;
                album.push(albumObj);
            }
        });
        var addtrackList = this._bugsService.addtrackList(album);
        addtrackList.subscribe(function (x) {
            console.log(x);
            // 0801 ~ 내일작업 플레이리스트 추가하면됨 
            for (var i = 0; i < x.data.length; i++) {
                var newTrack = {
                    track: x.data[i].track,
                    artist: x.data[i].Artist,
                    albumImg: x.data[i].AlbumImg,
                    videoURL: x.data[i].videoURL,
                    frequencies: [[300, 4000], [605, 5000]]
                };
                _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
            }
        });
    };
    dailychartsComponent.prototype.selected = function (event) {
        if (event.selected == true) {
            event.selected = false;
        }
        else {
            event.selected = true;
        }
    };
    dailychartsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dailycharts',
            templateUrl: 'dailycharts.component.html',
            styleUrls: ['dailycharts.component.scss'],
            providers: [audiograph_service_1.AudiographService]
        }), 
        __metadata('design:paramtypes', [bugs_service_1.bugsService, store_1.Store, auth_service_1.Auth])
    ], dailychartsComponent);
    return dailychartsComponent;
}());
exports.dailychartsComponent = dailychartsComponent;
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}}); 
//# sourceMappingURL=dailycharts.component.js.map