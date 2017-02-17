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
require('rxjs/add/operator/map');
var store_1 = require('@ngrx/store');
var CATEGORY = 'tunesplaysearch';
var initialState = {
    results: [],
    showResults: false
};
exports.tunesplaysearch_ACTIONS = {
    RESULTS_CHANGE: "[" + CATEGORY + "] RESULTS_CHANGE",
    RESULTS_HIDE: "[" + CATEGORY + "] RESULTS_HIDE"
};
exports.tunesplaysearchReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var changeState = function () {
        return Object.assign({}, state, action.payload);
    };
    switch (action.type) {
        case exports.tunesplaysearch_ACTIONS.RESULTS_CHANGE:
            action.payload.showResults = true;
            return changeState();
        case exports.tunesplaysearch_ACTIONS.RESULTS_HIDE:
            action.payload = { showResults: false };
            return changeState();
        default:
            return state;
    }
    ;
};
/**
 * ngrx end --
 */
var tunesplaysearchService = (function () {
    function tunesplaysearchService(store) {
        this.store = store;
        this.state$ = store.select('tunesplaysearch');
        console.log(this.state$);
    }
    tunesplaysearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [store_1.Store])
    ], tunesplaysearchService);
    return tunesplaysearchService;
}());
exports.tunesplaysearchService = tunesplaysearchService;
//# sourceMappingURL=tunesplaysearch.service.js.map