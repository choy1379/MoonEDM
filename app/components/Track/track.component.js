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
var trackComponent = (function () {
    function trackComponent(router, http) {
        this.router = router;
        this.http = http;
        this.tracklist = new Array();
    }
    trackComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tracklist = [];
        this.router.params.subscribe(function (params) {
            // this.loading = true 
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post('http://localhost:4100/youtube_dl_one', params, { headers: headers }).subscribe(function (res) {
                //track ,videoURL
                _this.tracklist = res.json().data;
                console.log(_this.tracklist[0].iframe);
                document.getElementById('tracklistframe').setAttribute('src', _this.tracklist[0].videoID);
                //  document.getElementById('trackframe').setAttribute('src',this.tracklist[0].videoID);
            });
        });
    };
    trackComponent.prototype.downloadclick = function (event) {
        //   this.loading = true 
        var headers = new http_1.Headers();
        var query = {
            "videoURL": this.tracklist[0].videoURL
        };
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:4100/toMp3', query, { headers: headers }).subscribe(function (res) {
            console.log(res);
            // var url = res.json().URL
            //  this.loading = false
            // console.log(url)
            // window.open(url)
        });
        //  this.loading = true 
        //        var headers = new Headers(); 
        //         var query = {
        //                      "videoURL" : this.tracklist[0].videoURL
        //                     }
        //         headers.append('Content-Type', 'application/json');
        //         this.http.post('http://localhost:4100/youtube_dl',query,{headers: headers}).subscribe((res) => {
        //             var url = res.json().URL
        //              this.loading = false
        //             console.log(url)
        //             window.open(url)
        //         });
    };
    trackComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'track',
            templateUrl: 'track.component.html',
            styleUrls: ['track.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
    ], trackComponent);
    return trackComponent;
}());
exports.trackComponent = trackComponent;
//# sourceMappingURL=track.component.js.map