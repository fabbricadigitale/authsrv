## Authorization Code Grant Flow

`authsrv` follows the OAuth 2.0 Authorization Code Grant as specified in [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.1).

The Authorization Code Grant flow has the following steps:

* Your application redirects the user to OAuth2 authorization page.

* Upon user consent, `authsrv` redirects the user back to your application's redirect URL with an authorization code as a URL parameter.

* Your application exchanges the authorization code for an access token and refresh token.

* Your application stores the access token and refresh token. It will use the access token to make requests to the managed API. It will use the refresh token to obtain a new access token when the access token expires without having to re-prompt the user.


## Obtaining Access Token

### Legend:
* **user agent**: The "agent" the user is using to access an app that requires OAuth2 tokens to make calls to a protected API or that requires OpenID Connect tokens. Typically, this is a browser or a mobile app.
* **client_app**: This could be a server side app, a single page app (web app), or a mobile app. In the case of a mobile app, the **user agent** is also the client app.

### Making request

**user agent** requests for a managed API. The **client_app** redirects to the authorization request.

Type: **GET**

Return: Redirect to consent_app/login page

```http
http://oauth2_endpoint/oauth2/auth?client_id=client_app&redirect_uri=http://localhost:4445/callback&response_type=code&scope=offline+openid+email+preferredLanguage&state=demostatedemostatedemo&nonce=demostatedemostatedemo
```

| **URI Parameter**  | Description  |
|---|---|
| client_id (*required*) | identification of your **client_app**  |
| redirect_url (*required*) | where you should send after user grants or denies consent  |
| response_type (*required*)  | identify the flow type. For **Authorization Code Grant** use `code`  |
| scopes (*required*) | A delimited list of the permissions you are requesting (in this implementation *openid*, *offline* and *email* scopes are required.) |
| state (*required*) | Provides any state that might be useful to your application when the user is redirected back to your application. This parameter will be added to the redirect URI exactly as your application specifies |
| nonce (*optional*) | A random string unique for a request |


### Get the consent

Authorization endpoint receives the authorization request, authenticates the user and obtains authorization.
The **client\_app** receives the *consent_id*, logs user in and redirect to consent list page.

**Note** about the scopes.

* offline: Include this scope if you wish to receive a refresh token
* openid: Include this scope if you wish to perform an OpenID Connect request.
        
### Requesting the authorization code

**client\_app** request the authorization code

type: **GET**

Return: Authorization code

```http
http://oauth2_endpoint/oauth2/auth?client_id=admin&state=qwertyuiop&scope=offline+openid+email+preferredLanguage&response_type=code&consent=consent_id
```

### Requesting access_token

The **client\_app** presents the authorization code at `authsrv` that validates the authorization code and issues the tokens requested

Type: **POST**

Return: Requested **access\_token**

```http
http://oauth2_endpoint/oauth2/token
```

```json
{  
   "AccessToken":"ZBQAPjXdAE2ZI0piaqEZWOXn1_moS8bze4Xcyopnqfc.Lv1yJpLQeXBxYDHuDAYCYAD0h2Ognax83Vbr-ta7a4U",
   "TokenType":"bearer",
   "RefreshToken":"",
   "Expiry":"2017-11-20 12:12:20.545790417 +0000 UTC m=+3915.105349933",
   "ID Token":"eyJ..."
}
```

The **client\_app** stores **access\_token** and will use it in the following request for managed API.

## Refresh Token

An access token intentionally is short lived. This is an important security mechanism of OAuth 2.0.

To request the refresh token it's necessary to consent the *offline* scope

```json
{  
   "AccessToken":"hGQ3flUzzq1ByFwJM0-aOifpVE3fvfuYJiBHvshQGwo.eMLGmeAl5KWw4UG1yIUYsgo8_Ud0wuJfvblyQAQcBB4",
   "TokenType":"bearer",
   "RefreshToken":"p6pZZ15aieVQ-rh-8hVJi8vPfUNz-rD1bbICWEMK-1I.8wURLB92eoQivieNSHUJdZe7KTiGoWudswTg4-wkbyc",
   "Expiry":"2017-11-20 12:49:18.516875355 +0000 UTC m=+5499.676643883",
   "ID Token":""
}
```





# Starting docker

- Go into the project directory (in this case ./aaa)
- Use the command `docker-compose up -d --build`

# Usage of the application

- `http://localhost:4445` opens up the client_application 
    - client_application consists in a single button that make a call to the consent app's login handler (eg `http://localhost:3000/login?consent="HERE_WILL_BE_THE_CONSENT"`)
- Insert the credential of the created user by default 
    - Username: poiuytrewq
    - Password: qwertyuiop
- Once the submit button is clicked it will check the credentials and if they are correct it will make a call to the consent app's consent handler (eg `http://localhost:3000/consent?consent="HERE_WILL_BE_THE_SAME_CONSENT"`)
- The consent app will let you choose the scopes you want to give access to (openid is REQUIRED to get the id_token), so you can choose between these EXAMPLES scopes:
    - openid (REQUIRED)
    - offline (to generate a refresh_token)
    - email (to get the user email as an extra for the id_token)
    - preferredLanguage (to get the preferred language of the user as an extra for the id_token)
- The submit button will make a call to the callback handler (eg `http://localhost:4445/callback?code=pOOVTqUkyPneIVTChxKgK9dhzJ2dsG-SjNWn1JXJY28.hB6rcG-UWoCRWLDSdAlCAuwg-RCpHd4pg6V803wJo7Y&scope=openid%20email%20preferredLanguage&state=demostatedemostatedemo`) that in this case will show that the OAuth2 authorization was performed succcessfully displaying:
    - access token
    - token type
    - refresh token
    - expiry
    - id token
- Logout will return to the client_application `http://localhost:4445` deleting the session

# Take down docker

- Use the command `docker-compose down --remove-orphans`
- Remove the images `docker rmi aaa_consent aaa_client aaa_hydra aaa_scim aaa_storage aaa_mongo-init`
- Remove the volumes `docker volume prune`


