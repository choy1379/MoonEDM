import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class searchService{
    constructor(private _http:Http){
        
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
    youtube_dl_one(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/youtube_dl_one', params, {headers: headers})
            .map(res => res.json());
    }
    youtube_dl(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/youtube_dl', params, {headers: headers})
            .map(res => res.json());
    }
    textdownload(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/textdownload', params, {headers: headers})
            .map(res => res.json());
    }
    youtube_dl_multiple(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('https://moonedm.herokuapp.com/youtube_dl_multiple', params, {headers: headers})
            .map(res => res.json());
    }
     PlaylistAdd(params){
        var headers = new Headers(); 
        headers.append('Content-Type', 'application/json')
        return this._http.post('https://moonedm.herokuapp.com/laylistAdd',params,{headers: headers})
        .map(res => res.json());
   }
    PlaylistSearch(params){
        var headers = new Headers(); 
         headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('https://moonedm.herokuapp.com/laylistSearch',params,{headers: headers})
        .map(res => res.json());
   }
       temp(){
        var headers = new Headers(); 
         headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('https://moonedm.herokuapp.com/temp',{headers: headers})
        .map(res => res.json());
   }
   PlaylistDelete(params)
   {
        var headers = new Headers(); 
         headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/PlaylistDelete',params,{headers: headers})
        .map(res => res.json());
   }
    
    //common function get document.getElementById
    getDocument(element)
    {
         return document.getElementById(element)
    }
}
// https://moonedm.herokuapp.com/
// http://localhost:4100/