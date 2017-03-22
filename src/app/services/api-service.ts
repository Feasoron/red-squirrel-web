import {Unit} from "../models/unit";
import {Injectable, OnInit} from '@angular/core';
import { Http, Response }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";

@Injectable()

export class ApiService implements OnInit{

  private dataStore: {  // This is where we will store our data in memory
    units: Unit[]
  };

  baseUri : string = "https://redsquirrel.io/api/";
  private _units: BehaviorSubject<Unit[]>;
  units : Observable<Unit[]>;

  ngOnInit(): void {
    this._units = new BehaviorSubject([]);
    this.getUnits();
  }

  constructor(private http: Http) {
    this.dataStore = { units: [] };
    this._units = <BehaviorSubject<Unit[]>>new BehaviorSubject([]);
    this.units = this._units.asObservable();
  }

  getUnits() : void  {
    this.http.get(this.baseUri + 'units')
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
          this.dataStore.units = data;
          this.upateUnitSubscriptions();
      }, error => console.log('Could not load todos.'));
  }

  addUnit(unit: Unit){
    this.dataStore.units.push(unit);
    this.upateUnitSubscriptions()
  }

  deleteUnit(unit: Unit){
    this.dataStore.units.splice(this.dataStore.units.indexOf(unit), 1);
    this.upateUnitSubscriptions();
  }

  private upateUnitSubscriptions(){
    this._units.next(Object.assign({}, this.dataStore).units);
  }

  private extractData(res: Response) {

        let body = res.json();
        let resp = body || { };

        return resp;
    };
}
