import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AUDIOGRAPH_ACTIONS,AudiographService } from '../../service/audiograph.service';

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
  constructor(public audiograph: AudiographService,private store: Store<any>) {
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
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
  }

  public play(index: number) {
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index });
    // console.log(this.state$)
  }

}

