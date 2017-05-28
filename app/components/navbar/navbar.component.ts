import { Component ,OnInit} from '@angular/core';
import {searchService} from '../../service/search.service';
import {Auth} from '../../service/auth.service';
declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit{ 
constructor(private _searchService: searchService,private auth: Auth){
    
  }
  List = [{'name': 'DJ'}, {'name': 'tracklist'},{'name':'Artist'}];
  selectedList = this.List[0];
  selected = ''

    ngOnInit(){
        this._searchService.getDocument('temp').style.marginTop = "7px"
        // this._searchService.getDocument('temp').style.width = "30%"
        this._searchService.getDocument('tempad').style.marginTop = "7px"
        this._searchService.getDocument('select').style.marginTop = "7px"
        //    document.querySelector('#canvas').setAttribute('style','width:1px')
    }
    search(event:any)
    {
       
        if(this.selected == "tracklist")
        {
            $('#temptracklist')[0].click()
        }
        else if (this.selected == 'Artist')
        {
            //artist 클릭
            $('#tempArtist')[0].click()
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
        else if (this.selected == 'Artist')
        {
            //artist 클릭
            $('#tempArtist')[0].click()
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

  
