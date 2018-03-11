///<reference path="../services/api-service.ts"/>
import { Component } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-unit-list',
  templateUrl: 'unit-list.component.html',
  providers: []
})

export class UnitListComponent implements OnInit {

  Units: Observable<Unit[]>;
  NewName: string = null;
  constructor(private apiService: ApiService) {}

  public addUnit(): void {
    console.log(this.NewName);
    const newUnit: Unit = {
      id: null,
      name: this.NewName
    };

    this.apiService.addUnit(newUnit)
     // todo - async on response
    this.NewName = null

  }

  delete(unit: Unit) {
    this.apiService.deleteUnit(unit);
  }

  ngOnInit(): void {
    this.Units = this.apiService.units;
  }
}
