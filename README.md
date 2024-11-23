# IlmConnect REST API
Submission for Technology Sisters Hackathon November 2024 API

## Users

### GET

<b>{api}/user/{userKey}</b>

This endpoint allows users to retrieve all the existing user data for the specified user key parameter. A successful request will return a HTTP status of <strong>200.</strong>


```
// EXAMPLE RESPONSE

{
    "status": 200,
    "message": "User returned successfully",
    "response": {
        "userKey": "57008a81-45be-456b-ad09-bbc6f7d465e3",
        "firstName": "Will",
        "lastName": "Smithsonian",
        "email": "willsmith@gmail.com",
        "timezone": "GMT+9",
        "state": "Kentucky",
        "country": "United States of America",
        "dateJoined": "2024-11-18T02:24:36.738Z"
    }
}

```

### POST

<b>{api}/user/register</b>

This endpoint allows users to create a new user entity. The body of the requests follows the below schema:


```
// REQUEST BODY

{
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "timezone": "",
    "state": "",
    "country": ""
}
```

This endpoint will return the newly created entity. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "User created successfully",
    "response": {
        "userKey": "57008a81-45be-456b-ad09-bbc6f7d465e3",
        "firstName": "Will",
        "lastName": "Smithsonian",
        "email": "willsmith@gmail.com",
        "timezone": "GMT+9",
        "state": "Kentucky",
        "country": "United States of America",
        "dateJoined": "2024-11-18T02:24:36.738Z"
    }
}
```

<b>{api}/user/login</b>

This endpoint allows users to login. The body of the requests follows the below schema:


```
// REQUEST BODY

{
    "email": "",
    "password": ""
}
```

This endpoint will return the an existing entity that is associated with the email and password combination. A successful request will have a status of <strong>200.</strong>

```
// RESPONSE

{
    "status": 200,
    "message": "User authenticated successfully",
    "response": {
        "userKey": "57008a81-45be-456b-ad09-bbc6f7d465e3",
        "firstName": "Will",
        "lastName": "Smithsonian",
        "email": "willsmith@gmail.com",
        "timezone": "GMT+9",
        "state": "Kentucky",
        "country": "United States of America",
        "dateJoined": "2024-11-18T02:24:36.738Z"
    }
}
```

### PUT

<b>{api}/user/update/{userKey}</b>

This endpoint allows users to modify existing data for the specified user associated with the user key parameter. The body of the requests follows the below schema:


```
// REQUEST BODY

{
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "timezone": "",
    "state": "",
    "country": ""
}
```

Not all data has to be supplied within the request body. Only fields that are not empty will be modified. This endpoint will return a message stating the fields have been modified. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "User information updated successfully"
}
```

<b>{api}/user/update/password/{userKey}</b>

This endpoint allows users to modify the existing password for the specified user associated with the user key parameter. The body of the requests follows the below schema:


```
// REQUEST BODY

{
    "password": ""
}
```

This endpoint will return a message stating the password has been modified. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "User password updated successfully"
}
```

### DELETE

<b>{api}/user/delete/{userKey}</b>

This endpoint allows users to delete existing users for the specified user associated with the user key parameter. 

his endpoint will return a message stating the user has been deleted. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "User deleted successfully"
}
```

