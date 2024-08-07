# BiteSpeed Backend Task

### Tech Stack

- Backend: Node.js, Express.js, Jwt
- Database: PostgreSQL
- Deploy: Render



## test endpoint: https://bitespeed-3nnk.onrender.com/api

### API Endpoints

### PostContact

- **Description** : Post a new contact info
- **Method**: POST
- **Endpoint**: `/postContact`
- **Request Body**:
  ```json
  {
    "id": "Int",
    "phoneNumber": "String?",
    "email": "String?",
    "linkedId": "Int?", // the ID of another Contact linked to this one
    "linkPrecedence": "secondary|primary", // "primary" if it's the first Contact in th
    "createdAt": "DateTime",
    "updatedAt": "DateTime",
    "deletedAt": "DateTime?"
  }
  ```
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "msg": "record saved"
  }
  ```

### Get All Contacts

- **Description** : get all contacts from the db
- **Method**: GET
- **Endpoint**: `/get`
- **Request Body**:

  ```json
  {}
  ```

- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "id": "Int",
    "phoneNumber": "String?",
    "email": "String?",
    "linkedId": "Int?", // the ID of another Contact linked to this one
    "linkPrecedence": "secondary|primary", // "primary" if it's the first Contact in th
    "createdAt": "DateTime",
    "updatedAt": "DateTime",
    "deletedAt": "DateTime?"
  }
  ```

#### Identify a contact

- **Description** : identify a contact
- **Method**: POST
- **Endpoint**: `/identify`
- **Request Body**:

```json
{
  "email": "string?",
  "phoneNumber": "number?"
}
```

- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
  "contact":{
  "primaryContatctId": "number",
  "emails": "string"[], // first element being email of primary contact
  "phoneNumbers": "string"[], // first element being phoneNumber of primary contact
  "secondaryContactIds": "number"[] // Array of all Contact IDs that are "secondary"
  }
  }
  ```
