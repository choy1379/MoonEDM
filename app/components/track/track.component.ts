import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
const ss = require('node_modules/socket.io-stream/socket.io-stream.js')

@Component({
    moduleId:module.id,
    selector: 'track',
    templateUrl: 'track.component.html',
    styleUrls: ['track.component.css']
})

export class trackComponent implements OnInit { 
tracklist = new Array();


constructor(  private router:ActivatedRoute,private http:Http,private _searchService: searchService){
    
    }
      loading: boolean;
      ngOnInit(){
        var result : any
        this.tracklist = []
        this.router.params.subscribe((params) => {
            result = this._searchService.youtube_dl_one(params);
            result.subscribe(x => {
                 this.tracklist = x.data
                 document.getElementById('tracklistframe').setAttribute('src',this.tracklist[0].videoID)
            });
        });
    }

    downloadclick(event:any)
    {
               this.loading = true 

            var query = {
                         "videoURL" : this.tracklist[0].videoURL
                        }
    
              var socket = io.connect('http://localhost:8000/stream');
              var stream = ss.createStream();

            ss(socket).emit('test', stream, {result: query});

            ss(socket).on('result', function(data) {
                console.log('socket result')
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