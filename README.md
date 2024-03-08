# _haveamin?_

## Description
`haveamin?` (short for _Have a minute?_) is a simple and intuitive platform for everyone where users can create events to enjoy their free time activities in group.

Create events, join them and have fun making new friends!

## Authors

- Esther Mesa - [@lextersaurus](https://github.com/lextersaurus)
- Fabio Herrera - [@OIBAFHD](https://github.com/OIBAFHD)
- Sherezade Santana - [@ShereSan](https://github.com/ShereSan)

## Tech
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)


## Installation
- Run `$ npm i` on console
- Config a `.env` file as explained on `.env.example`

## Diagram
![haveamin](https://github.com/lextersaurus/haveamin/assets/118478360/02305052-1376-4ed9-bc27-d083cbafe85f)


## Endpoints
<details>

<summary>Auth</summary>

```http
  /api/auth
```

| METHOD |  ENDPOINT | TOKEN |     ROLE    |      DESCRIPTION     | POST PARAM |   RETURN  |
| :----- | :-------- | :---- | :---------- | :------------------- | :--------- | :-------- |
| `post` | `/signup` | NO    | User        | Creates an account   | req.body   | { token } |
| `post` | `/login`  | NO    | Admin, User | Logs in with account | req.body   | { token } |

</details>

<details>

<summary>Category</summary>

```http
  /api/category
```

|  METHOD  |           ENDPOINT           | TOKEN |     ROLE    |       DESCRIPTION       |       POST PARAM      |            RETURN           |
| :------- | :--------------------------- | :---- | :---------- | :---------------------- | :-------------------- | :-------------------------- |
| `get`    | `/showall`                   | YES   | Admin, user | Get all categories      | -                     | [{ categories }]            |
| `get`    | `/show/:id`                  | YES   | Admin, user | Get one category        | category_id           | { category }                |
| `post`   | `/create`                    | YES   | Admin       | Created category        | req.body              | Category created            |
| `put`    | `/update/:id`                | YES   | Admin       | Update category         | req.body              | Category updated            |
| `delete` | `/delete/:id `               | YES   | Admin       | Delete category         | category_id           | Category deleted            |
| `put`    | `/:categoryId/add/:eventId`  | YES   | Admin, user | Add events to category  | category_id, event_id | Event added to category     |
| `delete` | `/:categoryId/quit/:eventId` | YES   | Admin, user | Quit event to category  | category_id, event_id | Event deleted from category |
| `get`    | `/:categoryId/events`        | YES   | Admin, user | Show events to category | category_id           | {events}                    |

</details>

<details>

<summary>Event</summary>

```http
  /api/event
```

|  METHOD  |    ENDPOINT   | TOKEN |     ROLE    |      DESCRIPTION     | POST PARAM |     RETURN     |
| :------- | :------------ | :---- | :---------- | :------------------- | :--------- | :------------- |
| `get`    | `/showall`    | YES   | Admin, user | Get all events       | -          | [{ events }]   |
| `get`    | `/show/:id`   | YES   | Admin, user | Get one event        | event_id   | { event }      |
| `post`   | `/create`     | YES   | Admin, user | Create event         | req.body   | Event created  |
| `put`    | `/update/:id` | YES   | Admin, user | Update event         | req.body   | Event updated  |
| `delete` | `/delete/:id` | YES   | Admin, user | Delete event         | event_id   |  Event deleted |
| `put`    | `/:id/join`   | YES   | Admin, user | Join event           | -          | Event joined   |
| `delete` | `/:id/quit`   | YES   | Admin, user | Exit event           | -          | Event quit     |
| `post`   | `/search`     | YES   | Admin, user | Search event by name | req.body   | [{events}]     |

</details>

<details>

<summary>User</summary>

```http
  /api/user
```

|  METHOD  |    ENDPOINT   | TOKEN |     ROLE    |    DESCRIPTION   | POST PARAM |    RETURN    |
| :------- | :------------ | :---- | :---------- | :--------------- | :--------- | :----------- |
| `get`    | `/showall`    | YES   | Admin, user | Get all users    | -          | [{users}]    |
| `get`    | `/show/:id`   | YES   | Admin, user | Get one user     | user_id    | {user}       |
| `post`   | `/create`     | YES   | Admin, user | Create user      | req.body   | User created |
| `put`    | `/update/:id` | YES   | Admin, user | Update user      | req.body   | User updated |
| `delete` | `/delete/:id` | YES   | Admin, user | Delete user      | user_id    | User deleted |
| `get`    | `/events`     | YES   | Admin, user | Show user events | -          | [{ events }] |


</details>
