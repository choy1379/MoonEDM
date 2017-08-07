import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AUDIOGRAPH_ACTIONS,AudiographService,IPlaylistTrack } from '../../service/audiograph.service';
import {bugsService} from '../../service/bugs.service';
import {Auth} from '../../service/auth.service';

declare var $audiograph: any;
@Component({
    moduleId:module.id,
    selector: 'dailyCharts',
    templateUrl: 'dailyCharts.component.html',
    styleUrls: ['dailyCharts.component.scss'],
    providers:[AudiographService]
})


export class dailyChartsComponent implements OnInit {
   state$ : Observable<any>
   tracklist = new Array()
   selectedAll: any;
  constructor(public _bugsService:bugsService,private store: Store<any>,private _auth: Auth) {
    this.state$ = this.store.select<any>('audiograph')
   }
  ngOnInit(){
        var result = this._bugsService.bugsCharts();
              result.subscribe(x => {
                var sortingField = "Rank";
                x.tracklist.sort(function(a, b) { // 오름차순
                    return a[sortingField] - b[sortingField];
                });
                this.tracklist = x
            }); 
  }
  selectAll() {
      for (var i = 0; i < this.tracklist["tracklist"].length; i++) {
        this.tracklist["tracklist"][i].selected = this.selectedAll;
      }
    }
  checkIfAllSelected() {
      this.selectedAll = this.tracklist.every(function(item:any) {
          return item.selected == true;
        })
    }
  add(){
        var album = new Array()
        
          this.tracklist["tracklist"].forEach(element => {
              if(element.selected == true)
                {
                  var albumObj = new Object()
                  albumObj['albumtitle'] = element.albumTitle
                  albumObj['artist'] = element.artist
                  albumObj['albumImg'] = element.albumImg //50짜리 500으로 정규식변환..?
                  albumObj['id'] = JSON.parse(localStorage.getItem('profile')).nickname
                  album.push(albumObj)
                }
          });
          var addtrackList = this._bugsService.addtrackList(album)
          addtrackList.subscribe(x =>{
              console.log(x)
              // 0801 ~ 내일작업 플레이리스트 추가하면됨 
              for(var i = 0; i<x.data.length; i++)
                {
                  let newTrack: IPlaylistTrack = {
                    track: x.data[i].track,
                    artist: x.data[i].Artist,
                    albumImg:x.data[i].AlbumImg,
                    videoURL: x.data[i].videoURL,
                    frequencies: [[300, 4000], [605, 5000]]
                  };
                  this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: newTrack });
                }
            })
      }
    selected(event:any){
      if(event.selected == true)
        {
          event.selected =false
        }
      else
        {
          event.selected = true
        }
    }
}
  // this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}});