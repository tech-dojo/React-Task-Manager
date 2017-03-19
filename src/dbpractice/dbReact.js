var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
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
{ timestamps: false,
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(function () {
  User.create({
   id: new Date().valueOf(),
   user_Name: 'john34',
   First_Name: 'John',
   Last_Name: 'Hancock',
   Positions: 'Manager',
 }).then(function (){
   User.findOne({ where: {user_Name:'john34'} }).then(function(users) {
     Task.sync({force: false}).then(function () {
       // Table created
       return Task.create({
         Created_By: users.id,
         Task_Name: 'IOS interface',
         Created_On: '2016-08-09 04:05:02',
         Assigned_To: 'Sam Smith'
       });
     })
   })
 })
  // Table created

});





//Manager



//tasks
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



User.hasMany(Task, {
  foreignKey: {
    name: 'Created_By'
  }
});


/*
,
{
  username: 'henry40',
  firstName: 'Henry',
  lastName: 'Trumann',
  Positions: 'IOS Programmer',
},
{
  username: 'sam77',
  firstName: 'Samuel',
  lastName: 'Holt',
  Positions: 'Junior Programmer',
},
{
  username: 'sandy34',
  firstName: 'Snady',
  lastName: 'Brown',
  Positions: 'Web Programmer',
}
*/
