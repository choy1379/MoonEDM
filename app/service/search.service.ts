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
        return this._http.post('http://localhost:4100/searchDJ', params, {headers: headers})
            .map(res => res.json());
    }
    searchPlaylist(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('http://localhost:4100/searchPlaylist', params, {headers: headers})
            .map(res => res.json());
    }
    youtube_dl_one(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/youtube_dl_one', params, {headers: headers})
            .map(res => res.json());
    }
    youtube_dl(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/youtube_dl', params, {headers: headers})
            .map(res => res.json());
    }
    textdownload(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:4100/textdownload', params, {headers: headers})
            .map(res => res.json());
    }
}