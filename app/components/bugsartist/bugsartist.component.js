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
var bugs_service_1 = require('../../service/bugs.service');
var bugssearchResult_component_1 = require('../bugssearchResult/bugssearchResult.component');
var bugsartistComponent = (function () {
    function bugsartistComponent(store, _bugssearchResultComponent, _bugsService, _searchService, router, http) {
        this.store = store;
        this._bugssearchResultComponent = _bugssearchResultComponent;
        this._bugsService = _bugsService;
        this._searchService = _searchService;
        this.router = router;
        this.http = http;
    }
    bugsartistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            var result;
            _this.Artist = [];
            _this.loading = true;
            _this.playlistModal = true;
            result = _this._bugsService.bugsartist(params);
            result.subscribe(function (x) {
                _this.loading = false;
                _this.Artist = x.data;
                _this._searchService.getDocument('portfolio').style.display = 'inline';
            });
        });
    };
    bugsartistComponent.prototype.imgClick = function (res) {
        var _this = this;
        this.bugsAlbum = [];
        this.bugstracks = [];
        this._searchService.getDocument(res.Album).setAttribute('href', '#Playlist');
        this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_LOADING });
        var result;
        var playList = 'href=' + res.href;
        result = this._bugsService.bugstrack(playList);
        result.subscribe(function (x) {
            _this.store.dispatch({ type: bugs_service_1.bugs_ACTIONS.IMG_RESULTS, payload: { results: x } });
        });
    };
    bugsartistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bugsartist',
            templateUrl: 'bugsartist.component.html',
            styleUrls: ['bugsartist.component.css'],
            providers: [bugs_service_1.bugsService, bugssearchResult_component_1.bugssearchResultComponent]
        }), 
        __metadata('design:paramtypes', [store_1.Store, bugssearchResult_component_1.bugssearchResultComponent, bugs_service_1.bugsService, search_service_1.searchService, router_1.ActivatedRoute, http_1.Http])
    ], bugsartistComponent);
    return bugsartistComponent;
}());
exports.bugsartistComponent = bugsartistComponent;
//# sourceMappingURL=bugsartist.component.js.map