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
var search_service_1 = require('../../service/search.service');
var tunesplaysearch_service_1 = require('../../service/tunesplaysearch.service');
var tunesplaysearchComponent = (function () {
    function tunesplaysearchComponent(store, _searchService) {
        this.store = store;
        this._searchService = _searchService;
    }
    tunesplaysearchComponent.prototype.search = function (value) {
        var _this = this;
        var result;
        var res = 'track=' + value;
        result = this._searchService.youtube_dl_multiple(res);
        result.subscribe(function (x) {
            _this.store.dispatch({ type: tunesplaysearch_service_1.tunesplaysearch_ACTIONS.RESULTS_CHANGE, payload: { results: x.data } });
        });
    };
    tunesplaysearchComponent = __decorate([
        core_1.Component({
            selector: 'tunesplaysearch',
            templateUrl: './app/components/tunesplaysearch/tunesplaysearch.component.html',
            styleUrls: ['./app/components/tunesplaysearch/tunesplaysearch.component.scss'],
        }), 
        __metadata('design:paramtypes', [store_1.Store, search_service_1.searchService])
    ], tunesplaysearchComponent);
    return tunesplaysearchComponent;
}());
exports.tunesplaysearchComponent = tunesplaysearchComponent;
//# sourceMappingURL=tunesplaysearch.component.js.map