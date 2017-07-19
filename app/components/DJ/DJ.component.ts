import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import { Store } from '@ngrx/store';
import {searchService} from '../../service/search.service';
import {AUDIOGRAPH_ACTIONS,IPlaylistTrack} from '../../service/audiograph.service'
import {DJService,DJ_ACTIONS} from '../../service/DJ.service';
import {Observable} from 'rxjs/Observable';

@Component({
    moduleId:module.id,
    selector: 'DJ',
    templateUrl: 'DJ.component.html',
    styleUrls: ['DJ.component.css'],
    providers: [DJService]
})

export class DJComponent implements OnInit { 
DJlist = new Array();
tempPlaylist = new Array();
 state$ : Observable<any>
constructor(private store: Store<any>,  private router:ActivatedRoute,private http:Http,private _searchService: searchService,private _DJService: DJService){
    this.state$ = this.store.select<any>('DJ')
}
    downloadloading : boolean;
    playlistAdds    : boolean;
    portfolioModal : string;
    eventid : string

      ngOnInit(){
        this.router.params.subscribe((params) => {
            
            var result : any
            this.loadingInit()
            this.store.dispatch({ type: DJ_ACTIONS.MAIN_LOADING});
            result = this._DJService.searchDJ(params)
            result.subscribe(x => {
                 this.store.dispatch({ type: DJ_ACTIONS.MAIN_LOADING , payload : 'false'});
                 this.DJlist = x.data
                 this._searchService.getDocument('portfolio').style.display='inline'
            });
        });
    }
      imgClick(res:any)
      {
          this.tempPlaylist = []
          this._searchService.getDocument(res.list).setAttribute('href','#Playlist')
          this.store.dispatch({type:DJ_ACTIONS.MODAL_LOADING})
           var playList = 'playList=' + res.Detail;
           var result : any
            result = this._DJService.searchPlaylist(playList)
            result.subscribe(x => {
                this.tempPlaylist = x.data
               this.store.dispatch({type:DJ_ACTIONS.MODAL_LOADING, payload :'false'})
                if(localStorage.getItem('profile') ==  null){
                    this.store.dispatch({ type: DJ_ACTIONS.PLAYLIST_ADD });
                }
                else
                {
                    this.store.dispatch({ type: DJ_ACTIONS.PLAYLIST_ADD , payload : 'true'});
                }
            });
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
          if(res.track == event.path[5].id)
          {
             this.eventid = event.path[5].id
             this.downloadloading = true
          }
         
            var query = {
                         "videoURL" : res.videoURL,
                          "videoName" :  res.track
                        }
            var result : any 
            result = this._searchService.youtube_dl(query);
            result.subscribe(x => {
                var url = x.URL
                this.downloadloading = false

                window.open(url)
            });
            
      }
        playlistAdd(res:any,event:any)
      {
          var result : any
          var Add_track : any
          if(res.tracks == event.path[7].id)
          {
             this.eventid = event.path[7].id
          }
              let newTrack: IPlaylistTrack = {
                track: res.tracks,
                artist: res.Artist,
                videoURL: res.videoURL,
                albumImg : res.albumImg,
                frequencies: [[145, 5000], [145, 5000]]
              };
            var query = {
                "track" : res.track,
                "Artist" : '',
                "AlbumImg" :res.albumImg,
                "id" : JSON.parse(localStorage.getItem('profile')).nickname,
                "videoURL" : res.videoURL
                }
            Add_track = this._searchService.PlaylistAdd(query)
            Add_track.subscribe(x => {
                 });
              
      }
      loadingInit()
      {
          this.tempPlaylist = []
          this.DJlist = []
          this._searchService.getDocument('portfolio').style.display='none'
      }
}
