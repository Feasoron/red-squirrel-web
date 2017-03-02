/**
 * Created by chris on 3/1/17.
 */
import { Food } from './food'
import { Location } from './location'
import { Unit } from './unit'

export class Inventory{
  id: number;
  food: Food;
  amount: number;
  unit: Unit;
  location: Location;
}
