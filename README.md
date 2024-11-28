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

### POST

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

his endpoint will return a message stating the user has been deleted. A successful request will have a status of <strong>200.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "User deleted successfully"
}
```

## Profile

### GET

<b>{api}/profile/user/{userKey}</b>

This endpoint allows users to retrieve the existing profile data for the specified user key parameter. A successful request will return a HTTP status of <strong>200.</strong>


```
// EXAMPLE RESPONSE

{
    "status": 200,
    "message": "Profile returned successfully",
    "response": {
        "userKey": "0e25d22c-8cf8-4432-b6fc-f02365055ec7",
        "profileKey": "f5920390-612b-49a9-876e-2207a220d084",
        "bookingLink": "",
        "currentCompany": "Walmart",
        "description": "I love baking and becoming a great person doing things I love. Do you love to bake as well? Reach out!",
        "portfolioLink": "",
        "profilePictureLink": "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
        "profileType": "Mentor",
        "displayName": "Bob's Baker",
        "profession": "Baker",
        "yearsOfExperience": 0,
        "skills": [
            "dancing",
            "smiling",
            "Reading"
        ]
    }
}

```

### GET

<b>{api}/profile/{userKey}</b>

This endpoint allows users to retrieve the existing profile data for the specified profile key parameter. A successful request will return a HTTP status of <strong>200.</strong>


```
// EXAMPLE RESPONSE

{
    "status": 200,
    "message": "Profile returned successfully",
    "response": {
        "userKey": "0e25d22c-8cf8-4432-b6fc-f02365055ec7",
        "profileKey": "f5920390-612b-49a9-876e-2207a220d084",
        "bookingLink": "",
        "currentCompany": "Walmart",
        "description": "I love baking and becoming a great person doing things I love. Do you love to bake as well? Reach out!",
        "portfolioLink": "",
        "profilePictureLink": "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
        "profileType": "Mentor",
        "displayName": "Bob's Baker",
        "profession": "Baker",
        "yearsOfExperience": 0,
        "skills": [
            "dancing",
            "smiling",
            "Reading"
        ]
    }
}

```

### GET

<b>{api}/profile/mentors</b>

This endpoint allows users to retrieve the existing profile data for all mentors. A successful request will return a HTTP status of <strong>200.</strong>


```
// EXAMPLE RESPONSE

{
    "status": 200,
    "message": "Mentors returned successfully",
    "response": [
    {
        "userKey": "0e25d22c-8cf8-4432-b6fc-f02365055ec7",
        "profileKey": "f5920390-612b-49a9-876e-2207a220d084",
        "bookingLink": "",
        "currentCompany": "Walmart",
        "description": "I love baking and becoming a great person doing things I love. Do you love to bake as well? Reach out!",
        "portfolioLink": "",
        "profilePictureLink": "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
        "profileType": "Mentor",
        "displayName": "Bob's Baker",
        "profession": "Baker",
        "yearsOfExperience": 0,
        "skills": [
            "dancing",
            "smiling",
            "Reading"
        ]
    },
    {..}
]
}

```

### POST

<b>{api}/profile/create</b>

This endpoint allows users to create a new profile entity. The body of the requests follows the below schema:


```
// REQUEST BODY

{
        "userKey": "",
        "bookingLink": "",
        "currentCompany": "",
        "description": "",
        "portfolioLink": "",
        "profilePictureLink": "",
        "profileType": "",
        "displayName": "",
        "profession": "",
        "yearsOfExperience": 0
}
```

This endpoint will return the newly created entity. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "Profile created successfully",
    "response": {
        "userKey": "0e25d22c-8cf8-4432-b6fc-f02365055ec7",
        "profileKey": "f5920390-612b-49a9-876e-2207a220d084",
        "bookingLink": "",
        "currentCompany": "Walmart",
        "description": "I love baking and becoming a great person doing things I love. Do you love to bake as well? Reach out!",
        "portfolioLink": "",
        "profilePictureLink": "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
        "profileType": "Mentor",
        "displayName": "Bob's Baker",
        "profession": "Baker",
        "yearsOfExperience": 0,
        "skills": [
            "dancing",
            "smiling",
            "Reading"
        ]
    }
}
```

### PUT

<b>{api}/profile/update/{profileKey}</b>

This endpoint allows users to modify existing data for the specified profile associated with the profile key parameter. The body of the requests follows the below schema:


```
// REQUEST BODY

{
        "bookingLink": "",
        "currentCompany": "",
        "description": "",
        "portfolioLink": "",
        "profilePictureLink": "",
        "profileType": "",
        "displayName": "",
        "profession": "",
        "yearsOfExperience": 0
}
```

Not all data has to be supplied within the request body. Only fields that are not empty will be modified. This endpoint will return a message stating the fields have been modified. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "Profile information updated successfully"
}
```

### DELETE

<b>{api}/profile/delete/{profileKey}</b>

This endpoint allows users to delete an existing profile for the specified profile associated with the profile key parameter. 

This endpoint will return a message stating the user has been deleted. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "Profile deleted successfully"
}
```

## Skills

### POST

<b>{api}/skill/create</b>

This endpoint allows users to create a new skill entity. The body of the requests follows the below schema:


```
// REQUEST BODY

{
        "profileKey": "",
        "skill": ""
}
```

This endpoint will return the newly created entity. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "Skill created successfully",
    "response": {
        "profileKey": "f5920390-612b-49a9-876e-2207a220d084",
        "skills": "dancing"
    }
}
```


### DELETE

<b>{api}/skill/delete/{profileKey}?skill={skill}</b>

This endpoint allows users to delete th existing skill associated with the skill query parameter and profile key parameter. 

This endpoint will return a message stating the user has been deleted. A successful request will have a status of <strong>201.</strong>

```
// RESPONSE

{
    "status": 201,
    "message": "Skill deleted successfully"
}
```

