import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, AUDIOGRAPH_ACTIONS } from '../../audiograph.service';


@Component({
    moduleId:module.id,
    selector: 'tracklist',
    templateUrl: 'tracklist.component.html',
    styleUrls: ['tracklist.component.scss']
})

export class tracklistComponent implements OnInit {
  constructor(private store: Store<any>) {

  }
  ngOnInit(){

  }

  public remove(track: any) {
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.REMOVE_TRACK, payload: track });
  }

  public play(index: number) {
    this.store.dispatch({ type: AUDIOGRAPH_ACTIONS.TARGET_TRACK, payload: index });
  }

}

