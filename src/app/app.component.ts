import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazonApp';


  search(searchTerm:string){
    console.log("Recibiendo en el padre el evento onEnter()",searchTerm);
  }



}
