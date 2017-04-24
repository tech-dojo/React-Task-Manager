React Task Manager is a simple task manager built with React, Material-UI, Sequelize, and Nodejs. The project is meant for use by a small team and is very much a work in progress.

# Features and Functionalities
  - Two types of Users : Managers and Programmers.
  - Manager creates and updates tasks with estimated finishing time.
  - Manager assigns tasks to Programmers.
  - Programmers Starts/Finishes a task.
  - The task is recorded with completion time.
## Demo 
[App demo](https://quiet-sea-75197.herokuapp.com/)
Create at least two users, a Manager and a Programmer.
### Installation

Install the dependencies and devDependencies and start the server.

Provide the database url at config.js.

For development environments...
```sh
$ git clone https://github.com/tech-dojo/React-Task-Manager.git
$ npm install
$ npm run development
```

For production environments...

```sh
$ npm install
$ npm run build
$ npm run production
```
### Todos

 - Task Reporting.
 - Pagination/limiting Tasks.
 - Task ordering by complete/not-completed
 - Task Search.
 - Stronger User authentication.

### License

MIT
