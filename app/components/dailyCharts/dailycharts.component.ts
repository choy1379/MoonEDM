import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';
import {bugsService} from '../../service/bugs.service';
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
  constructor(public _bugsService:bugsService,public audiograph: AudiographService,private store: Store<any>) {
    this.state$ = this.store.select<any>('audiograph')
    
  }
  ngOnInit(){
       // 가져온걸 바로 처리해주자...array 받아주자
        var result = this._bugsService.bugsCharts();
              result.subscribe(x => {
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
          this.tracklist["tracklist"].forEach(element => {
              if(element.selected == true)
                {
                  console.log(element)
                }
          });
      }
}
  // this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index});
// this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload:{index :index , URL : x.URL}});