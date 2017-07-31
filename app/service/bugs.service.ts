import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Store,ActionReducer, Action,Reducer } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

const CATEGORY: string = 'bugs';

/**
 * ngrx setup start --
 */
export interface bugsState {
  term?: string;
  results?: Array<any>;
  showResults?: boolean;
  modalloading?: boolean;
  downloading?: boolean;
  IMG_LOADING ?: boolean;
  ArtistLoading ?: boolean;
}
const initialState: bugsState = {
  results: [],
  showResults: false,
  modalloading: false,
  downloading: false,
  IMG_LOADING : true,
  ArtistLoading : true,
};

interface bugs_ACTIONS {
  RESULTS_CHANGE: string;
  RESULTS_HIDE: string;
  IMG_RESULTS: string;
  IMG_LOADING : string;
  IMG_DOWNLOADING : string;
  ARTIST_LOADING  :string;
}

export const bugs_ACTIONS: bugs_ACTIONS = {
  RESULTS_CHANGE: `[${CATEGORY}] RESULTS_CHANGE`,
  RESULTS_HIDE: `[${CATEGORY}] RESULTS_HIDE`,
  IMG_RESULTS: `[${CATEGORY}] IMG_RESULTS`,
  IMG_LOADING: `[${CATEGORY}] IMG_LOADING`,
  IMG_DOWNLOADING: `[${CATEGORY}] IMG_DOWNLOADING`,
  ARTIST_LOADING: `[${CATEGORY}] ARTIST_LOADING`
};

export const bugsReducer: ActionReducer<bugsState> = (state: bugsState = initialState, action: Action) => {
 
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    case bugs_ACTIONS.RESULTS_CHANGE:
      action.payload.showResults = true;
      return changeState();
    case bugs_ACTIONS.RESULTS_HIDE:
      action.payload = { showResults: false };
      case bugs_ACTIONS.ARTIST_LOADING:
       if (typeof action.payload === 'undefined') {
        action.payload = { ArtistLoading: true };      
      }else{
        action.payload = { ArtistLoading: false };   
      }
      return changeState();
      case bugs_ACTIONS.IMG_LOADING:
       if (typeof action.payload === 'undefined') {
              state = [];
        action.payload = { modalloading: true };        
      }else{
        state  = action.payload.results
        action.payload = { modalloading: false };   
      }
      return changeState();
      case bugs_ACTIONS.IMG_DOWNLOADING:
      if (typeof action.payload === 'undefined') {
        action.payload = { downloading: true };      
      }else{
        action.payload = { downloading: false };   
      }
      return changeState();
    default:
      return state;
  };
};

/**
 * ngrx end --
 */

@Injectable()
export class bugsService{
    constructor(private _http:Http,private store: Store<any>){
    }
    bugsartist(params){
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this._http.post('http://localhost:4100/bugsartist', params, {headers: headers})
                .map(res => res.json());
        }
    bugstrack(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/bugstrack', params, {headers: headers})
            .map(res => res.json());
    }
    bugsCharts(){
       var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/getCharts', {headers: headers})
            .map(res => res.json());
    }
}
// http://localhost:4100/
// https://moonedm.herokuapp.com/