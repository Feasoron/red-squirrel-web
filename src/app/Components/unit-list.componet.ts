/**
 * Created by chris on 3/1/17.
 */
import { Component, Input } from '@angular/core';
import { Unit } from '../Models/unit'

@Component({
  selector: 'unit-list',
  template: `<div *ngFor="let unit of Units">
  <span>{{unit.name}}</span>
  </div>`
})

export class UnitListComponent {
  Units: Unit[] = [
    { id: 1, name: 'Teaspoon'},
    { id: 2, name: 'Pound'}
  ];
}
