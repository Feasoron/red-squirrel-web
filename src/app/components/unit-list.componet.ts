///<reference path="../services/api-service.ts"/>
/**
 * Created by chris on 3/1/17.
 */
import { Component, Input } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';


@Component({
  selector: 'unit-list',
  template: `<div *ngFor="let unit of Units | async">
  <span>{{unit.name}}</span>
  </div>`,

  providers: [ApiService]

})


export class UnitListComponent implements OnInit{


  constructor(private apiService: ApiService) { }

  Units: Observable<Unit[]>;

  getUnits() : void{
    this.Units = this.apiService.getUnits();
  }

  ngOnInit() : void {
    this.getUnits();
  }
}
