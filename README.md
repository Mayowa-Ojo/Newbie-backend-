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
home
  |____src
        |_____ controllers
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
| ------ | ------| ----------  | -----------|
| Posts  | get all posts | GET | /api/posts |
|        | get single post | GET | /api/posts/:id |
|        | create post | POST | /api/posts |
|        | update a post | PUT | /api/posts/:id |
|        | delete a post | DELETE | /api/posts/:id |

