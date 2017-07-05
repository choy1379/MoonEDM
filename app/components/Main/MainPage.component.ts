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
    //   document.querySelector('#canvas').setAttribute('style','opacity:0')
    // 0을 설정해주면 width , height 값이 초기화되버린다 이걸 추가를 하는방향으로 잡아야될거같음 
    }

}
