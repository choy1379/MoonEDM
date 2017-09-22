// module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { audiograph } from './service/audiograph.service';
import {tunesplaysearchReducer} from './service/tunesplaysearch.service'
import {bugsReducer} from './service/bugs.service'
import {DJReducer} from'./service/DJ.service'
import {Ng2PaginationModule} from 'ng2-pagination';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {Auth} from './service/auth.service';
// component
import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component';
import {playlistComponent} from './components/playlist/playlist.component';
import {textsearchComponent} from './components/textsearch/textsearch.component'
import {tunesplaylistComponent} from './components/tunesplaylist/tunesplaylist.component'
import {tunesplaysearchComponent} from './components/tunesplaysearch/tunesplaysearch.component'
import {tunesplaysearchResultComponent} from './components/tunesplaysearchResult/tunesplaysearchResult.component'
import {routing} from './app.routing';
import{bugsartistComponent} from './components/bugsartist/bugsartist.component'
import{bugssearchResultComponent} from './components/bugssearchResult/bugssearchResult.component'
import{dailychartsComponent} from './components/dailycharts/dailycharts.component'

@NgModule({
  imports:      [ BrowserModule,routing,HttpModule,FormsModule,ReactiveFormsModule,Ng2PaginationModule,
 StoreModule.provideStore({ audiograph: audiograph,tunesplaysearch:tunesplaysearchReducer,bugs:bugsReducer,DJ:DJReducer})
],
  declarations: [ AppComponent,
                   NavbarComponent,
                   MainPageComponent,
                   trackComponent,
                   DJComponent,
                   textsearchComponent,
                   tunesplaylistComponent,
                   playlistComponent,
                   tunesplaysearchComponent,
                   tunesplaysearchResultComponent,
                   bugsartistComponent,
                   bugssearchResultComponent,
                   dailychartsComponent
                    ],
  providers:[AUTH_PROVIDERS,Auth],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
