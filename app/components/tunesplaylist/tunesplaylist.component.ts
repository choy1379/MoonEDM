import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';
import {tunesplaysearchService} from '../../service/tunesplaysearch.service'

declare var $audiograph: any

@Component({
    moduleId:module.id,
    selector: 'tunesplaylist',
    templateUrl: 'tunesplaylist.component.html',
    styleUrls: ['tunesplaylist.component.scss'],
     providers:[AudiographService,tunesplaysearchService]
})

export class tunesplaylistComponent implements OnInit,AfterViewInit { 
 state$ : Observable<any>
constructor(private store: Store<any>,private _tunesplaysearchService:tunesplaysearchService,private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    //audiograph.service.js -> reduce(value)  -> return
    this.state$ = this.store.select<any>('audiograph')
 }
  
    ngOnInit(){
    }

    toggleMenu(){
        this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TOGGLE_MENU });
    }
     togglePlay() {
         this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TOGGLE_PLAY });
    }


    public controlTrack(direction: number) {
    // let type = direction > 0 ? AUDIOGRAPH_ACTIONS.NEXT_TRACK : AUDIOGRAPH_ACTIONS.PREV_TRACK;
    // this.store.dispatch({ type });
    if (direction > 0) {
      $audiograph.playNext();
    } else {
      $audiograph.playPrevious();
    }
  }
  ngAfterViewInit() {
    document.querySelector('#canvas').setAttribute('style','')
  }
}
