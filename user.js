var express = require('express');
var Sequelize = require('sequelize');
var app = express();
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
var cors = require('cors')
var bodyparser = require('body-parser');


//  pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
//  pg_ctl -D /usr/local/var/postgres stop -s -m fast

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());
var User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  user_name: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  },
  user_type: {
    type: Sequelize.STRING
  },
},
{
  timestamps: false,
});

var Task = sequelize.define('task', {
  task_id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  created_by: {
    type: Sequelize.STRING
  },
  task_name: {
    type: Sequelize.STRING
  },
  created_on: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  assigned_to: {
    type: Sequelize.STRING
  },
  started_on: {
    type: Sequelize.DATE,
    allowNull: true
  },
  completed_on: {
    type: Sequelize.DATE,
    allowNull: true
  },
  estimated_time: {
    type: Sequelize.INTEGER,
    allowNull: false
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

//app.use(express.static('public'))

app.post('/api/user/create', function(req, res) {
  console.log(req.body);
  User.create({
   id: new Date().valueOf(),
   user_name: req.body.user_name,
   password: req.body.password,
   user_type: req.body.user_type
 })
    res.send("yes");
});

app.post('/api/user/signin', function(req, res) {
    console.log(req.body);
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    }).then(function(user) {
            if (req.body.password === user.password) {
                res.json(user)
            } else {
                res.send("Mismatch")
            }
    }).catch(function(error) {
        console.log("Mismatch");
    })
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
        task_id:new Date().valueOf(),
        created_by: req.body.created_by,
        task_name: req.body.task_name,
        assigned_to: req.body.assigned_to,
        estimated_time: req.body.estimated_time,
      })
      res.send("yes");
});

app.get('/api/task/all', function(req, res) {
  Task.findAll().then(function(task){
    res.json(task);
  })
});

app.get('/api/task/TaskID/:t_ID', function(req, res) {

  var id = req.params.t_ID;

  Task.findById(id).then(function(task){
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
Task.sync({force: true});

app.listen(3080);
