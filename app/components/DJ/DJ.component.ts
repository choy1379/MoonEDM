import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';

@Component({
    moduleId:module.id,
    selector: 'DJ',
    templateUrl: 'DJ.component.html',
    styleUrls: ['DJ.component.css']
})
export class DJComponent implements OnInit{ 

constructor(
        private router:ActivatedRoute,private http:Http){
  
    }

      ngOnInit(){
        this.router.params.subscribe((params) => {
            console.log(params)
            var headers = new Headers(); 
            headers.append('Content-Type', 'application/json');
            this.http.post('http://localhost:4100/searchDJ',params,{headers: headers}).subscribe((res) => {
                 console.log(res)
                });
        });
    }
}
