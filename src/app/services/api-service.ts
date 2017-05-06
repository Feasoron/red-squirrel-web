import {Unit} from "../models/unit";
import {Location} from "../models/location"
import {Food} from "../models/food"
import {Injectable, OnInit} from '@angular/core';
import { Http, Response, Headers }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";

@Injectable()

export class ApiService implements OnInit{

  private headers = new Headers({'Content-Type': 'application/json'});
  private dataStore: {  // This is where we will store our data in memory
    units: Unit[],
    locations: Location[],
    foods: Food[]
  };

  baseUri : string = "https://redsquirrel.io/api/";
  private _units: BehaviorSubject<Unit[]>;
  private _locations: BehaviorSubject<Location[]>;
  private _foods: BehaviorSubject<Food[]>;
  locations : Observable<Location[]>;
  units : Observable<Unit[]>;
  foods : Observable<Food[]>;

  ngOnInit(): void {
    this._units = new BehaviorSubject([]);
    this._locations = new BehaviorSubject([]);
    this._foods = new BehaviorSubject([]);

    this.getUnits();
    this.getLocations();
    this.getFoods();
  }

  constructor(private http: Http) {
    this.dataStore = { units: [], locations: [], foods: [] };

    this._units = <BehaviorSubject<Unit[]>>new BehaviorSubject([]);
    this.units = this._units.asObservable();

    this._locations = <BehaviorSubject<Location[]>>new BehaviorSubject([]);
    this.locations = this._locations.asObservable();

    this._foods = <BehaviorSubject<Food[]>>new BehaviorSubject([]);
    this.foods = this._foods.asObservable();

    this.getUnits();
    this.getLocations()
    this.getFoods();
  }

  getUnits() : void  {
    this.http.get(this.baseUri + 'units')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
          this.dataStore.units = data;
          this.updateUnitSubscriptions();
      }, error => console.log('Could not load units: ' + error));
  }

  getLocations() : void  {
    this.http.get(this.baseUri + 'locations')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.dataStore.locations = data;
        this.updateLocationSubscriptions();
      }, error => console.log('Could not load locations: ' + error));
  }

  getFoods() : void  {
    this.http.get(this.baseUri + 'foods')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.dataStore.foods = data;
        this.updateFoodSubscriptions();
      }, error => console.log('Could not load foods: ' + error));
  }

  addUnit(unit: Unit){
    var payload =  JSON.stringify(unit);

    this.http.post(this.baseUri + 'units', payload,  {headers: this.headers})
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

  addLocation(location: Location){
    var payload =  JSON.stringify(location);
    console.log(payload);

    this.http.post(this.baseUri + 'locations', payload,  {headers: this.headers})
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

  addFood(food: Food){
    var payload =  JSON.stringify(food);
    console.log(payload);

    this.http.post(this.baseUri + 'foods', payload,  {headers: this.headers})
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

  deleteUnit(unit: Unit): Promise<Boolean>{
    return new Promise((resolve) =>{
      this.http.delete(this.baseUri + 'units/' + unit.id)
        .subscribe(() => {
            this.dataStore.units.splice(this.dataStore.units.indexOf(unit), 1);
            this.updateUnitSubscriptions();
            return true;
          },
          () => {return false })
    });
  }

  deleteLocation(location: Location): Promise<Boolean>{
    return new Promise((resolve) =>{
      this.http.delete(this.baseUri + 'locations/' + location.id)
        .subscribe(() => {
            this.dataStore.locations.splice(this.dataStore.locations.indexOf(location), 1);
            this.updateLocationSubscriptions();
            return true;
          },
          () => {return false })
    });
  }

  deleteFood(food: Food): Promise<Boolean>{
    return new Promise((resolve) =>{
      this.http.delete(this.baseUri + 'foods/' + food.id)
        .subscribe(() => {
            this.dataStore.foods.splice(this.dataStore.foods.indexOf(food), 1);
            this.updateFoodSubscriptions();
            return true;
          },
          () => {return false })
    });
  }
  private updateUnitSubscriptions(){
    this._units.next(Object.assign({}, this.dataStore).units);
  }

  private updateLocationSubscriptions(){
    this._locations.next(Object.assign({}, this.dataStore).locations);
  }

  private updateFoodSubscriptions(){
    this._foods.next(Object.assign({}, this.dataStore).foods);
  }

  private extractData(res: Response) {
        debugger;
        console.log(res);
        let body = res.json();
        let resp = body || { };

        return resp;
    };
}
