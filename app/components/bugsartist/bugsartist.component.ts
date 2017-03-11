import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {searchService} from '../../service/search.service';
import { Store } from '@ngrx/store';
import {bugsService,bugs_ACTIONS} from '../../service/bugs.service';
import {bugssearchResultComponent} from '../bugssearchResult/bugssearchResult.component'

@Component({
    moduleId:module.id,
    selector: 'bugsartist',
    templateUrl: 'bugsartist.component.html',
    styleUrls: ['bugsartist.component.css'],
      providers : [bugsService,bugssearchResultComponent]
})

export class bugsartistComponent implements OnInit { 
   
constructor(private store: Store<any>,private _bugssearchResultComponent:bugssearchResultComponent,private _bugsService:bugsService,private _searchService: searchService,private router:ActivatedRoute,private http:Http){
    }
      loading: boolean;
      modalloading:boolean;
     downloadloading : boolean;
     playlistModal:boolean;
      Artist : any 
      bugsAlbum : any
      bugstracks : any
      eventid : string

      ngOnInit(){
        this.router.params.subscribe((params) => {
            var result : any
            this.Artist = []
            this.loading = true 
            this.playlistModal = true
            result = this._bugsService.bugsartist(params)
            result.subscribe(x => {
                 this.loading = false
                 this.Artist = x.data
                 this._searchService.getDocument('portfolio').style.display='inline'

            });
        });
    }
    imgClick(res : any)
    {
        this.bugsAlbum = []
        this.bugstracks = []
        this._searchService.getDocument(res.Album).setAttribute('href','#Playlist')
        this.store.dispatch({ type: bugs_ACTIONS.IMG_LOADING});

        var result : any
        var playList = 'href=' + res.href 
        result = this._bugsService.bugstrack(playList)
        result.subscribe(x =>{
                this.store.dispatch({ type: bugs_ACTIONS.IMG_RESULTS, payload: { results: x } });     
        });

    }
    //    playlistclick(res:any,event:any)
    //   {   
    //            // 이 부분을 ... dispatch store 로 해결을 할까... 아 일단 내일 보자 
    //            if( this._searchService.getDocument(res.tbcell).style.display== 'inline')
    //            {
    //                this._searchService.getDocument(res.tbcell).style.display='none'
    //            }
    //            else
    //            {
    //                 this._searchService.getDocument(res.tbcell).style.display='inline'
    //                 this._searchService.getDocument(res.iframe).setAttribute('src',res.videoID)
    //            }
    //   }
    //    downloadclick(res:any,event:any)
    //   {
    //       if(res.tracks == event.path[5].id)
    //       {
    //          this.eventid = event.path[5].id
    //          this.downloadloading = true
    //       }
         
    //         var query = {
    //                      "videoURL" : res.videoURL,
    //                       "videoName" :  res.track
    //                     }
    //         var result : any 
    //         result = this._searchService.youtube_dl(query);
    //         result.subscribe(x => {
    //             var url = x.URL
    //             this.downloadloading = false
    //             this._searchService.getDocument(res.tbcell).style.display='none'
    //             window.open(url)
    //         });
            
    //   }

}