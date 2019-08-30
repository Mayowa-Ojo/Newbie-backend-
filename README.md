# <p align="center">newbie.dev </p>
open source publishing platform tailored for entry level developers

## Overview
newbie.dev backend is written in Node.js and uses MongoDB for data persistence

## Installation
Clone this repository to your project folder and run `npm run dev-start` in your terminal.

```
  $ mkdir <project name>
  $ cd <project name>
  $ git clone https://github.com/Mayowa-Ojo/Newbie-backend-.git
  $ npm install
  $ npm run dev-start
```

### Prerequisite Tools
* Node.js (version 8+)

## Folder structure
> The current folder structure looks like this:
```
root
  |____src
        |_____  controllers
            |__ middlewares
            |__ models
            |__ public
            |__ routes

```

## Making requests
You can make requests from a frontend or through an APM or your browser
> Don't worry about cors, we have that covered. 

### available routes

| Routes | Query | HTTP method | End-point |
| ------ | ------|        ---: | ---------|
| Posts  | get all posts | GET | /api/posts |
|        | get single post | GET | /api/posts/:id |
|        | create post | POST | /api/posts |
|        | update a post | PUT | /api/posts/:id |
|        | delete a post | DELETE | /api/posts/:id |
|        | update likes | PUT | /api/posts/:id/likes |
| comments | get all comments | GET | /api/posts/:id/comments |
|          | get single comment | GET | /api/posts/:id/comments/:comment_id |
|          | create a comment | POST | /api/posts/:id/comments |
|          | edit a comment | PUT | /api/posts/:id/comments/:comment_id |
|          | delete a comment | DELETE | /api/posts/:id/comments/:comment_id |
|          | update likes | PUT | /api/posts/:id/comments/:comment_id/likes |
| comment-replies | get all replies | GET | /api/posts/:id/comments/:comment_id/replies |
|                  | get single reply | GET | /api/posts/:id/comments/:comment_id/replies/:reply_id |
|                  | create a reply | POST | /api/posts/:id/comments/:comment_id/replies |
|                  | edit a reply | PUT | /api/posts/:id/comments/:comment_id/replies/:reply_id |
|                  | delete a reply | DELETE | /api/posts/:id/comments/:comment_id/replies/:reply_id |
| media | create a media type | POST | /api/media |
|       | get a media type | GET | /api/media/:id |
|       | delete a media type | DELETE | /api/media/:id |

### NOTE :bulb: (on handling media)
> * Make a post request to the create media route.<br>
> * Embed the media id(s) in the "**mediaIds**" field in the meta field of the post body.<br>
> * Make the post request to the create post route.
> * When making a get single post request, the post will be populated with the media documents. 

