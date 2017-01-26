import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
const appRoutes: Routes = [
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'DJ/:id',
        component:DJComponent
    }
    // {
    //     path:'collect',
    //     component:CollectComponent
    // }
    //  {
    //     path:'collect',
    //     component:searchgridComponent
    // }


];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
