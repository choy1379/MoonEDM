// module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter';
// component
import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component';
import {tracklistComponent} from './components/tracklist/tracklist.component';
import {textsearchComponent} from './components/textsearch/textsearch.component'
import {playlistComponent} from './components/playlist/playlist.component'
import {routing} from './app.routing';


@NgModule({
  imports:      [ BrowserModule,routing,HttpModule,FormsModule,ReactiveFormsModule,
 StoreModule.provideStore({ counter: counterReducer })
],
  declarations: [ AppComponent,
                   NavbarComponent,
                   MainPageComponent,
                   trackComponent,
                   DJComponent,
                   textsearchComponent,
                   playlistComponent,
                   tracklistComponent
                    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
