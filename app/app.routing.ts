import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// component
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component'
import {textsearchComponent} from'./components/textsearch/textsearch.component'
import{playlistComponent} from './components/playlist/playlist.component'

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
    },
     {
        path:'textsearch',
        component:textsearchComponent
    },
    {
        path:'playlist',
        component:playlistComponent  
    }


];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
