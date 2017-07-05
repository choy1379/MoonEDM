import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Store,ActionReducer, Action,Reducer } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

const CATEGORY: string = 'DJ';

export interface DJState {
  term?: string;
  results?: Array<any>;
  toggle?: boolean;             // eventid
  mainLoading?: boolean;        // loading
  modalLoading?: boolean;       // modalloading
  modalPlaylist?: boolean;      // playlistModal
  downloadLoading?: boolean;    // downloadloading
}
const initialState: DJState = {
  results: [],
  toggle: false,          
  mainLoading: false, 
  modalLoading: false,     
  modalPlaylist: false,   
  downloadLoading: false     
};

interface DJ_ACTIONS {
  TOGGLE_CHK: string;
  MAIN_LOADING: string;
  MODAL_LOADING: string;
  MODAL_Playlist: string;
  DOWNLOAD_LOADING: string;

}

export const DJ_ACTIONS: DJ_ACTIONS = {
  TOGGLE_CHK: `[${CATEGORY}] TOGGLE_CHK`,
  MAIN_LOADING: `[${CATEGORY}] MAIN_LOADING`,
  MODAL_LOADING: `[${CATEGORY}] MODAL_LOADING`,
  MODAL_Playlist: `[${CATEGORY}] MODAL_Playlist`,
  DOWNLOAD_LOADING: `[${CATEGORY}] DOWNLOAD_LOADING`
};

export const DJReducer: ActionReducer<DJState> = (state: DJState = initialState, action: Action) => {
  let changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  switch (action.type) {
    // 마지막에 작업 
    case DJ_ACTIONS.TOGGLE_CHK:
      action.payload.toggle = true;
      return changeState();
    case DJ_ACTIONS.MODAL_LOADING:
     if (typeof action.payload === 'undefined') {
         action.payload = { modalLoading: true};
      }else{
          action.payload = { modalLoading: false};
      }
      return changeState();
    case DJ_ACTIONS.MAIN_LOADING:
     if (typeof action.payload === 'undefined') {
         action.payload = { mainLoading: true , modalPlaylist : true};
      }else{
        action.payload = { mainLoading: false };   
      }
      return changeState();
    default:
      return state;
  };
};

@Injectable()
export class DJService{
    constructor(private _http:Http,private store: Store<any>){     
    }
     searchDJ(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/searchDJ', params, {headers: headers})
            .map(res => res.json());
    }
    searchPlaylist(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('https://moonedm.herokuapp.com/searchPlaylist', params, {headers: headers})
            .map(res => res.json());
    }

}