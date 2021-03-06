res1 = db.createCollection("resources");

if (res1.ok) {
    print("Collection resources ok.");

    print("Creating default user ...");

    //qwertyuiop
    res2 = db.resources.insertOne({       
        "id": "2819c223-7f76-453a-919d-ab1234567891",
        "externalId": "",
        "meta": {
            "created": ISODate("2010-01-23T04:56:22.000Z"),
            "lastModified": ISODate("2011-05-13T04:42:34.000Z"),
            "version": "W/\"a330bc54f0671c9\"",
            "location": "/v2/Users/2819c223-7f76-453a-919d-ab1234567891",
            "resourceType": "User"
        },
        "urn:ietf:params:scim:schemas:core:2°0:User": {
            "userName": "poiuytrewq",
            "name": {
                "givenName": "Tiffany",
                "middleName": "Geraldine",
                "honorificPrefix": "Ms.",
                "honorificSuffix": "II",
                "formatted": "Ms. Tiffany G Fork, II",
                "familyName": "Fork"
            },
            "title": "Electronic home entertainment equipment installer",
            "locale": "en-US",
            "emails": [
                {
                    "value": "tfork@example.com",
                    "type": "work",
                    "primary": true
                },
                {
                    "value": "tiffy@fork.org",
                    "type": "home"
                }
            ],
            "addresses": [
                {
                    "region": "NC",
                    "postalCode": "27401",
                    "country": "USA",
                    "type": "work",
                    "primary": true,
                    "formatted": "637 Keyser Ridge Road\nGreensboro, NC 27401 USA",
                    "streetAddress": "637 Keyser Ridge Road",
                    "locality": "Greensboro"
                },
                {
                    "type": "home",
                    "formatted": "456 Greensboro Blvd\nGreensboro, NC 27401 USA",
                    "streetAddress": "456 Greensboro Blvd",
                    "locality": "Greensboro",
                    "region": "NC",
                    "postalCode": "27401",
                    "country": "USA"
                }
            ],
            "x509Certificates": [
                {
                    "value": BinData(0, "MIIDQzCCAqygAwIBAgICEAAwDQYJKoZIhvcNAQEFBQAwTjELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFDASBgNVBAoMC2V4YW1wbGUuY29tMRQwEgYDVQQDDAtleGFtcGxlLmNvbTAeFw0xMTEwMjIwNjI0MzFaFw0xMjEwMDQwNjI0MzFaMH8xCzAJBgNVBAYTAlVTMRMwEQYDVQQIDApDYWxpZm9ybmlhMRQwEgYDVQQKDAtleGFtcGxlLmNvbTEhMB8GA1UEAwwYTXMuIEJhcmJhcmEgSiBKZW5zZW4gSUlJMSIwIAYJKoZIhvcNAQkBFhNiamVuc2VuQGV4YW1wbGUuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7Kr+Dcds/JQ5GwejJFcBIP682X3xpjis56AK02bc1FLgzdLI8auoR+cC9/Vrh5t66HkQIOdA4unHh0AaZ4xL5PhVbXIPMB5vAPKpzz5iPSi8xO8SL7I7SDhcBVJhqVqr3HgllEG6UClDdHO7nkLuwXq8HcISKkbT5WFTVfFZzidPl8HZ7DhXkZIRtJwBweq4bvm3hM1Os7UQH05ZS6cVDgweKNwdLLrT51ikSQG3DYrl+ft781UQRIqxgwqCfXEuDiinPh0kkvIi5jivVu1Z9QiwlYEdRbLJ4zJQBmDrSGTMYn4lRc2HgHO4DqB/bnMVorHB0CC6AV1QoFK4GPe1LwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQU8pD0U0vsZIsaA16lL8En8bx0F/gwHwYDVR0jBBgwFoAUdGeKitcaF7gnzsNwDx708kqaVt0wDQYJKoZIhvcNAQEFBQADgYEAA81SsFnOdYJtNg5Tcq+/ByEDrBgnusx0jloUhByPMEVkoMZ3J7j1ZgI8rAbOkNngX8+pKfTiDz1RC4+dx8oU6Za+4NJXUjlL5CvV6BEYb1+QAEJwitTVvxB/A67g42/vzgAtoRUeDov1+GFiBZ+GNF/cAYKcMtGcrs2i97ZkJMo=")
                }
            ],
            "profileUrl": "https://login.example.com/tfork",
            "preferredLanguage": "en-US",
            "active": true,
            "photos": [
                {
                    "type": "photo",
                    "value": "https://photos.example.com/profilephoto/72930000000Ccne/G"
                },
                {
                    "value": "https://photos.example.com/profilephoto/72930000000Ccne/H",
                    "type": "thumbnail"
                }
            ],
            "displayName": "Tiffany Fork",
            "userType": "Employee",
            "password": "$2a$10$vEyW14aZymJVbEcdyA2ndusnJcy4V/C1w/UDVjHIqrzb01Y1qKAhm",
            "phoneNumbers": [
                {
                    "value": "336-485-7643",
                    "type": "work"
                },
                {
                    "value": "336-485-3456",
                    "type": "mobile"
                }
            ],
            "ims": [
                {
                    "value": "tiffyaim",
                    "type": "aim"
                }
            ],
            "nickName": "Tiffy",
            "timezone": "America/Los_Angeles",
            "groups": [
                {
                    "display": "Employees",
                    "value": "fc348aa8-3835-40eb-a20b-c726e15c55b5",
                    "§ref": "/v2/Groups/fc348aa8-3835-40eb-a20b-c726e15c55b5"
                }
            ]
        },
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User"
        ]
    });

    printjson(res2)

    print("test userName done.");
}