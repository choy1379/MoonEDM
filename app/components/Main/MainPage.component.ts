import { Component,OnInit } from '@angular/core';

@Component({
    moduleId:module.id,
    selector: 'MainPage',
    templateUrl: 'MainPage.component.html',
    styleUrls: ['MainPage.component.css']
})
export class MainPageComponent implements OnInit { 
 ngOnInit(){
      document.querySelector('#canvas').setAttribute('style','width:1px')
    }

}
