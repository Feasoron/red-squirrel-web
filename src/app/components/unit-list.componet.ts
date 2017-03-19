///<reference path="../services/api-service.ts"/>
import { Component } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';


@Component({
  selector: 'unit-list',
  templateUrl: 'unit-list.component.html',
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
