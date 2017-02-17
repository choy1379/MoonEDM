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
var http_1 = require('@angular/http');
var search_service_1 = require('../../service/search.service');
var textsearchComponent = (function () {
    function textsearchComponent(http, _searchService) {
        this.http = http;
        this._searchService = _searchService;
        this.textlist = new Array();
    }
    textsearchComponent.prototype.ngOnInit = function () {
    };
    textsearchComponent.prototype.textdownloadclick = function (res, event) {
        var _this = this;
        this.loading = true;
        this.textlist = [];
        var tracklist = this.textdownload.split('\n');
        for (var i = 0; i < tracklist.length; i++) {
            if (tracklist[i].length == 0) {
                tracklist.splice(i, 1);
            }
        }
        document.getElementById('textdownload').setAttribute('href', '#downloadlist');
        var result;
        result = this._searchService.textdownload(tracklist);
        result.subscribe(function (x) {
            _this.textlist = x.data;
            _this.loading = false;
        });
    };
    textsearchComponent.prototype.textlistclick = function (res, event) {
        document.getElementById(res.tbcell).style.display = 'inline';
        document.getElementById(res.iframe).setAttribute('src', res.videoID);
    };
    textsearchComponent.prototype.downloadclick = function (res, event) {
        var _this = this;
        this.loading = true;
        var result;
        var query = {
            "videoURL": res.videoURL,
            "videoName": res.track
        };
        result = this._searchService.youtube_dl(query);
        result.subscribe(function (x) {
            _this.loading = false;
            var url = x.URL;
            window.open(url);
        });
    };
    textsearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'textsearch',
            templateUrl: 'textsearch.component.html',
            styleUrls: ['textsearch.component.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http, search_service_1.searchService])
    ], textsearchComponent);
    return textsearchComponent;
}());
exports.textsearchComponent = textsearchComponent;
//# sourceMappingURL=textsearch.component.js.map