## Authorization Code Grant Flow

`authsrv` follows the OAuth 2.0 Authorization Code Grant as specified in [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.1).

The Authorization Code Grant flow has the following steps:

* Your application redirects the user to OAuth2 authorization page.

* Upon user consent, `authsrv` redirects the user back to your application's redirect URL with an authorization code as a URL parameter.

* Your application exchanges the authorization code for an access token and refresh token.

* Your application stores the access token and refresh token. It will use the access token to make requests to the managed API. It will use the refresh token to obtain a new access token when the access token expires without having to re-prompt the user.


## Obtaining Access Token

### Making request

Terminology:

* **user agent**: The "agent" the user is using to access an app that requires OAuth2 tokens to make calls to a protected API or that requires OpenID Connect tokens. Typically, this is a browser or a mobile app.
* **client_app**: This could be a server side app, a single page app (web app), or a mobile app. In the case of a mobile app, the **user agent** is also the client app.

The **user agent** requests for a managed API. The **client_app** redirects to the authorization request.

Type: **GET**

Return: Redirect to consent_app/login page

```http
http://oauth2_endpoint/oauth2/auth?client_id=my-id&state=demostatedemostatedemo&scope=openid+offline+email&response_type=code
```

| **URI Parameter**  | Description  |
|---|---|
| client_id (*required*) | identification of your **client\_app** |
| redirect_url (*optional*) | where you should send after user grants or denies consent. It's defined inside the **client\_app**  |
| response_type (*required*)  | identify the flow type. For **Authorization Code Grant** use `code`  |
| scopes (*required*) | A delimited list of the permissions you are requesting (in this implementation *openid*, *offline* and *email* scopes are required.) |
| state (*required*) | Provides any state that might be useful to your application when the user is redirected back to your application. This parameter will be added to the redirect URI exactly as your application specifies (it's a random string) |
| nonce (*optional*) | A random string unique for a request |

**NOTE**:
 
 * **IMPORTANT**: in this case we use **my-id** as client_id
 * The mobile platforms support inter-app communication via URIs by allowing apps to register private-use URI schemes. When the app attempts to load a URI with a custom scheme, the app that registered it is launched to handle the request.   
 (more info:https://tools.ietf.org/html/draft-ietf-oauth-native-apps-12#section-7.1)  **IMPORTANT**: in this case we use **my-id://callback** as custom scheme. 

### Login and consent scopes

Authorization endpoint receives the authorization request, authenticates the user and obtains authorization.  
The **client\_app** is redirected to the **consent**; this is a web view, showing the login page for the user authentication. If the login has success, the user has to choose the scopes he wants to give access to and, in the end, the **consent** returns the authorization code to the **client\_app**. 

Note about the scopes.

* offline: Include this scope if you wish to receive a refresh token
* openid: Include this scope if you wish to perform an OpenID Connect request.

### Requesting access_token

The **client\_app** presents the authorization code at `authsrv` that validates the authorization code and issues the tokens requested

Type: **POST**

- In the Header

    | **Key** | **Value** |
    | :-----: | :-------: |
    | Accept | application/json |
    | Content-Type | application/x-www-form-urlencoded |
    | Authorization | Basic "base64 encoded client_id (in this case **my-id**)" |
    
 - In the Body 
   
    grant_type=authorization_code&code="the code you got"

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

## Retrieve the JWK public key

Type: **GET**

- In the Header

    | **Key** | **Value** |
    | :-----: | :-------: |
    | Authorization | Basic "base64 encoded client_id (in this case **my-id**)" |

Return: **Public key** for signing

```http
http://oauth2_endpoint/keys/hydra.openid.id-token/public
```

```json
{
    "keys": [
        {
            "use": "sig",
            "kty": "RSA",
            "kid": "public",
            "alg": "RS256",
            "n": "ztKhv4h-JMIT3GYFEorp0IcVObw1nhciUtfKiAQSRqcsNOYDOH_W7kuEwMSJ-_AD7Gs26IoM6CsHdG2lhZzAtTBksjXdDUB6f5DP5iVluurxIHecJtjy5RYNaNgNlkKWnfUVSEDOS6XDW4I84-LjI5Rg6bWrSHH7RmVlMWTQjRnfOIYhcOLuyeC9LIJkXCMQ6lHo_chaFcP73MggXn91g6UiqfMs-ZrWVN8_M_YpBGNjUkJGcb0prL_jGkq0VchJJScZSjcC6T8wWaYJgd3GKCcVcUNzrV_hUw-pp00ca0RpEPWQQAn33fa9NBDAnBHEJXN2HR4WYGFZn3-Q_pHabdVcGu1ISWiiuqDSO_70cFXikLXzMKwzCGJPgNubdv51cuI5fcyA66MA62SRxdDZpp6O1DauOGUAK7IV5HYpCDavTBP2znpVraSWD1YBRWyDt-h03NmSUiMY6i_OA6_N1VfM_kBh2syF8-iJBByzaT28qNkTGYX6Ksh8W6ihdpDv7cbMZdAzQsDrwuNMPimK0RF2UHvqGRPsOTtd0tjDkhlsvKlHhKwgVedqMjOfGNT6FGdaBrwGuV9CFzp7LNr0Rb2TeDjqt9_OfmXfqIZnZQY7AEmO26ljvdENSTP7xyKP4Iz8voPr5TVfdd4gz-nXkQ_525I4-kXZHJwpSpQmFNk",
            "e": "AQAB"
        }
    ]
}
```

**Note**

In this implementation the **client\_app** needs a client_secret to authenticate to OAuth2 endpoint. 
It is a SECURITY ISSUE because you never put credentials in distribuited code. Next implementations will provide a public **client\_app** without client_secret.

The **client\_app** credential used are:
* client_id: *client\_app*
* client_secret: *whatasecret*

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


