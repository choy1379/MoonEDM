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
        var _this = this;
        this.loading = true;
        var result;
        var query = {
            "videoURL": this.tracklist[0].videoURL
        };
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            var url = x.URL;
            _this.loading = false;
            window.open(url);
            _this.tracklist = x.data;
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
//# sourceMappingURL=track.component.js.map