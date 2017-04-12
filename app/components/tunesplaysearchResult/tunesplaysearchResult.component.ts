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
      var Add_track : any
        var query = {
                      "track" : track.track,
                      "Artist" : '',
                      "id" : JSON.parse(localStorage.getItem('profile')).nickname,
                      "videoURL" : track.videoURL
                    }
                  Add_track = this._searchService.PlaylistAdd(query)
                  Add_track.subscribe(x => {
                         let newTrack: IPlaylistTrack = {
                              trackName: track.track,
                              artist: '',
                              videoURL: track.videoURL,
                              frequencies: [[145, 5000], [145, 5000]]
                            };
                    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
                });
}

  public close() {
    this.store.dispatch({ type: tunesplaysearch_ACTIONS.RESULTS_HIDE });
  }
}


// var Add_track : any
//       var result : any
//       var query = {
//                     "videoURL" : track.videoURL
//                   }
//       result = this._searchService.youtube_dl(query);
//       result.subscribe(x => {
//           var url = x.URL
//           let newTrack: IPlaylistTrack = {
//             trackName: track.track,
//             artist: '',
//             src: url,
//             frequencies: [[145, 5000], [145, 5000]]
//           };
//           if(localStorage.getItem('profile') ==  null){
//             this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
//             }
//             else
//             {
//                 var query = {
//                       "track" : track.track,
//                       "Artist" : '',
//                       "id" : JSON.parse(localStorage.getItem('profile')).nickname,
//                       "Url" : url
//                     }
//                   Add_track = this._searchService.PlaylistAdd(query)
//                   Add_track.subscribe(x => {
//                     this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
//                 });
//             }
//           // display successfully added message
//           if (playbtn) {
//             playbtn.setAttribute('data-hint', 'Added');
//             playbtn.setAttribute('class', 'play-btn hint--left hint--always');
//             setTimeout(() => {
//               playbtn.setAttribute('class', 'play-btn hint--left');
//               setTimeout(() => {
//                 playbtn.setAttribute('data-hint', 'Add to Playlist');
//               }, 800);
//             }, 1500);
//           }

//     });