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
var bugs_service_1 = require('../../service/bugs.service');
var audiograph_service_1 = require('../../service/audiograph.service');
var bugssearchResultComponent = (function () {
    function bugssearchResultComponent(store, _bugsService, _searchService, router, http) {
        this.store = store;
        this._bugsService = _bugsService;
        this._searchService = _searchService;
        this.router = router;
        this.http = http;
        this.state$ = this.store.select('bugs');
    }
    bugssearchResultComponent.prototype.playlistclick = function (res, event) {
        if (this._searchService.getDocument(res.tbcell).style.display == 'inline') {
            this._searchService.getDocument(res.tbcell).style.display = 'none';
        }
        else {
            this._searchService.getDocument(res.tbcell).style.display = 'inline';
            this._searchService.getDocument(res.iframe).setAttribute('src', res.videoID);
        }
    };
    bugssearchResultComponent.prototype.downloadclick = function (res, event) {
        var _this = this;
        this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_DOWNLOADING });
        if (res.tracks == event.path[6].id) {
            this.eventid = event.path[6].id;
        }
        var result;
        var query = {
            "videoURL": res.videoURL[0]
        };
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            var url = x.URL;
            window.open(url);
            _this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_DOWNLOADING, payload: 'false' });
        });
    };
    bugssearchResultComponent.prototype.playlistAdd = function (res, event) {
        var result;
        var Add_track;
        this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_DOWNLOADING });
        if (res.tracks == event.path[6].id) {
            this.eventid = event.path[6].id;
        }
        var newTrack = {
            trackName: res.tracks,
            artist: res.Artist,
            videoURL: res.videoURL[0],
            frequencies: [[145, 5000], [145, 5000]]
        };
        this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_DOWNLOADING, payload: 'false' });
        if (localStorage.getItem('profile') == null) {
            this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
        }
        else {
            var query = {
                "track": res.tracks,
                "Artist": res.Artist,
                "id": JSON.parse(localStorage.getItem('profile')).nickname,
                "videoURL": res.videoURL[0]
            };
            Add_track = this._searchService.PlaylistAdd(query);
            // AUDIOGRAPH_ACTIONS.ADD_TRACK 을 하지않는 이유는 oninit 시 디비에서 값가져오기때문..
            Add_track.subscribe(function (x) {
            });
        }
    };
    bugssearchResultComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bugssearchResult',
            templateUrl: 'bugssearchResult.component.html',
            styleUrls: ['bugssearchResult.component.css'],
            providers: [bugs_service_1.bugsService]
        }), 
        __metadata('design:paramtypes', [store_1.Store, bugs_service_1.bugsService, search_service_1.searchService, router_1.ActivatedRoute, http_1.Http])
    ], bugssearchResultComponent);
    return bugssearchResultComponent;
}());
exports.bugssearchResultComponent = bugssearchResultComponent;
// var result : any
//           var Add_track : any
//          this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING});
//           if(res.tracks == event.path[6].id)
//           {
//              this.eventid = event.path[6].id
//           }
//           var query = {
//                         "videoURL" : res.videoURL[0]
//                       }
//           result = this._searchService.youtube_dl(query);
//           result.subscribe(x => {
//               var url = x.URL
//               let newTrack: IPlaylistTrack = {
//                 trackName: res.tracks,
//                 artist: res.Artist,
//                 src: url,
//                 frequencies: [[145, 5000], [145, 5000]]
//               };
//               this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING , payload : 'false'});
//               if(localStorage.getItem('profile') ==  null){
//               this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
//               }
//               else
//               {
//                   var query = {
//                         "track" : res.tracks,
//                         "Artist" : res.Artist,
//                         "id" : JSON.parse(localStorage.getItem('profile')).nickname,
//                         "Url" : url
//                       }
//                     Add_track = this._searchService.PlaylistAdd(query)
//                     Add_track.subscribe(x => {
//                   });
//               }
//         });  
//# sourceMappingURL=bugssearchResult.component.js.map