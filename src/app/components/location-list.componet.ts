///<reference path="../services/api-service.ts"/>
import { Component } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import {Location} from "../models/location";

@Component({
  selector: 'location-list',
  templateUrl: 'location-list.component.html',
  providers: []
})

export class LocationListComponent implements OnInit{

  constructor(private apiService: ApiService) {}

  Locations: Observable<Location[]>;
  NewName: string = null;

  addLocation(){
    console.log(this.NewName);
    let newLocation : Location = {
      id: null,
      name: this.NewName
    };

     this.apiService.addLocation(newLocation)
     // todo - async on response
    this.NewName = null

  }

  delete(location: Location){
    this.apiService.deleteLocation(location);
  }

  ngOnInit(): void {
    this.Locations = this.apiService.locations;
  }
}
