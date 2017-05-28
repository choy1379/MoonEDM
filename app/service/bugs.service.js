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
var store_1 = require('@ngrx/store');
var CATEGORY = 'bugs';
var initialState = {
    results: [],
    showResults: false,
    modalloading: false,
    downloading: false,
    IMG_LOADING: true,
    ArtistLoading: true,
};
exports.bugs_ACTIONS = {
    RESULTS_CHANGE: "[" + CATEGORY + "] RESULTS_CHANGE",
    RESULTS_HIDE: "[" + CATEGORY + "] RESULTS_HIDE",
    IMG_RESULTS: "[" + CATEGORY + "] IMG_RESULTS",
    IMG_LOADING: "[" + CATEGORY + "] IMG_LOADING",
    IMG_DOWNLOADING: "[" + CATEGORY + "] IMG_DOWNLOADING",
    ARTIST_LOADING: "[" + CATEGORY + "] ARTIST_LOADING"
};
exports.bugsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var changeState = function () {
        return Object.assign({}, state, action.payload);
    };
    switch (action.type) {
        case exports.bugs_ACTIONS.RESULTS_CHANGE:
            action.payload.showResults = true;
            return changeState();
        case exports.bugs_ACTIONS.RESULTS_HIDE:
            action.payload = { showResults: false };
        case exports.bugs_ACTIONS.ARTIST_LOADING:
            if (typeof action.payload === 'undefined') {
                action.payload = { ArtistLoading: true };
            }
            else {
                action.payload = { ArtistLoading: false };
            }
            return changeState();
        case exports.bugs_ACTIONS.IMG_RESULTS:
            state = action.payload.results;
            action.payload = { modalloading: false };
            return changeState();
        case exports.bugs_ACTIONS.IMG_LOADING:
            state = [];
            action.payload = { modalloading: true };
            return changeState();
        case exports.bugs_ACTIONS.IMG_DOWNLOADING:
            if (typeof action.payload === 'undefined') {
                action.payload = { downloading: true };
            }
            else {
                action.payload = { downloading: false };
            }
            return changeState();
        default:
            return state;
    }
    ;
};
/**
 * ngrx end --
 */
var bugsService = (function () {
    function bugsService(_http, store) {
        this._http = _http;
        this.store = store;
    }
    bugsService.prototype.bugsartist = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/bugsartist', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    bugsService.prototype.bugstrack = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/bugstrack', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    bugsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, store_1.Store])
    ], bugsService);
    return bugsService;
}());
exports.bugsService = bugsService;
//# sourceMappingURL=bugs.service.js.map