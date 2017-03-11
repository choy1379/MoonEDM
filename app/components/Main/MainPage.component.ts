import { Component,OnInit } from '@angular/core';
import {Auth} from '../../service/auth.service';

@Component({
    moduleId:module.id,
    selector: 'MainPage',
    templateUrl: 'MainPage.component.html',
    styleUrls: ['MainPage.component.css']
})
export class MainPageComponent implements OnInit { 
    constructor(private auth: Auth){
    }
 ngOnInit(){
      document.querySelector('#canvas').setAttribute('style','width:1px')
    }

}
