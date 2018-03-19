import { Unit } from '../models/unit';
import { Location } from '../models/location'
import { Food } from '../models/food'
import { Injectable, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthHttp } from 'angular2-jwt';
import {Inventory} from "../models/inventory";

@Injectable()

export class ApiService implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});
  private dataStore: {
    units: Unit[],
    locations: Location[],
    foods: Food[]
    inventories: Inventory[]
  };

  baseUri = 'http://localhost:5000/api/';
  private _units: BehaviorSubject<Unit[]>;
  private _locations: BehaviorSubject<Location[]>;
  private _foods: BehaviorSubject<Food[]>;
  private _inventories: BehaviorSubject<Inventory[]>;
  locations: Observable<Location[]>;
  units: Observable<Unit[]>;
  foods: Observable<Food[]>;
  inventories: Observable<Inventory[]>;

  ngOnInit(): void {
    this._units = new BehaviorSubject([]);
    this._locations = new BehaviorSubject([]);
    this._foods = new BehaviorSubject([]);
    this._inventories = new BehaviorSubject([]);
  }

  constructor(private http: Http, private authHttp: AuthHttp) {
    this.dataStore = { units: [], locations: [], foods: [], inventories: [] };

    this._units = <BehaviorSubject<Unit[]>>new BehaviorSubject([]);
    this.units = this._units.asObservable();

    this._locations = <BehaviorSubject<Location[]>>new BehaviorSubject([]);
    this.locations = this._locations.asObservable();

    this._foods = <BehaviorSubject<Food[]>>new BehaviorSubject([]);
    this.foods = this._foods.asObservable();

    this._inventories = <BehaviorSubject<Inventory[]>>new BehaviorSubject([]);
    this.inventories = this._inventories.asObservable();

    this.getInventories();
    this.getUnits();
    this.getLocations();
    this.getFoods();
  }

  getUnits(): void  {
    this.authHttp.get(this.baseUri + 'units')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
          this.dataStore.units = data;
          this.updateUnitSubscriptions();
      }, error => console.log('Could not load units: ' + error));
  }

  getLocations(): void  {
    this.authHttp.get(this.baseUri + 'locations')
      .map(response => response.json())
      .subscribe(data => {
        this.dataStore.locations = data;
        this.updateLocationSubscriptions();
      }, error => console.log('Could not load locations: ' + error));
  }

  getFoods(): void  {
    this.authHttp.get(this.baseUri + 'foods')
      .map(response => response.json())
      .subscribe(data => {
        this.dataStore.foods = data;
        this.updateFoodSubscriptions();
      }, error => console.log('Could not load foods: ' + error));
  }

  getInventories(): void  {
    this.authHttp.get(this.baseUri + 'inventories')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.dataStore.foods = data;
        this.updateInventorySubscriptions();
      }, error => console.log('Could not load inventories: ' + error));
  }

  addUnit(unit: Unit) {
    const payload =  JSON.stringify(unit);

    this.authHttp.post(this.baseUri + 'units', payload,  {headers: this.headers})
      .map(
        (res: Response) => {
          unit.id = res.json().result;
          this.dataStore.units.push(unit);
          this.updateUnitSubscriptions();
          return true;
        }, error => console.log(error)
      )
      .subscribe((res: Boolean) => {
      });

  }

  addLocation(location: Location) {
    const payload =  JSON.stringify(location);
    console.log(payload);

    this.authHttp.post(this.baseUri + 'locations', payload,  {headers: this.headers})
      .map(
        (res: Response) => {
          location.id = res.json().result;
          this.dataStore.locations.push(location);
          this.updateLocationSubscriptions();
          return true;
        }, error => console.log(error)
      )
      .subscribe((res: Boolean) => {
      });
  }

  addInventory(inventory: Inventory) {
    const payload =  JSON.stringify(inventory);

    this.authHttp.post(this.baseUri + 'inventories', payload,  {headers: this.headers})
      .map(
        (res: Response) => {
          inventory.id = res.json().result;
          this.dataStore.inventories.push(inventory);
          this.updateLocationSubscriptions();
          return true;
        }, error => console.log(error)
      )
      .subscribe((res: Boolean) => {
      });
  }

  addFood(food: Food) {
    const payload =  JSON.stringify(food);

    this.authHttp.post(this.baseUri + 'foods', payload,  {headers: this.headers})
      .map(
        (res: Response) => {
          food.id = res.json().result;
          this.dataStore.foods.push(food);
          this.updateFoodSubscriptions();
          return true;
        }, error => console.log(error)
      )
      .subscribe((res: Boolean) => {
      });
  }

  deleteUnit(unit: Unit): Promise<Boolean> {
    return new Promise((resolve) => {
      this.authHttp.delete(this.baseUri + 'units' + unit.id)
        .subscribe(() => {
            this.dataStore.units.splice(this.dataStore.units.indexOf(unit), 1);
            this.updateUnitSubscriptions();
            return true;
          },
          () => {return false })
    });
  }

  deleteLocation(location: Location): Promise<Boolean> {
    return new Promise(() => {
      this.authHttp.delete(this.baseUri + 'locations' + location.id)
        .subscribe(() => {
            this.dataStore.locations.splice(this.dataStore.locations.indexOf(location), 1);
            this.updateLocationSubscriptions();
            return true;
          },
          () => {return false })
    });
  }

  deleteFood(food: Food): Promise<Boolean> {
    return new Promise(() => {
      this.authHttp.delete(this.baseUri + 'foods' + food.id)
        .subscribe(() => {
            this.dataStore.foods.splice(this.dataStore.foods.indexOf(food), 1);
            this.updateFoodSubscriptions();
            return true;
          },
          () => {return false })
    });
  }

  private updateUnitSubscriptions() {
    this._units.next(Object.assign({}, this.dataStore).units);
  }

  private updateLocationSubscriptions() {
    this._locations.next(Object.assign({}, this.dataStore).locations);
  }

  private updateFoodSubscriptions() {
    this._foods.next(Object.assign({}, this.dataStore).foods);
  }

  private updateInventorySubscriptions() {
    this._inventories.next(Object.assign({}, this.dataStore).inventories);
  }
}
