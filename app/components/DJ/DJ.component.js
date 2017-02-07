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
var DJComponent = (function () {
    function DJComponent(router, http) {
        this.router = router;
        this.http = http;
        this.DJlist = new Array();
        this.tempPlaylist = new Array();
    }
    DJComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            _this.loading = true;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post('https://moonedm.herokuapp.com/searchDJ', params, { headers: headers }).subscribe(function (res) {
                _this.loading = false;
                _this.DJlist = res.json().data;
                document.getElementById("portfolio").style.display = 'inline';
            });
        });
    };
    DJComponent.prototype.imgClick = function (res) {
        var _this = this;
        this.tempPlaylist = [];
        document.getElementById(res.list).setAttribute('href', '#Playlist');
        this.loading = true;
        var headers = new http_1.Headers();
        var playList = 'playList=' + res.Detail;
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        this.http.post('https://moonedm.herokuapp.com/searchPlaylist', playList, { headers: headers }).subscribe(function (res) {
            _this.tempPlaylist = res.json().data;
            _this.loading = false;
            console.log(_this.tempPlaylist);
        });
    };
    DJComponent.prototype.playlistclick = function (res, event) {
        document.getElementById(res.tbcell).style.display = 'inline';
        document.getElementById(res.iframe).setAttribute('src', res.videoID);
    };
    DJComponent.prototype.downloadclick = function (res, event) {
        var _this = this;
        console.log(res.videoURL);
        this.loading = true;
        var headers = new http_1.Headers();
        var query = {
            "videoURL": res.videoURL,
            "videoName": res.track
        };
        headers.append('Content-Type', 'application/json');
        this.http.post('https://moonedm.herokuapp.com/youtube_dl', query, { headers: headers }).subscribe(function (res) {
            _this.loading = false;
            var url = res.json().URL;
            console.log(url);
            window.open(url);
        });
    };
    DJComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'DJ',
            templateUrl: 'DJ.component.html',
            styleUrls: ['DJ.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
    ], DJComponent);
    return DJComponent;
}());
exports.DJComponent = DJComponent;
//# sourceMappingURL=DJ.component.js.map