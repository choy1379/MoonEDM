import { Component ,OnInit} from '@angular/core';

declare  var $:any;

@Component({
    moduleId:module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit{ 
  List = [{'name': 'DJ'}, {'name': 'tracklist'}];
  selectedList = this.List[0];
  selected = ''

    ngOnInit(){
        document.getElementById("temp").style.marginTop = "7px"
        document.getElementById("temp").style.width = "30%"
        document.getElementById("tempad").style.marginTop = "7px"
        document.getElementById("select").style.marginTop = "7px"
        
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

  
