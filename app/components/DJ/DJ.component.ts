import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';


@Component({
    moduleId:module.id,
    selector: 'DJ',
    templateUrl: 'DJ.component.html',
    styleUrls: ['DJ.component.css']
})

export class DJComponent implements OnInit { 
DJlist = new Array();
tempPlaylist = new Array();


constructor(   private router:ActivatedRoute,private http:Http){
    }
    
    loading: boolean;
    portfolioModal : string;

      ngOnInit(){
        this.router.params.subscribe((params) => {

            this.loading = true 

            var headers = new Headers(); 
            headers.append('Content-Type', 'application/json');
            this.http.post('https://moonedm.herokuapp.com/searchDJ',params,{headers: headers}).subscribe((res) => {

                 this.loading = false

                 this.DJlist = res.json().data

                  document.getElementById("portfolio").style.display='inline';
                 
                });
        });
    }
      imgClick(res:any)
      {
          this.tempPlaylist = []
          document.getElementById(res.list).setAttribute('href','#Playlist')
          this.loading = true 
          var headers = new Headers(); 
           var playList = 'playList=' + res.Detail;
            headers.append('Content-Type', 'application/X-www-form-urlencoded');
            this.http.post('https://moonedm.herokuapp.com/searchPlaylist',playList,{headers: headers}).subscribe((res) => {
                this.tempPlaylist = res.json().data
                this.loading = false
                console.log(this.tempPlaylist)
            });
            
      }
      playlistclick(res:any,event:any)
      {
          
            document.getElementById(res.tbcell).style.display='inline';
            document.getElementById(res.iframe).setAttribute('src',res.videoID);
      }
      downloadclick(res:any,event:any)
      {
          console.log(res.videoURL)
          this.loading = true 
           var headers = new Headers(); 
            var query = {
                         "videoURL" : res.videoURL,
                          "videoName" :  res.track
                        }
            headers.append('Content-Type', 'application/json');
            this.http.post('https://moonedm.herokuapp.com/youtube_dl',query,{headers: headers}).subscribe((res) => {
                this.loading = false
                var url = res.json().URL
                console.log(url)
                window.open(url)
            });
            
      }
}
