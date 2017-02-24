import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {searchService} from '../../service/search.service'
import {tunesplaysearch_ACTIONS} from '../../service/tunesplaysearch.service'

@Component({
  selector: 'tunesplaysearch',
  templateUrl: './app/components/tunesplaysearch/tunesplaysearch.component.html',
  styleUrls: ['./app/components/tunesplaysearch/tunesplaysearch.component.scss'],

})
export class tunesplaysearchComponent {
  
  constructor(private store: Store<any> ,private _searchService: searchService) {
  }

  public search(value: any) {
         var result : any
          var res = 'track=' + value;
            result = this._searchService.youtube_dl_multiple(res);
            result.subscribe(x => {
                this.store.dispatch({ type: tunesplaysearch_ACTIONS.RESULTS_CHANGE, payload: { results: x.data } });
            });
  }
}
