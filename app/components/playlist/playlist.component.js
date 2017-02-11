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
var store_1 = require('@ngrx/store');
var audiograph_service_1 = require('../../audiograph.service');
var playlistComponent = (function () {
    function playlistComponent(store, router, http, _searchService) {
        this.store = store;
        this.router = router;
        this.http = http;
        this._searchService = _searchService;
        this.counter = store.select('counter');
    }
    playlistComponent.prototype.increment = function () {
        this.store.dispatch({ type: audiograph_service_1.INCREMENT });
    };
    playlistComponent.prototype.decrement = function () {
        this.store.dispatch({ type: audiograph_service_1.DECREMENT });
    };
    playlistComponent.prototype.toggleMenu = function () {
        this.store.dispatch({ type: audiograph_service_1.TOGGLE_MENU });
    };
    playlistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'playlist',
            templateUrl: 'playlist.component.html',
            styleUrls: ['playlist.component.css']
        }), 
        __metadata('design:paramtypes', [store_1.Store, router_1.ActivatedRoute, http_1.Http, search_service_1.searchService])
    ], playlistComponent);
    return playlistComponent;
}());
exports.playlistComponent = playlistComponent;
//# sourceMappingURL=playlist.component.js.map