import {Unit} from "../models/unit";
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Created by chris on 3/1/17.
 */
@Injectable()

export class ApiService{
  constructor(private http: Http) {}

  baseUri : string = "http://redsquirrel.io/api/";

  getUnits() :Observable<Unit[]> {

    return this.http
      .get(this.baseUri + 'units')
      .map(response => response.json().data as Unit[]);
  }
}
