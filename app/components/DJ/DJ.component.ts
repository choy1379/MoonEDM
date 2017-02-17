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


constructor(   private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    }
    
    loading: boolean;
    portfolioModal : string;
      ngOnInit(){
        this.router.params.subscribe((params) => {
<<<<<<< HEAD
            var result : any
=======
            console.log(params)
>>>>>>> origin/master
            this.loading = true 

            result = this._searchService.searchDJ(params)
            result.subscribe(x => {
                 this.loading = false
                 this.DJlist = x.data
                  document.getElementById("portfolio").style.display='inline';
            });
        });
    }
      imgClick(res:any)
      {
          this.tempPlaylist = []
          document.getElementById(res.list).setAttribute('href','#Playlist')
          this.loading = true 
           var playList = 'playList=' + res.Detail;
           var result : any
            result = this._searchService.searchPlaylist(playList)
            result.subscribe(x => {
                this.tempPlaylist = x.data
                this.loading = false
            });
      }
      playlistclick(res:any,event:any)
      {
          
            document.getElementById(res.tbcell).style.display='inline';
            document.getElementById(res.iframe).setAttribute('src',res.videoID);
      }
      downloadclick(res:any,event:any)
      {
          this.loading = true 
            var query = {
                         "videoURL" : res.videoURL,
                          "videoName" :  res.track
                        }
            var result : any 
            result = this._searchService.youtube_dl(query);
            result.subscribe(x => {
                var url = x.URL
                this.loading = false
                window.open(url)
            });
            
      }
}
