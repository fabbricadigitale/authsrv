# Client app

The client app uses an hydra SDK (written in GO) to make the configuration of the OAuth2 client, so for the mobile version of the client app you should use somenthing that can make this type of configuration.

**REQUIRED FIELDS FOR THE CONFIGURATION**

```go
ClientID:     env.Getenv("HYDRA_CLIENT_ID", "client_app")
ClientSecret: env.Getenv("HYDRA_CLIENT_SECRET", "whatasecret")
EndpointURL:  env.Getenv("HYDRA_URL", "http://hydra:4444")
Scopes:       []string{"hydra.* openid offline email preferredLanguage hydra"}
```

The client app starts his own HTTP server on the port 4445

It handles two URL paths that are the home `/` and the callback `/callback`

# Home handler

The home handler will get the client app's OAuth2 configuration

```go
var config = clientApp.GetOAuth2Config()
```

Set the RedirectURL to `http://localhost:4445/callback` and set the list of scopes provided to the user to choose from

```go
config.RedirectURL = "http://localhost:4445/callback"
config.Scopes = []string{"offline", "openid", "email", "preferredLanguage"}
```

Then we will get the client app's OAuth2 config, add the state in the URL values and add the nonce

```go
var authUrl = clientApp.GetOAuth2Config().AuthCodeURL(state) + "&nonce=" + state
```

We have to replace the host in the URL from `hydra` to `localhost` due to the change of context once it will move to the consent

```go
authUrl = strings.Replace(authUrl, "hydra", "localhost", 1)
```

Last step is the rendering of the Home template.


# Callback handler

The callback handler will check the state query parameter.
Then exchange the access code for an access and a refresh token (the last one, if the offline scope is checked)

```go
token, err := clientApp.GetOAuth2Config().Exchange(context.Background(), r.URL.Query().Get("code"))
```

Last step is the rendering of the callback.html template giving the token and the IDToken interface 

```go
// Render the output
renderTemplate(w, "callback.html", struct {
    *oauth2.Token
    IDToken interface{}
}{
    Token:   token,
    IDToken: token.Extra("id_token"),
})
```

**IMPORTANT**  
**In our case we render the information of the token for the only purpose of debugging but in the real case we should render the user page of the client app**


# Starting docker

- Go into the project directory (in this case ./aaa)
- Use the command `docker-compose up -d --build`

#  Usage of the application

- `http://localhost:4445` opens up the client application 
    - client application consists in a single button that make a call to the consent app's login handler (eg `http://localhost:3000/login?consent="HERE_WILL_BE_THE_CONSENT"`)
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
- Logout will return to the client application `http://localhost:4445` deleting the session

# Take down docker

- Use the command `docker-compose down --remove-orphans`
- Remove the images `docker rmi aaa_consent aaa_client aaa_hydra aaa_scim aaa_storage aaa_mongo-init`
- Remove the volumes `docker volume prune`


