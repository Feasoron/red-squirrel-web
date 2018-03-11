import { Component } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Inventory } from '../models/inventory'
import { Food } from '../models/food';
import {Location} from '../models/location';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.component.html'
})

export class InventoryComponent implements OnInit {
  Inventories: Observable<Inventory[]>;
  Locations: Observable<Location[]>;
  Units: Observable<Unit[]>;
  Foods: Observable<Food[]>;

  NewName: string = null;
  constructor(private apiService: ApiService) {}

  public addInventory(): void {

    debugger;
//
    this.apiService.addInventory(null)
    // todo - async on response
    this.NewName = null

  }

  delete(unit: Unit) {
    this.apiService.deleteUnit(unit);
  }
  ngOnInit(): void {
    this.Units = this.apiService.units;
    this.Foods = this.apiService.foods;
    this.Inventories = this.apiService.inventories;
    this.Locations = this.apiService.locations;
  }
}

