import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';


declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'textsearch',
    templateUrl: 'textsearch.component.html',
    styleUrls: ['textsearch.component.css']
})

export class textsearchComponent implements OnInit{ 
constructor( private http:Http,private _searchService: searchService){
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
            var result : any
            result = this._searchService.textdownload(tracklist);
            result.subscribe(x => {
                this.textlist = x.data
                this.loading = false 
            });



    }
    textlistclick(res:any,event:any){
            document.getElementById(res.tbcell).style.display='inline';
            document.getElementById(res.iframe).setAttribute('src',res.videoID);
    }
    downloadclick(res:any,event:any){
        this.loading = true 
            var result : any
            var query = {
                         "videoURL" : res.videoURL,
                          "videoName" :  res.track
                        }
            result = this._searchService.youtube_dl(query);     
            result.subscribe(x => {
            this.loading = false 
            var url = x.URL
            window.open(url)
            });

    }

  
}

  
