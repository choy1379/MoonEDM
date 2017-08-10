import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';
import {searchService} from '../../service/search.service';
declare var $audiograph: any;
@Component({
    moduleId:module.id,
    selector: 'playlist',
    templateUrl: 'playlist.component.html',
    styleUrls: ['playlist.component.scss'],
    providers:[AudiographService]
})


export class playlistComponent implements OnInit {
  
   state$ : Observable<any>
   volumeLevel: number = 0;


  constructor(public _searchService:searchService,public audiograph: AudiographService,private store: Store<any>) {
    this.state$ = this.store.select<any>('audiograph')
    
  }
  ngOnInit(){
  setInterval(() => {
      this.volumeLevel++;
      if (this.volumeLevel > 2) {
        this.volumeLevel = 0;
      }
    }, 100);
  }

  public remove(track: any) {
    try
    {
      if(track == undefined)
        {
          var query = {
            "id" : JSON.parse(localStorage.getItem('profile')).nickname,
            "track" : null,
            "videoURL" : null
          }
          var result = this._searchService.PlaylistDelete(query)
          result.subscribe(x =>{
                 this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: "allremove" });
          });   
        }
        else
        {
          var query = {
              "id" : JSON.parse(localStorage.getItem('profile')).nickname,
              "track" : track.track,
              "videoURL" : track.videoURL
            }
          this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
          var result = this._searchService.PlaylistDelete(query)
          result.subscribe(x =>{
          });   
        }
    }
    finally{}
  }

  public play(index: number,track : any) {
         this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
  }
  private search(search:any){
     // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    if(search.target.value != '')
    {
      filter = search.target.value
    }
    else if (typeof filter === 'undefined')
    {
      filter = '' 
    }
    else
    {
      filter = search
    }
    ul = document.getElementById("playUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  }
}
  // this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}});