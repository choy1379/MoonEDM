import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import { Store } from '@ngrx/store';
import {searchService} from '../../service/search.service';
import {AUDIOGRAPH_ACTIONS,IPlaylistTrack} from '../../service/audiograph.service'
@Component({
    moduleId:module.id,
    selector: 'DJ',
    templateUrl: 'DJ.component.html',
    styleUrls: ['DJ.component.css']
})

export class DJComponent implements OnInit { 
DJlist = new Array();
tempPlaylist = new Array();


constructor(private store: Store<any>,  private router:ActivatedRoute,private http:Http,private _searchService: searchService){

    }
    

    loading: boolean;
    modalloading:boolean;
    downloadloading : boolean;
    portfolioModal : string;
    playlistModal: boolean;
    eventid : string

      ngOnInit(){
        this.router.params.subscribe((params) => {
            var result : any
            this.loading = true 
            this.playlistModal = true
            result = this._searchService.searchDJ(params)
            result.subscribe(x => {
                 this.loading = false
                 this.DJlist = x.data
                 this._searchService.getDocument('portfolio').style.display='inline'

            });
        });
    }
      imgClick(res:any)
      {
          this.tempPlaylist = []
          this._searchService.getDocument(res.list).setAttribute('href','#Playlist')
          this.modalloading = true 
           var playList = 'playList=' + res.Detail;
           var result : any
            result = this._searchService.searchPlaylist(playList)
            result.subscribe(x => {
                this.tempPlaylist = x.data
                this.modalloading = false
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
          var query = {
                        "videoURL" : res.videoURL
                      }
          result = this._searchService.youtube_dl(query);
          result.subscribe(x => {
              var url = x.URL
              let newTrack: IPlaylistTrack = {
                trackName: res.tracks,
                artist: res.Artist,
                videoURL: res.videoURL[0],
                frequencies: [[145, 5000], [145, 5000]]
              };

              if(localStorage.getItem('profile') ==  null){
              this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
              }
              else
              {
                  var query = {
                        "track" : res.track,
                        "Artist" : '',
                        "id" : JSON.parse(localStorage.getItem('profile')).nickname,
                        "Url" : url
                      }
                    Add_track = this._searchService.PlaylistAdd(query)
                    Add_track.subscribe(x => {
                  });
              }
        }); 
      }
}
