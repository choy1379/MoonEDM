import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
<<<<<<< HEAD
import {searchService} from '../../service/search.service';
=======

>>>>>>> origin/master


declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'textsearch',
    templateUrl: 'textsearch.component.html',
    styleUrls: ['textsearch.component.css']
})

export class textsearchComponent implements OnInit{ 
<<<<<<< HEAD
constructor( private http:Http,private _searchService: searchService){
=======
constructor( private http:Http){
>>>>>>> origin/master
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
<<<<<<< HEAD
            var result : any
            result = this._searchService.textdownload(tracklist);
            result.subscribe(x => {
                this.textlist = x.data
                this.loading = false 
            });



=======
         var headers = new Headers(); 
            headers.append('Content-Type', 'application/json');
            this.http.post('https://moonedm.herokuapp.com/textdownload',tracklist,{headers: headers}).subscribe((res) => {
                console.log(res.json())
                this.textlist = res.json().data
                this.loading = false 
            });

>>>>>>> origin/master
    }
    textlistclick(res:any,event:any){
            document.getElementById(res.tbcell).style.display='inline';
            document.getElementById(res.iframe).setAttribute('src',res.videoID);
    }
    downloadclick(res:any,event:any){
        this.loading = true 
<<<<<<< HEAD
            var result : any
=======
           var headers = new Headers(); 
>>>>>>> origin/master
            var query = {
                         "videoURL" : res.videoURL,
                          "videoName" :  res.track
                        }
<<<<<<< HEAD
            result = this._searchService.youtube_dl(query);     
            result.subscribe(x => {
            this.loading = false 
            var url = x.URL
            window.open(url)
            });

=======
            headers.append('Content-Type', 'application/json');
            this.http.post('https://moonedm.herokuapp.com/youtube_dl',query,{headers: headers}).subscribe((res) => {
                this.loading = false 
                var url = res.json().URL
                console.log(url)
                window.open(url)
              
            });
>>>>>>> origin/master
    }

  
}

  
