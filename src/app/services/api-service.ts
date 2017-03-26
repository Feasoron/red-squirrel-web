import {Unit} from "../models/unit";
import {Injectable, OnInit} from '@angular/core';
import { Http, Response, Headers }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";

@Injectable()

export class ApiService implements OnInit{

  private headers = new Headers({'Content-Type': 'application/json'});
  private dataStore: {  // This is where we will store our data in memory
    units: Unit[]
  };

  baseUri : string = 'http://localhost:5000/api/'//"https://redsquirrel.io/api/";
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
    this.getUnits();
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

  addUnit(unit: Unit){
    var payload =  JSON.stringify(unit);
    console.log(payload);

    this.http.post(this.baseUri + 'units', payload,  {headers: this.headers})
      .subscribe(
        () => {
          this.dataStore.units.push(unit);
          this.updateUnitSubscriptions();
          return true;
        }, error => console.log(error)
      );
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

  private updateUnitSubscriptions(){
    this._units.next(Object.assign({}, this.dataStore).units);
  }

  private extractData(res: Response) {

        let body = res.json();
        let resp = body || { };

        return resp;
    };
}
