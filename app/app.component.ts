import { Component } from '@angular/core';
import {searchService} from './service/search.service';


@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers:[searchService]
    
})
export class AppComponent { }
