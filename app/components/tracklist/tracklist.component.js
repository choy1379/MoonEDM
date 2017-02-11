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
var tracklistComponent = (function () {
    function tracklistComponent(store) {
        this.store = store;
    }
    tracklistComponent.prototype.ngOnInit = function () {
    };
    tracklistComponent.prototype.remove = function (track) {
        this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
    };
    tracklistComponent.prototype.play = function (index) {
        this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index });
    };
    tracklistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tracklist',
            templateUrl: 'tracklist.component.html',
            styleUrls: ['tracklist.component.scss']
        }), 
        __metadata('design:paramtypes', [store_1.Store])
    ], tracklistComponent);
    return tracklistComponent;
}());
exports.tracklistComponent = tracklistComponent;
//# sourceMappingURL=tracklist.component.js.map