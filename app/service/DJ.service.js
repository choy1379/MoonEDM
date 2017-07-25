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
var CATEGORY = 'DJ';
var initialState = {
    results: [],
    toggle: false,
    mainLoading: false,
    modalLoading: false,
    modalPlaylist: false,
    downloadLoading: false,
    playlistAdd: false
};
exports.DJ_ACTIONS = {
    TOGGLE_CHK: "[" + CATEGORY + "] TOGGLE_CHK",
    MAIN_LOADING: "[" + CATEGORY + "] MAIN_LOADING",
    MODAL_LOADING: "[" + CATEGORY + "] MODAL_LOADING",
    MODAL_Playlist: "[" + CATEGORY + "] MODAL_Playlist",
    DOWNLOAD_LOADING: "[" + CATEGORY + "] DOWNLOAD_LOADING",
    PLAYLIST_ADD: "[" + CATEGORY + "] PLAYLIST_ADD"
};
exports.DJReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var changeState = function () {
        return Object.assign({}, state, action.payload);
    };
    switch (action.type) {
        // 마지막에 작업 
        case exports.DJ_ACTIONS.TOGGLE_CHK:
            action.payload.toggle = true;
            return changeState();
        case exports.DJ_ACTIONS.MODAL_LOADING:
            if (typeof action.payload === 'undefined') {
                action.payload = { modalLoading: true };
            }
            else {
                action.payload = { modalLoading: false };
            }
            return changeState();
        case exports.DJ_ACTIONS.MAIN_LOADING:
            if (typeof action.payload === 'undefined') {
                action.payload = { mainLoading: true, modalPlaylist: true };
            }
            else {
                action.payload = { mainLoading: false };
            }
            return changeState();
        case exports.DJ_ACTIONS.PLAYLIST_ADD:
            if (typeof action.payload === 'undefined') {
                action.payload = { playlistAdd: false };
            }
            else {
                action.payload = { playlistAdd: true };
            }
            return changeState();
        default:
            return state;
    }
    ;
};
var DJService = (function () {
    function DJService(_http, store) {
        this._http = _http;
        this.store = store;
    }
    DJService.prototype.searchDJ = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/searchDJ', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DJService.prototype.searchPlaylist = function (params) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/searchPlaylist', params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DJService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, store_1.Store])
    ], DJService);
    return DJService;
}());
exports.DJService = DJService;
// http://localhost:4100/
// https://moonedm.herokuapp.com/ 
//# sourceMappingURL=DJ.service.js.map