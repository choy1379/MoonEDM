import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Store,ActionReducer, Action,Reducer } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

const CATEGORY: string = 'tunesplaysearch';

/**
 * ngrx setup start --
 */
export interface tunesplaysearchState {
  term?: string;
  results?: Array<any>;
  showResults?: boolean;
}
const initialState: tunesplaysearchState = {
  results: [],
  showResults: false
};

interface tunesplaysearch_ACTIONS {
  RESULTS_CHANGE: string;
  RESULTS_HIDE: string;
}

export const tunesplaysearch_ACTIONS: tunesplaysearch_ACTIONS = {
  RESULTS_CHANGE: `[${CATEGORY}] RESULTS_CHANGE`,
  RESULTS_HIDE: `[${CATEGORY}] RESULTS_HIDE`
};

export const tunesplaysearchReducer: ActionReducer<tunesplaysearchState> = (state: tunesplaysearchState = initialState, action: Action) => {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case tunesplaysearch_ACTIONS.RESULTS_CHANGE:
      action.payload.showResults = true;
      return changeState();
    case tunesplaysearch_ACTIONS.RESULTS_HIDE:
      action.payload = { showResults: false };
      return changeState();
    default:
      return state;
  };
};

/**
 * ngrx end --
 */

@Injectable()
export class tunesplaysearchService{
    constructor(private store: Store<any>){
    }

}