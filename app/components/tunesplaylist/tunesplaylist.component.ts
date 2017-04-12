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
 audio : any
constructor(private store: Store<any>,private _tunesplaysearchService:tunesplaysearchService,private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    //audiograph.service.js 에서 state 변경하지않는한 Observable 리턴시  changeState() 값 그대로 리턴
    //만약 변경할 사항있을시 .subscribe 에서 (state: IAudiographState) 처리후 리턴 
    //return Object.assign({}, state, action.payload) -> observable state$
    this.state$ = this.store.select<any>('audiograph')
 }
    ngOnInit(){
      /* 우선은 임시로 offliberty 를 이용해서 한번다운로드받은후 localStorage 에 저장한후 다른페이지이동후 다시 플레이리스트에 올시
         localStorage 값 유무를판단후 서버상에있는 config.playlist_ADD 를 불러와 목록을보여준다 
         config.playlist_ADD 같은경우는 새로운로그인을할때마다 초기화를 시켜준다.
         이렇게 해주는이유는 offliberty 같은경우는 동시에 많은 다운로드를 받을시 다운을 막아버린다
         이를 해결하기위해 서버자체에서 받아서 하는방법이있지만 서버용량이작다..
      */
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
                            for(var i = 0; i<x.tracklist.length; i++)
                            {
                              this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: x.tracklist[i] }); 
                              localStorage.setItem('track',x.tracklist[0].trackName);
                            } 
            }); 
          }
      }
      else
      {
            //로그인을 한후 다시 플레이리스트에 들어올시 목록을 DB 에서 받지않고 config.playlist_ADD 환경변수값을 가져와 처리한다.
             var result = this._searchService.temp();
              result.subscribe(x => {
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
  ngAfterViewInit() {
    // document.querySelector('#canvas').setAttribute('style','')
  }
}
