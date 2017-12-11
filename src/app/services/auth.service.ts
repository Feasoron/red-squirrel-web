import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from '../auth0-variables';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    audience: 'https://redsquirrel.io',
    aud: 'https://redsquirrel.io',
    redirectUri: AUTH_CONFIG.REDIRECT,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor(public router: Router, private authHttp: AuthHttp) {}

  public login(): void {
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: 'https://redsquirrel.io',
      aud: 'https://redsquirrel.io',
      scope: AUTH_CONFIG.SCOPE
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // Hit the server to let it know we have a user logged in. Later, we'll move this out
    this.authHttp.get('http://localhost:5000/api/accounts/').map(response => response.json())
      .subscribe(() => {
        console.log('responded');
        return true;
      },
      (err) => {
        console.log(err);
        return false });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
