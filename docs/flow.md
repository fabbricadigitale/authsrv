# /oauth2/auth 
## The OAuth2 authorize the endpoint

Type: **GET**
 
`http://localhost:4444/oauth2/auth?client_id=admin&state=qwertyuiop&scope=openid&response_type=code`

Returns the consent **id**    
e.g. `http://localhost:3000/login?error=Please+log+in&consent=c1767384-2875-4bdc-9549-b8d06a7bc84f`

# Get the client credentials

```bash
curl -u yourclientid:yoursecret http://localhost:4444/oauth2/token -d 'grant_type=client_credentials&scope=hydra.consent%20hydra.consent.*'
```

Returns an access token, expiration time, scope(s) and token type

```bash
{"access_token":"ps0tUn2VkTdgBSXlX38wFLDiY29OSURVDGDMx2CM440.vupm0osJQp0inHZKRQThUBeRQ97JEz32-4Pi7-jWpTY","expires_in":3599,"scope":"hydra.consent hydra.consent.*","token_type":"bearer"}
```

# /oauth2/consent/requests/id
## Receive consent request information

Type: **GET**

`http://localhost:4444/oauth2/consent/requests/c1767384-2875-4bdc-9549-b8d06a7bc84f`

It needs in the Header

| **Key** | **Value** |
| :-----: | :-------: |
| Accept | application/json |
| Content-Type | application/json |
| Authorization | "token_type" and "token" |

Returns 

```json
{
    "id": "c1767384-2875-4bdc-9549-b8d06a7bc84f",
    "requestedScopes": [
        "openid"
    ],
    "clientId": "admin",
    "expiresAt": "2017-10-12T08:28:27.789388574Z",
    "redirectUrl": "http://localhost:4444/oauth2/auth?client_id=admin&state=qwertyuiop&scope=openid&response_type=code&consent=c1767384-2875-4bdc-9549-b8d06a7bc84f"
}
```

# /oauth2/consent/requests/id/accept
## Accept a consent request

Type: **PATCH**

`http://localhost:4444/oauth2/consent/requests/c1767384-2875-4bdc-9549-b8d06a7bc84f/accept`

It needs:
 - In the Header
   
    | **Key** | **Value** |
    | :-----: | :-------: |
    | Accept | application/json |
    | Content-Type | application/json |
    | Authorization | "token_type" and "token" |
 
 - In the Body

    ```json
    {
        "subject": "admin",
        "grantScopes": [
            "openid"
        ]
    }
    ```

# Retrieve authorization_code

The redirectURL in the response of the consent/requests/id call 

`http://localhost:4444/oauth2/auth?client_id=admin&state=qwertyuiop&scope=openid&response_type=code&consent=c1767384-2875-4bdc-9549-b8d06a7bc84f`

gives you the authorization code 

e.g. `http://localhost:4445/callback?code=vWekG1O90mRPi5R5ukff4MkacdfbmeIUSK6X6Dy-_AI.eUzSsMCWDZm1Wew4FTHy5l-iAr6PMveK7CzQ_JXwMu0&scope=openid&state=1234567890`

# oauth2/token
## OAuth2 token endpoint

Type: **POST**

`http://localhost:4444/oauth2/token`

It needs:
 - In the Header

    | **Key** | **Value** |
    | :-----: | :-------: |
    | Accept | application/json |
    | Content-Type | application/x-www-form-urlencoded |
    | Authorization | Basic "base64 encoded client_id and client_secret" |
    
 - In the Body 
   
    | **Key** | **Value** |
    | :-----: | :-------: |
    | grant_type | authorization_code |
    | code | "the code you got" |
    | response_type | id_token |

Returns

```json
{
    "access_token": "rCAdkZwJzXDbFtTz71iEWJFg6Nh21aTYK2C5t_wyqnY.pt75_PsiJIXlxR7pzkdj3AZCf4ccOJudoOlCOirdi4E",
    "expires_in": 3599,
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYyIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhZG1pbiIsImF1dGhfdGltZSI6MTUwNzkwNzc3OSwiZXhwIjoxNTA3OTExMjUwLCJpYXQiOjE1MDc5MDc3NzksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDQ0NCIsIm5vbmNlIjoiNGUxZjBjNDUtMzQ0Ny00NTc5LWE1MTktMmQxMWIzZDFhNjM5Iiwic3ViIjoiYXhlbCJ9.IiiDQtivshtGbPOMHmc2uoFfsWwBfnhbqOYDKo3IQ5OV7jU30f20txRyZDPhfke0UsVSSNXQLgJDWlkKfow5ZnfIQ5gytesEwv7qhup6ZknReadZA7e-LbXyGsS2A0ghiZgjWsAiUZnqv4J9vC-mGbtQ685dj4wamsgUj9kI0zonAcve4MVFir_kWVitb9sMeS5qNjwI_jTEW0XVQ6ChdJxQxIOXWBtKkC9EBGhr2c72A868ImucvnzTncy9X8LLfUsmbkSb-76U1LaWs8etgrk4z_iimqbdL1M8WpVPIoHFStCgtBR-kPByIS2d8sHgLbaoBgrzrXJLp-58nE5sQfn57tyKqN1i-mdffLtDcsR4UPpHXPlGb-zM511iBeXu0_yuhSHgw-l-rfi4oRE0WcjKOr-spgaw7xgVS2S03C7llmFu93qtQqILqChx2seeAT_NrjomGb0B2KLurKLJB1K76ZlTj0sCiumSabGfJZgdfadD48ujCCmoyAW8KGajlfy0bhfJEEgDt0T4r-DnLoJ5fcYDQDM9Fl-hFhKy2oEQ7TNEEdv_dKnR3-1lrhFuIBwd-53gpUmbgr0_phwHK-4qQKPjFmkbrxMUtl36I8Ei_bQV0QzlBq09KF5FGnzrUTU_9tTKodJsoJ9PSulVxNMlrdyNxCdBHNSaxKE8TuM",
    "scope": "openid",
    "token_type": "bearer"
}    
```

Hydra flow with authorization code:

![flow](docs/flow.png)