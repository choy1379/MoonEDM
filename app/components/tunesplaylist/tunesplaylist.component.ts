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
     providers:[AudiographService,tunesplaysearchService,searchService]
})

export class tunesplaylistComponent implements OnInit,AfterViewInit { 
 state$ : Observable<any>
constructor(private store: Store<any>,private _tunesplaysearchService:tunesplaysearchService,private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    //audiograph.service.js 에서 state 변경하지않는한 Observable 리턴시  changeState() 값 그대로 리턴
    //만약 변경할 사항있을시 .subscribe 에서 (state: IAudiographState) 처리후 리턴 
    //return Object.assign({}, state, action.payload) -> observable state$
    this.state$ = this.store.select<any>('audiograph')
 }
  
    ngOnInit(){
        var id = 'id=' +  JSON.parse(localStorage.getItem('profile')).nickname
        if (id == null)
        {

        }
        else
        {
          var result = this._searchService.PlaylistSearch(id);
            result.subscribe(x => {
                          console.log(x.tracklist)
                          for(var i = 0; i<x.tracklist.length; i++)
                          {
                            this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: x.tracklist[i] });  
                          } 
          }); 
        }
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
    // document.querySelector('#canvas').setAttribute('style','')
  }
}
