import { Component } from '@angular/core';
import { AuthService } from'../services/auth.service';

@Component({
  selector: 'app-authorized-area',
  templateUrl: 'authorized-area.component.html',
  providers: [AuthService]
})

export class AuthorizedAreaComponent  {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
