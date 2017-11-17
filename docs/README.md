# Client app

The client app needs an OAuth2 configuration.
The required fields of the configuration are the clientID, clientSecret, EndpointURL and the Scopes.

It makes a call through an authorization URL (http://hydra:4444/oauth2/auth?client_id=client_app&redirect_uri=http%3A%2F%2Flocalhost%3A4445%2Fcallback&response_type=code&scope=offline+openid+email+preferredLanguage&state=demostatedemostatedemo&nonce=demostatedemostatedemo) formed by:
- EndpointURL (defined in the configuration)
- client id
- redirect url
- response type (code)
- scope(s)
- state
- nonce



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


