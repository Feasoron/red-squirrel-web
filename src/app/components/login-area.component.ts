import { Component } from '@angular/core';
import { AuthService } from'../services/auth.service';
import {ApiService} from '../services/api-service';

@Component({
  selector: 'login-area',
  templateUrl: 'login-area.component.html',
  providers: [AuthService]
})

export class LoginAreaComponent  {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }

}
