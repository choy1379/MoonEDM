import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {searchService} from '../../service/search.service'
import {tunesplaysearchService,tunesplaysearch_ACTIONS} from '../../service/tunesplaysearch.service'
import {AUDIOGRAPH_ACTIONS,IPlaylistTrack} from '../../service/audiograph.service'


@Component({
  selector: 'tunesplaysearchResult',
  templateUrl: './app/components/tunesplaysearchResult/tunesplaysearchResult.component.html',
  styleUrls: ['./app/components/tunesplaysearchResult/tunesplaysearchResult.component.scss'],
  
})
export class tunesplaysearchResultComponent {
  state$ : Observable<any>
  constructor(private store: Store<any> ,private _searchService: searchService, private _tunesplaysearchService:tunesplaysearchService) {
    //tunesplaysearchReducer 
    //changestate()
    //return Object.assign({}, state, action.payload) -> observable state$
    this.state$ = this.store.select<any>('tunesplaysearch')
 }
public add(track: any, playbtn: any) {
     //offliberty get mp3
      var result : any
      var query = {
                    "videoURL" : track.videoURL
                  }
      result = this._searchService.youtube_dl(query);
      result.subscribe(x => {
          var url = x.URL
          let newTrack: IPlaylistTrack = {
            trackName: track.track,
            artist: '',
            src: url,
            frequencies: [[145, 5000], [145, 5000]]
          };
          this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
          // display successfully added message
          if (playbtn) {
            playbtn.setAttribute('data-hint', 'Added');
            playbtn.setAttribute('class', 'play-btn hint--left hint--always');
            setTimeout(() => {
              playbtn.setAttribute('class', 'play-btn hint--left');
              setTimeout(() => {
                playbtn.setAttribute('data-hint', 'Add to Playlist');
              }, 800);
            }, 1500);
          }
    });
 
  }

  public close() {
    this.store.dispatch({ type: tunesplaysearch_ACTIONS.RESULTS_HIDE });
  }
}
