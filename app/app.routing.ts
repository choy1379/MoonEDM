import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// component
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component'
const appRoutes: Routes = [
    {
        path:'',
        component:MainPageComponent
    },
    {
        path:'DJ/:id',
        component:DJComponent
    },
    {
        path:'tracklist/:id',
        component:trackComponent
    }
    //  {
    //     path:'collect',
    //     component:searchgridComponent
    // }


];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
