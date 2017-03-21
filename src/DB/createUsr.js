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
    type: Sequelize.STRING,
    unique: true
  },
  First_Name: {
    type: Sequelize.STRING
  },
  Last_Name: {
    type: Sequelize.STRING
  },
  User_Type: {
    type: Sequelize.STRING
  },
},
{
  timestamps: false,
});

var Task = sequelize.define('task', {
  Created_By: {
    type: Sequelize.BIGINT
  },
  Task_Name: {
    type: Sequelize.STRING
  },
  Created_On: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  },
  Assigned_To: {
    type: Sequelize.STRING
  },
  Started_On: {
    type: Sequelize.DATE,
    allowNull: true
  },
  Completed_On: {
    type: Sequelize.DATE,
    allowNull: true
  },
},
{ timestamps: false,
});
// app.get('/test', function(req, res){
//
//
//   res.json({name:"john",id:1});
// });
// User.findById(id).then(function(user) {
//   if(user){
//     user.updateAttributes({
//       user_Name: req.body.user_Name,
//       First_Name: req.body.First_Name,
//       Last_Name: req.body.Last_Name,
//       User_Type: req.body.User_Type
//     }).then(function(){
//       res.send(user);
//     });
//   }
// })



app.post('/api/user/create', function(req, res) {
  User.create({
   id: new Date().valueOf(),
   user_Name: req.body.user_Name,
   First_Name: req.body.First_Name,
   Last_Name: req.body.Last_Name,
   User_Type: req.body.User_Type
 })
    res.send("yes");
});

app.get('/api/user/all', function(req, res) {
  User.findAll().then(function(user){
    res.json(user);
  })
});

app.get('/api/user/:ID', function(req, res) {

  var id = req.params.ID;

  User.findById(id).then(function(user){
    res.json(user);
  })
});

app.get('/api/programmer', function(req, res) {
    User.findAll({
        where: {
            User_Type:"Programmer"
        }
    }).then(function(user) {
        res.json(user);
    })
});


app.post('/api/task/create', function(req, res){
      Task.create({
        Created_By: req.body.Created_By,
        Task_Name: req.body.Task_Name,
        Assigned_To: req.body.Assigned_To
      })
      res.send("yes");
});

app.get('/api/task/all', function(req, res) {
  Task.findAll().then(function(task){
    res.json(task);
  })
});




app.put('/api/user/update/:ID', function(req, res) {
  var uid = req.params.ID;
  console.log(req.body.User_Type);


  User.update(
    { user_Name: req.body.user_Name,
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      User_Type: req.body.User_Type
     },
    { where: { id: uid }
  }).then(function(user){
    console.log(user);

  }).catch(function(e) {
    console.log("Project update failed !");
});

  res.send("yes");
});


User.sync({force: false});
Task.sync({force: false});

app.listen(3000);
