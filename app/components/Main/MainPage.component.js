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
var auth_service_1 = require('../../service/auth.service');
var MainPageComponent = (function () {
    function MainPageComponent(auth) {
        this.auth = auth;
    }
    MainPageComponent.prototype.ngOnInit = function () {
        //   document.querySelector('#canvas').setAttribute('style','opacity:0')
        // 0을 설정해주면 width , height 값이 초기화되버린다 이걸 추가를 하는방향으로 잡아야될거같음 
    };
    MainPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'MainPage',
            templateUrl: 'MainPage.component.html',
            styleUrls: ['MainPage.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], MainPageComponent);
    return MainPageComponent;
}());
exports.MainPageComponent = MainPageComponent;
//# sourceMappingURL=MainPage.component.js.map