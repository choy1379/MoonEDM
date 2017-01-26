// module
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
// component
import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainPageComponent} from './components/Main/MainPage.component';
import {DJComponent} from './components/DJ/DJ.component';
import {routing} from './app.routing';


@NgModule({
  imports:      [ BrowserModule,routing,HttpModule ],
  declarations: [ AppComponent,
                   NavbarComponent,
                   MainPageComponent,
                   DJComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
