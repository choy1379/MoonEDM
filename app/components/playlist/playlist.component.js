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
var search_service_1 = require('../../service/search.service');
var playlistComponent = (function () {
    function playlistComponent(_searchService, audiograph, store) {
        this._searchService = _searchService;
        this.audiograph = audiograph;
        this.store = store;
        this.volumeLevel = 0;
        this.state$ = this.store.select('audiograph');
    }
    playlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            _this.volumeLevel++;
            if (_this.volumeLevel > 2) {
                _this.volumeLevel = 0;
            }
        }, 100);
    };
    playlistComponent.prototype.remove = function (track) {
        var _this = this;
        try {
            if (track == undefined) {
                var query = {
                    "id": JSON.parse(localStorage.getItem('profile')).nickname,
                    "track": null,
                    "videoURL": null
                };
                var result = this._searchService.PlaylistDelete(query);
                result.subscribe(function (x) {
                    _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: "allremove" });
                });
            }
            else {
                var query = {
                    "id": JSON.parse(localStorage.getItem('profile')).nickname,
                    "track": track.track,
                    "videoURL": track.videoURL
                };
                this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
                var result = this._searchService.PlaylistDelete(query);
                result.subscribe(function (x) {
                });
            }
        }
        finally { }
    };
    playlistComponent.prototype.play = function (index, track) {
        this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index });
    };
    playlistComponent.prototype.search = function (search) {
        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('searchInput');
        if (search.target.value != '') {
            filter = search.target.value;
        }
        else if (typeof filter === 'undefined') {
            filter = '';
        }
        else {
            filter = search;
        }
        ul = document.getElementById("playUL");
        li = ul.getElementsByTagName('li');
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("div")[0];
            if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            }
            else {
                li[i].style.display = "none";
            }
        }
    };
    playlistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'playlist',
            templateUrl: 'playlist.component.html',
            styleUrls: ['playlist.component.scss'],
            providers: [audiograph_service_1.AudiographService]
        }), 
        __metadata('design:paramtypes', [search_service_1.searchService, audiograph_service_1.AudiographService, store_1.Store])
    ], playlistComponent);
    return playlistComponent;
}());
exports.playlistComponent = playlistComponent;
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}}); 
//# sourceMappingURL=playlist.component.js.map