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
var search_service_1 = require('../../service/search.service');
var auth_service_1 = require('../../service/auth.service');
var NavbarComponent = (function () {
    function NavbarComponent(_searchService, auth) {
        this._searchService = _searchService;
        this.auth = auth;
        this.List = [{ 'name': 'DJ' }, { 'name': 'tracklist' }, { 'name': 'Artist' }];
        this.selectedList = this.List[0];
        this.selected = '';
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this._searchService.getDocument('temp').style.marginTop = "7px";
        this._searchService.getDocument('temp').style.width = "30%";
        this._searchService.getDocument('tempad').style.marginTop = "7px";
        this._searchService.getDocument('select').style.marginTop = "7px";
        document.querySelector('#canvas').setAttribute('style', 'width:1px');
    };
    NavbarComponent.prototype.search = function (event) {
        if (this.selected == "tracklist") {
            $('#temptracklist')[0].click();
        }
        else if (this.selected == 'Artist') {
            //artist 클릭
            $('#tempArtist')[0].click();
        }
        else {
            $('#tempad')[0].click();
        }
    };
    NavbarComponent.prototype.onClick = function (event) {
        if (this.selected == "tracklist") {
            $('#temptracklist')[0].click();
        }
        else if (this.selected == 'Artist') {
            //artist 클릭
            $('#tempArtist')[0].click();
        }
        else {
            $('#tempad')[0].click();
        }
    };
    NavbarComponent.prototype.onChange = function (event) {
        this.selected = event.name;
    };
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navbar',
            templateUrl: 'navbar.component.html',
            styleUrls: ['navbar.component.scss']
        }), 
        __metadata('design:paramtypes', [search_service_1.searchService, auth_service_1.Auth])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map