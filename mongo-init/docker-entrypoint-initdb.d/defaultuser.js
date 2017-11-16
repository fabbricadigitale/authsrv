res1 = db.createCollection("users");

if (res1.ok) {
    print("Collection users ok.");

    data = "2017-11-16T09:13:32Z";
    rest = "User";
    iden = "290b2138-f534-4adc-8a9d-3e9bb8e4a9b1";
    vers = "W/\"NN0+Py8B8QekZHi73kre2MmcQHk=\"";

    print("Creating default user ...");

    res2 = db.users.insertOne({
        "userName": "poiuytrewq",
        "password": "qwertyuiop",
        "emails": [
            {
                "value": "thisisthemail@mail.com",
                "primary": true
            }
        ],
        "preferredLanguage" : "italian",
        "meta": {
            "created": data,
            "lastModified": data,
            "version": vers,
            "resourceType": rest,
            "location": "http://scim:4448/v2/" + rest + "/" + iden // (fixme)
        },
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:" + rest
        ]
    });

    printjson(res2)
}