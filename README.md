React Task Management is a simple task manager built with React, Material-ui, Sequelize, and Nodejs.The project was meant to be used by a small team and very much a work in progress.

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

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
