import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// component
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component'
import {textsearchComponent} from'./components/textsearch/textsearch.component'
<<<<<<< HEAD
import{playlistComponent} from './components/playlist/playlist.component'
import {tunesplaylistComponent} from './components/tunesplaylist/tunesplaylist.component'
=======

>>>>>>> origin/master
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
<<<<<<< HEAD
    },
    {
        path:'tunesplaylist',
        component:tunesplaylistComponent  
=======
>>>>>>> origin/master
    }


];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
