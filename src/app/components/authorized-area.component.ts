import { Component } from '@angular/core';
import { AuthService } from'../services/auth.service';
import {ApiService} from '../services/api-service';

@Component({
  selector: 'authorized-area',
  templateUrl: 'authorized-area.component.html',
  providers: [AuthService]
})

export class AuthorizednAreaComponent  {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
