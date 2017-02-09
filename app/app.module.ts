// module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
// component
import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {trackComponent} from './components/track/track.component';
import {textsearchComponent} from './components/textsearch/textsearch.component'
import {routing} from './app.routing';


@NgModule({
  imports:      [ BrowserModule,routing,HttpModule,FormsModule,ReactiveFormsModule ],
  declarations: [ AppComponent,
                   NavbarComponent,
                   MainPageComponent,
                   trackComponent,
                   DJComponent,
                   textsearchComponent
                    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
