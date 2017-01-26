"use strict";
var router_1 = require('@angular/router');
var MainPage_component_1 = require('./components/Main/MainPage.component');
var DJ_component_1 = require('./components/DJ/DJ.component');
var appRoutes = [
    {
        path: '',
        component: MainPage_component_1.MainPageComponent
    },
    {
        path: 'DJ/:id',
        component: DJ_component_1.DJComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map