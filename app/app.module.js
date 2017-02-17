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
// module
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var store_1 = require('@ngrx/store');
var audiograph_service_1 = require('./service/audiograph.service');
var tunesplaysearch_service_1 = require('./service/tunesplaysearch.service');
// component
var app_component_1 = require('./app.component');
var navbar_component_1 = require('./components/navbar/navbar.component');
var MainPage_component_1 = require('./components/Main/MainPage.component');
var DJ_component_1 = require('./components/DJ/DJ.component');
var track_component_1 = require('./components/track/track.component');
<<<<<<< HEAD
var playlist_component_1 = require('./components/playlist/playlist.component');
var textsearch_component_1 = require('./components/textsearch/textsearch.component');
var tunesplaylist_component_1 = require('./components/tunesplaylist/tunesplaylist.component');
var tunesplaysearch_component_1 = require('./components/tunesplaysearch/tunesplaysearch.component');
var tunesplaysearchResult_component_1 = require('./components/tunesplaysearchResult/tunesplaysearchResult.component');
=======
var textsearch_component_1 = require('./components/textsearch/textsearch.component');
>>>>>>> origin/master
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
<<<<<<< HEAD
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule,
                store_1.StoreModule.provideStore({ audiograph: audiograph_service_1.audiograph, tunesplaysearch: tunesplaysearch_service_1.tunesplaysearchReducer })
            ],
=======
            imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
>>>>>>> origin/master
            declarations: [app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                MainPage_component_1.MainPageComponent,
                track_component_1.trackComponent,
                DJ_component_1.DJComponent,
<<<<<<< HEAD
                textsearch_component_1.textsearchComponent,
                tunesplaylist_component_1.tunesplaylistComponent,
                playlist_component_1.playlistComponent,
                tunesplaysearch_component_1.tunesplaysearchComponent,
                tunesplaysearchResult_component_1.tunesplaysearchResultComponent
=======
                textsearch_component_1.textsearchComponent
>>>>>>> origin/master
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map