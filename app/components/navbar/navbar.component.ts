import { Component ,OnInit} from '@angular/core';
import {searchService} from '../../service/search.service';

declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit{ 
constructor(private _searchService: searchService){
    }
  List = [{'name': 'DJ'}, {'name': 'tracklist'}];
  selectedList = this.List[0];
  selected = ''

    ngOnInit(){
        this._searchService.getDocument('temp').style.marginTop = "7px"
        this._searchService.getDocument('temp').style.width = "30%"
        this._searchService.getDocument('tempad').style.marginTop = "7px"
        this._searchService.getDocument('select').style.marginTop = "7px"
           document.querySelector('#canvas').setAttribute('style','width:1px')
    }
    search(event:any)
    {

        if(this.selected == "tracklist")
        {
            $('#temptracklist')[0].click()
        }
        else
        {
            $('#tempad')[0].click()
        }
    }
    onClick(event:any)
    {
        if(this.selected == "tracklist")
        {
            $('#temptracklist')[0].click()
        }
        else
        {
            $('#tempad')[0].click()
        }
    }

    onChange(event:any) {
        this.selected = event.name
    }

  
}

  
