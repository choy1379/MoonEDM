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
var audiograph_service_1 = require('../../service/audiograph.service');
var bugs_service_1 = require('../../service/bugs.service');
var dailyChartsComponent = (function () {
    function dailyChartsComponent(_bugsService, audiograph, store) {
        this._bugsService = _bugsService;
        this.audiograph = audiograph;
        this.store = store;
        this.tracklist = new Array();
        this.state$ = this.store.select('audiograph');
    }
    dailyChartsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 가져온걸 바로 처리해주자...array 받아주자
        var result = this._bugsService.bugsCharts();
        result.subscribe(function (x) {
            _this.tracklist = x;
        });
    };
    dailyChartsComponent.prototype.selectAll = function () {
        for (var i = 0; i < this.tracklist["tracklist"].length; i++) {
            this.tracklist["tracklist"][i].selected = this.selectedAll;
        }
    };
    dailyChartsComponent.prototype.checkIfAllSelected = function () {
        this.selectedAll = this.tracklist.every(function (item) {
            return item.selected == true;
        });
    };
    dailyChartsComponent.prototype.add = function () {
        this.tracklist["tracklist"].forEach(function (element) {
            if (element.selected == true) {
                console.log(element);
            }
        });
    };
    dailyChartsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dailyCharts',
            templateUrl: 'dailyCharts.component.html',
            styleUrls: ['dailyCharts.component.scss'],
            providers: [audiograph_service_1.AudiographService]
        }), 
        __metadata('design:paramtypes', [bugs_service_1.bugsService, audiograph_service_1.AudiographService, store_1.Store])
    ], dailyChartsComponent);
    return dailyChartsComponent;
}());
exports.dailyChartsComponent = dailyChartsComponent;
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}}); 
//# sourceMappingURL=dailycharts.component.js.map