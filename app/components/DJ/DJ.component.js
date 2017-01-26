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
var DJComponent = (function () {
    function DJComponent(router, http) {
        this.router = router;
        this.http = http;
    }
    DJComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.params.subscribe(function (params) {
            console.log(params);
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post('http://localhost:4100/searchDJ', params, { headers: headers }).subscribe(function (res) {
                console.log(res);
            });
        });
    };
    DJComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'DJ',
            templateUrl: 'DJ.component.html',
            styleUrls: ['DJ.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
    ], DJComponent);
    return DJComponent;
}());
exports.DJComponent = DJComponent;
//# sourceMappingURL=DJ.component.js.map