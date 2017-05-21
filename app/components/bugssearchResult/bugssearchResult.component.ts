import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import { Store } from '@ngrx/store';
import {searchService} from '../../service/search.service';
import {bugsService,bugs_ACTIONS} from '../../service/bugs.service';
import {Observable} from 'rxjs/Observable';
import {AUDIOGRAPH_ACTIONS,IPlaylistTrack} from '../../service/audiograph.service'
import {Auth} from '../../service/auth.service';

@Component({
    moduleId:module.id,
    selector: 'bugssearchResult',
    templateUrl: 'bugssearchResult.component.html',
    styleUrls: ['bugssearchResult.component.css'],
      providers : [bugsService]
})

export class bugssearchResultComponent  { 
 state$ : Observable<any>
 eventid : any 
constructor(private store: Store<any>,private _bugsService:bugsService,private _searchService: searchService,private router:ActivatedRoute,private http:Http,private auth: Auth){
   this.state$ = this.store.select<any>('bugs')
}
   
       playlistclick(res:any,event:any)
      {   
               if( this._searchService.getDocument(res.tbcell).style.display== 'inline')
               {
                   this._searchService.getDocument(res.tbcell).style.display='none'
               }
               else
               {
                    this._searchService.getDocument(res.tbcell).style.display='inline'
                    this._searchService.getDocument(res.iframe).setAttribute('src',res.videoID)
               }
      }
       downloadclick(res:any,event:any)
      {
         this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING});
          if(res.tracks == event.path[6].id)
          {
             this.eventid = event.path[6].id
          }
          var result : any
          var query = {
                        "videoURL" : res.videoURL[0]
                      }
          result = this._searchService.youtube_dl(query);
          result.subscribe(x => {
              var url = x.URL
              window.open(url)
              this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING , payload : 'false'});
        }); 
      }
        playlistAdd(res:any,event:any)
      {
              var result : any
              var Add_track : any

            this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING});
              if(res.tracks == event.path[6].id)
              {
                this.eventid = event.path[6].id
              }

              let newTrack: IPlaylistTrack = {
                track: res.tracks,
                artist: res.Artist,
                videoURL: res.videoURL[0],
                frequencies: [[145, 5000], [145, 5000]]
              };

              this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING , payload : 'false'});

              if(localStorage.getItem('profile') ==  null){
              this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
              }
              else
              {
                  var query = {
                      "track" : res.tracks,
                      "Artist" : res.Artist,
                      "id" : JSON.parse(localStorage.getItem('profile')).nickname,
                      "videoURL" : res.videoURL[0]
                    }
                    Add_track = this._searchService.PlaylistAdd(query)
                    // AUDIOGRAPH_ACTIONS.ADD_TRACK 을 하지않는 이유는 oninit 시 디비에서 값가져오기때문..
                    Add_track.subscribe(x => {
                  });
              }
      }

}

// var result : any
//           var Add_track : any

//          this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING});
//           if(res.tracks == event.path[6].id)
//           {
//              this.eventid = event.path[6].id
//           }
//           var query = {
//                         "videoURL" : res.videoURL[0]
//                       }
//           result = this._searchService.youtube_dl(query);
//           result.subscribe(x => {
//               var url = x.URL
//               let newTrack: IPlaylistTrack = {
//                 trackName: res.tracks,
//                 artist: res.Artist,
//                 src: url,
//                 frequencies: [[145, 5000], [145, 5000]]
//               };

//               this.store.dispatch({ type: bugs_ACTIONS.IMG_DOWNLOADING , payload : 'false'});

//               if(localStorage.getItem('profile') ==  null){
//               this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
//               }
//               else
//               {
//                   var query = {
//                         "track" : res.tracks,
//                         "Artist" : res.Artist,
//                         "id" : JSON.parse(localStorage.getItem('profile')).nickname,
//                         "Url" : url
//                       }
//                     Add_track = this._searchService.PlaylistAdd(query)
//                     Add_track.subscribe(x => {
//                   });
//               }
//         }); 