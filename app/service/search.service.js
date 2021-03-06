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
require('rxjs/add/operator/map');
var searchService = (function () {
    function searchService(_http) {
        this._http = _http;
    }
    searchService.prototype.youtube_dl_one = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/youtube_dl_one', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.youtube_dl = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/youtube_dl', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.textdownload = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/textdownload', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.youtube_dl_multiple = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/youtube_dl_multiple', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.PlaylistAdd = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/PlaylistAdd', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.PlaylistSearch = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/PlaylistSearch', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.temp = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/temp', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    searchService.prototype.PlaylistDelete = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/PlaylistDelete', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //common function get document.getElementById
    searchService.prototype.getDocument = function (element) {
        return document.getElementById(element);
    };
    searchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], searchService);
    return searchService;
}());
exports.searchService = searchService;
// https://moonedm.herokuapp.com/
// http://localhost:4100/ 
//# sourceMappingURL=search.service.js.map