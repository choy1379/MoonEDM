import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';



declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'textsearch',
    templateUrl: 'textsearch.component.html',
    styleUrls: ['textsearch.component.css']
})

export class textsearchComponent implements OnInit{ 
constructor( private http:Http){
    }
 textdownload: string
 textlist = new Array() 
  loading: boolean;
    ngOnInit(){

    }
    textdownloadclick(res:any,event:any){
        this.loading = true 
        this.textlist = []
        var tracklist = this.textdownload.split('\n')
        for(var i = 0; i < tracklist.length; i ++)
        {
            if(tracklist[i].length == 0)
            {
                tracklist.splice(i, 1);
            }
        }
        document.getElementById('textdownload').setAttribute('href','#downloadlist')
         var headers = new Headers(); 
            headers.append('Content-Type', 'application/json');
            this.http.post('https://moonedm.herokuapp.com/textdownload',tracklist,{headers: headers}).subscribe((res) => {
                console.log(res.json())
                this.textlist = res.json().data
                this.loading = false 
            });

    }
    textlistclick(res:any,event:any){
            document.getElementById(res.tbcell).style.display='inline';
            document.getElementById(res.iframe).setAttribute('src',res.videoID);
    }
    downloadclick(res:any,event:any){
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

  
