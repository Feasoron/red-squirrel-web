///<reference path="../services/api-service.ts"/>
import { Component } from '@angular/core';
import { Unit } from '../models/unit'
import {ApiService} from '../services/api-service'
import { OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import {Food} from "../models/food";

@Component({
  selector: 'food-list',
  templateUrl: 'food-list.component.html',
  providers: [ApiService]
})

export class FoodListComponent implements OnInit{

  constructor(private apiService: ApiService) {}

  Foods: Observable<Food[]>;
  NewName: string = null;

  addFood(){
    console.log(this.NewName);
    let newFood : Food = {
      id: null,
      name: this.NewName
    };

     this.apiService.addFood(newFood)
     //todo - async on response
    this.NewName = null

  }

  delete(food: Food){
    this.apiService.deleteFood(food);
  }

  ngOnInit() : void {
    this.Foods = this.apiService.foods;
  }
}
