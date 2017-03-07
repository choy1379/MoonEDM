import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class bugsService{
    constructor(private _http:Http){
        
    }
    bugsartist(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://moonedm.herokuapp.com/bugsartist', params, {headers: headers})
            .map(res => res.json());
    }
      bugstrack(params){
        var headers = new Headers();
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return this._http.post('https://moonedm.herokuapp.com/bugstrack', params, {headers: headers})
            .map(res => res.json());
    }
}
