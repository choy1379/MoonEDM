import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';
import {tunesplaysearchService} from '../../service/tunesplaysearch.service'
import {bugsService} from '../../service/bugs.service';

declare var $audiograph: any

@Component({
    moduleId:module.id,
    selector: 'tunesplaylist',
    templateUrl: 'tunesplaylist.component.html',
    styleUrls: ['tunesplaylist.component.scss'],
     providers:[bugsService,AudiographService,tunesplaysearchService,searchService]
})

export class tunesplaylistComponent implements OnInit,AfterViewInit { 
 state$ : Observable<any>
 audio : any
click:boolean = false;
constructor(private store: Store<any>,private _tunesplaysearchService:tunesplaysearchService,private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    //audiograph.service.js 에서 state 변경하지않는한 Observable 리턴시  changeState() 값 그대로 리턴
    //만약 변경할 사항있을시 .subscribe 에서 (state: IAudiographState) 처리후 리턴 
    //return Object.assign({}, state, action.payload) -> observable state$
    this.state$ = this.store.select<any>('audiograph')
 }
    ngOnInit(){

      this.init()

      if(localStorage.getItem('track') == null)
      {
        if(localStorage.getItem('profile') ==  null)
          {
          }
          else
          {
            var id = 'id=' +  JSON.parse(localStorage.getItem('profile')).nickname
            var result = this._searchService.PlaylistSearch(id);
              result.subscribe(x => {
                            var query = {  "videoURL" : ''  }
                            this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: query });                      
                            for(var i = 0; i<x.tracklist.length; i++)
                            {
                              this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: x.tracklist[i] }); 
                              localStorage.setItem('track',x.tracklist[0].track);
                            } 
            }); 
          }
      }
      else
      {
            //로그인을 한후 다시 플레이리스트에 들어올시 목록을 DB 에서 받지않고 config.playlist_ADD 환경변수값을 가져와 처리한다.
             var result = this._searchService.temp();
              result.subscribe(x => {
                            var query = {  "videoURL" : ''  }
                            this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: query });
                       
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
    toggleCharts(){
       this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TOGGLE_CHARTS});
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
  public currentclick(event : any){
    var currentLeft = (event.pageX - event.currentTarget.getBoundingClientRect().left)
   var currentOff = event.currentTarget.offsetWidth
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.CURRENT_CLICK, payload:{currentLeft:currentLeft,currentOff:currentOff} }); 
}
 private volumeControl(index : any)
 {
   if(index == -0.5)
   this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.VOLUME_CONTROL, payload:{volume:index,bool:'minus'} });
   else
   this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.VOLUME_CONTROL, payload:{volume:index,bool:'plus'} });
 }
  private random(){
      if(this.click==true)
      {
        this.click =false
        this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.RANDOM_TRACK });
      }else
      {
        this.click = true
        this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.RANDOM_TRACK });
      }
  }
  ngAfterViewInit() {
  }

  init(){
    document.getElementById('nav_playlist').setAttribute('style','display:block')
      document.getElementById('nav_textsearch').setAttribute('style','display:none')
      document.getElementById('select').setAttribute('style','display:none')
      document.getElementById('temp').setAttribute('style','display:none')
      document.getElementById('tempad').setAttribute('style','display:none')
  }
}
