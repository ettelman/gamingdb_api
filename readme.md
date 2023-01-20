# GamingDB API

Sourcecode for GamingDB API using mongodb and express.
## Links
API is unpublished.

## Using the API


| Method       | Adress           | Description  |
| ------------- | ------------- | ----- |
| GET      | /games | Get all games |
| GET     | /games/id |   Get game with specified ID |
| POST | /games | Add a new game into the DB using a JSON-object |
| PATCH | /games/id | Edit a game with specified ID |
| DELETE | /games/id | Delete game with specified ID |

Json-object for a new game must look like this: <br />
`
{
  "name" : "string",
  "year" : "integer",
  "genre" : string,
  "platform" : string,
  "score" : integer or array (with integers)
}
`