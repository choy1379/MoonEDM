"use strict";
var router_1 = require('@angular/router');
// component
var MainPage_component_1 = require('./components/Main/MainPage.component');
var DJ_component_1 = require('./components/DJ/DJ.component');
var track_component_1 = require('./components/track/track.component');
var textsearch_component_1 = require('./components/textsearch/textsearch.component');
var tunesplaylist_component_1 = require('./components/tunesplaylist/tunesplaylist.component');
var appRoutes = [
    {
        path: '',
        component: MainPage_component_1.MainPageComponent
    },
    {
        path: 'DJ/:id',
        component: DJ_component_1.DJComponent
    },
    {
        path: 'tracklist/:id',
        component: track_component_1.trackComponent
    },
    {
        path: 'textsearch',
        component: textsearch_component_1.textsearchComponent
    },
    {
        path: 'tunesplaylist',
        component: tunesplaylist_component_1.tunesplaylistComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map