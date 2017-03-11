import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';
import {searchService} from '../../service/search.service';
@Component({
    moduleId:module.id,
    selector: 'playlist',
    templateUrl: 'playlist.component.html',
    styleUrls: ['playlist.component.scss'],
    providers:[AudiographService]
})


export class playlistComponent implements OnInit {
   state$ : Observable<any>
   volumeLevel: number = 0;
  constructor(public _searchService:searchService,public audiograph: AudiographService,private store: Store<any>) {
    this.state$ = this.store.select<any>('audiograph')
  }
  ngOnInit(){
  setInterval(() => {
      this.volumeLevel++;
      if (this.volumeLevel > 2) {
        this.volumeLevel = 0;
      }
    }, 100);
  }

  public remove(track: any) {
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
  }

  public play(index: number,track : any) {
        //  var videoURL = 'videoURL=' + track.result[0]
        //  var track_src = this._searchService.temp(videoURL);
        //  track_src.subscribe(x => {
             
        // }); 
         this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
  }
  

}
  // this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}});