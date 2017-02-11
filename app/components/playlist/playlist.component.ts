import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET,TOGGLE_MENU } from '../../audiograph.service';

declare var $audiograph: any

@Component({
    moduleId:module.id,
    selector: 'playlist',
    templateUrl: 'playlist.component.html',
    styleUrls: ['playlist.component.css']
})

export class playlistComponent implements OnInit,AfterViewInit { 
 counter: Observable<any>;
 
constructor(private store: Store<any>,private router:ActivatedRoute,private http:Http,private _searchService: searchService){
        this.counter = store.select('counter'); 
    }
      increment(){
        this.store.dispatch({ type: INCREMENT });
    }

    decrement(){
        this.store.dispatch({ type: DECREMENT });
    }

    toggleMenu(){
        this.store.dispatch({ type: TOGGLE_MENU });
    }


}
