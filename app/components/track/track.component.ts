import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';


@Component({
    moduleId:module.id,
    selector: 'track',
    templateUrl: 'track.component.html',
    styleUrls: ['track.component.css']
})

export class trackComponent implements OnInit { 
tracklist = new Array();


constructor(  private router:ActivatedRoute,private http:Http){
    }
      loading: boolean;
      ngOnInit(){
        this.tracklist = []
        this.router.params.subscribe((params) => {
            // this.loading = true 
            var headers = new Headers(); 
            headers.append('Content-Type', 'application/json');
            this.http.post('http://localhost:4100/youtube_dl_one',params,{headers: headers}).subscribe((res) => {
                 this.tracklist = res.json().data
                 document.getElementById('tracklistframe').setAttribute('src',this.tracklist[0].videoID)
            });
        });
    }
    downloadclick(event:any)
    {
          this.loading = true 
           var headers = new Headers(); 
            var query = {
                         "videoURL" : this.tracklist[0].videoURL
                        }
            headers.append('Content-Type', 'application/json');
            this.http.post('http://localhost:4100/toMp3',query,{headers: headers}).subscribe((res) => {
                console.log(res.blob())
            });
    }
}
        // this.loading = true 
        //     var headers = new Headers(); 
        //         var query = {
        //                     "videoURL" : this.tracklist[0].videoURL
        //                     }
        //         headers.append('Content-Type', 'application/json');
        //         this.http.post('http://localhost:4100/youtube_dl',query,{headers: headers}).subscribe((res) => {
        //             var url = res.json().URL
        //             this.loading = false
        //             console.log(url)
        //             window.open(url)
        //         });

        // 나중에 
        //   this.loading = true 
        //    var headers = new Headers(); 
        //     var query = {
        //                  "videoURL" : this.tracklist[0].videoURL
        //                 }
        //     headers.append('Content-Type', 'application/json');
        //     this.http.post('http://localhost:4100/toMp3',query,{headers: headers}).subscribe((res) => {
        //         console.log(res)
        //     });