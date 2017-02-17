// module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
<<<<<<< HEAD
import { StoreModule } from '@ngrx/store';
import { audiograph } from './service/audiograph.service';
import {tunesplaysearchReducer} from './service/tunesplaysearch.service'
<<<<<<< HEAD
=======
=======
>>>>>>> origin/master
>>>>>>> master
// component
import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
import {playlistComponent} from './components/playlist/playlist.component';
import {textsearchComponent} from './components/textsearch/textsearch.component'
import {tunesplaylistComponent} from './components/tunesplaylist/tunesplaylist.component'
import {tunesplaysearchComponent} from './components/tunesplaysearch/tunesplaysearch.component'
import {tunesplaysearchResultComponent} from './components/tunesplaysearchResult/tunesplaysearchResult.component'
<<<<<<< HEAD
=======
=======
import {textsearchComponent} from './components/textsearch/textsearch.component'
>>>>>>> origin/master
>>>>>>> master
import {routing} from './app.routing';


@NgModule({
<<<<<<< HEAD
  imports:      [ BrowserModule,routing,HttpModule,FormsModule,ReactiveFormsModule,
 StoreModule.provideStore({ audiograph: audiograph,tunesplaysearch:tunesplaysearchReducer })
],
=======
  imports:      [ BrowserModule,routing,HttpModule,FormsModule,ReactiveFormsModule ],
>>>>>>> origin/master
  declarations: [ AppComponent,
                   NavbarComponent,
                   MainPageComponent,
                   trackComponent,
                   DJComponent,
<<<<<<< HEAD
                   textsearchComponent,
                   tunesplaylistComponent,
                   playlistComponent,
                   tunesplaysearchComponent,
                   tunesplaysearchResultComponent
<<<<<<< HEAD
=======
=======
                   textsearchComponent
>>>>>>> origin/master
>>>>>>> master
                    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
