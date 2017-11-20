## Authorization Code Grant Flow

`authsrv` follows the OAuth 2.0 Authorization Code Grant as specified in [RFC 6749](https://tools.ietf.org/html/rfc6749#section-4.1).

The Authorization Code Grant flow has the following steps:

* Your application redirects the user to OAuth2 authorization page.

* Upon user consent, `authsrv` redirects the user back to your application's redirect URL with an authorization code as a URL parameter.

* Your application exchanges the authorization code for an access token and refresh token.

* Your application stores the access token and refresh token. It will use the access token to make requests to the managed API. It will use the refresh token to obtain a new access token when the access token expires without having to re-prompt the user.


## Obtaining Access Token

### Making request

User Agent requests for a managed endpoint. The client_app opens a browser tab with the authorization request.

Type: **GET**

Return: Redirect to consent_app/login page

```http
http://hydra:4444/oauth2/auth?client_id=client_app&redirect_uri=http://localhost:4445/callback&response_type=code&scope=offline+openid+email+preferredLanguage&state=demostatedemostatedemo&nonce=demostatedemostatedemo
```

| **URI Parameter**  | Description  |
|---|---|
| client_id (*required*) | identification of your client_app  |
| redirect_url (*required*) | where you should send after user grants or denies consent  |
| response_type (*required*)  | identify the flow type. For **Authorization Code Grant** use `code`  |
| scopes (*required*) | A delimited list of the permissions you are requesting |
| state (*required*) | Provides any state that might be useful to your application when the user is redirected back to your application. This parameter will be added to the redirect URI exactly as your application specifies |
| nonce (*optional*) | A random string unique for a request |

### Get the consent

Authorization endpoint receives the authorization request, authenticates the user and obtains authorization.
The client_app receives the *consent_id*, logs user in and redirect to consent list page.
        
###  Redirect back, requesting for the authorization code

Client receives the authorization code from the redirect URI

type: **GET**

Return: **code** to request an id_token

```http
http://hydra:4444/oauth2/auth?client_id=client_app&redirect_uri=http://localhost:4445/callback&response_type=code&scope=offline+openid+email+preferredLanguage&state=demostatedemostatedemo&nonce=demostatedemostatedemo&consent_id
```

### OAuth2 redirects to managed endpoint

Client_app presents the authorization code at `authsrv` that validates the authorization code and issues the tokens requested

type: **GET**

Return: Requested token 

```http
http://localhost:4445/callback&code=code_id&scope=offline+openid+email+preferredLanguage&state=demostatedemostatedemo&nonce=demostatedemostatedemo
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


