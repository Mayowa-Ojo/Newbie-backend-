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
  $ npm run dev
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

| Routes | Query | HTTP method | End-point | Payload |
| ------ | ------|        ---: | ---------| -------: |
| Posts  | get all posts | GET | /api/posts | < nil >
|        | get single post | GET | /api/posts/:id | < nil >
|        | create post | POST | /api/posts | { title: "< insert title >", content: "< insert post >" }
|        | update a post | PUT | /api/posts/:id | { title: "< insert updated title >", content: "< insert updated post >" }
|        | delete a post | DELETE | /api/posts/:id | < nil >
|        | update likes | PUT | /api/posts/:id/likes | < nil >
| comments | get all comments | GET | /api/posts/:id/comments | < nil >
|          | get single comment | GET | /api/posts/:id/comments/:comment_id | < nil >
|          | create a comment | POST | /api/posts/:id/comments | { content: "< insert comment here > " }
|          | edit a comment | PUT | /api/posts/:id/comments/:comment_id | { content: "< insert edited comment here >" }
|          | delete a comment | DELETE | /api/posts/:id/comments/:comment_id | < nil >
|          | update likes | PUT | /api/posts/:id/comments/:comment_id/likes | < nil >
| comment-replies | get all replies | GET | /api/posts/:id/comments/:comment_id/replies | < nil >
|                  | get single reply | GET | /api/posts/:id/comments/:comment_id/replies/:reply_id | < nil >
|                  | create a reply | POST | /api/posts/:id/comments/:comment_id/replies | { content: "< enter comment reply here >" }
|                  | edit a reply | PUT | /api/posts/:id/comments/:comment_id/replies/:reply_id | { content: "< enter edited comment reply here >" }
|                  | delete a reply | DELETE | /api/posts/:id/comments/:comment_id/replies/:reply_id | < nil >
| media | create a media type | POST | /api/media | < file or url >
|       | get a media type | GET | /api/media/:id | < nil >
|       | delete a media type | DELETE | /api/media/:id | < nil >

### NOTE :bulb: (on handling media)
> * Make a post request to the create media route with payload -> `file` and enctype -> `multipart/form-data`.<br>
> * You a response json with the media id and cloudinary url
> * Embed the media id(s) in the "**mediaIds**" field in the meta field of the post body.<br>
> * Make the post request to the create post route.
> * When making a get single post request, the post will be populated with the media documents. 

## Taks 
- [x] Scaffold backend application

