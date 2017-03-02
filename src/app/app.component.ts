import { Component } from '@angular/core';
import {Unit} from './Models/unit'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
   Units: Unit[] = [
  { id: 1, name: 'Teaspoon'},
  { id: 2, name: 'Pound'}
];

}


