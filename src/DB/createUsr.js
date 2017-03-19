var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');

var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

var User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  user_Name: {
    type: Sequelize.STRING
  },
  First_Name: {
    type: Sequelize.STRING
  },
  Last_Name: {
    type: Sequelize.STRING
  },
  Positions: {
    type: Sequelize.STRING
  },
},
{
  timestamps: false,
});

var Task = sequelize.define('task', {
  Created_By: {
    type: Sequelize.BIGINT,
  },
  Task_Name: {
    type: Sequelize.STRING
  },
  Created_On: {
    type: Sequelize.DATE,
    allowNull: true
  },
  Started_On: {
    type: Sequelize.DATE,
    allowNull: true
  },
  Completed_On: {
    type: Sequelize.DATE,
    allowNull: true
  },
  Assigned_To: {
    type: Sequelize.STRING
  },
},
{ timestamps: false,
});
// app.get('/test', function(req, res){
//
//
//   res.json({name:"john",id:1});
// });
app.post('/api/user/create', function(req, res) {
  User.create({
   id: new Date().valueOf(),
   user_Name: req.body.user_Name,
   First_Name: req.body.First_Name,
   Last_Name: req.body.Last_Name,
   Positions: req.body.Positions
 }).then(function (){
   User.findOne({ where: {user_Name:'henru34'} }).then(function(users) {
       Task.create({
         Created_By: users.id,
         Task_Name: req.body.Task_Name,
         Created_On: req.body.Created_On,
         Assigned_To: req.body.Assigned_To
       });
     })
   })
    res.send("yes");
});

User.sync({force: false});
Task.sync({force: false});

app.listen(3000);
