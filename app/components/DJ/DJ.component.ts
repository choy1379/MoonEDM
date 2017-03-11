import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';

@Component({
    moduleId:module.id,
    selector: 'DJ',
    templateUrl: 'DJ.component.html',
    styleUrls: ['DJ.component.css']
})

export class DJComponent implements OnInit { 
DJlist = new Array();
tempPlaylist = new Array();


constructor(  private router:ActivatedRoute,private http:Http,private _searchService: searchService){

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
}
