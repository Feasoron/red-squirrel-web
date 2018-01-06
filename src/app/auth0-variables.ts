interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'gvI7avZ3InJBylWShAhWvox9GLkgCPC5',
  CLIENT_DOMAIN: 'redsquirrel.auth0.com',
  AUDIENCE: 'https://redsquirrel.io',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile email'
};

/*
clientID: 'gvI7avZ3InJBylWShAhWvox9GLkgCPC5',
  domain: 'redsquirrel.auth0.com',
  responseType: 'token id_token',
  audience: 'https://redsquirrel.auth0.com/userinfo',
  redirectUri: 'http://localhost:4200/callback',
  scope: 'openid'
  */
