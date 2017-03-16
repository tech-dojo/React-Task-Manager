var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
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
  // Table created
  return User.create({
    username: 'john34',
    firstName: 'John',
    lastName: 'Hancock',
    Positions: 'Manager',

  });
}).then(function (){
  User.findOne({ where: {username:'john34'} }).then(function(users) {
    Task.sync({force: true}).then(function () {
      // Table created
      return Task.create({
        Created_By: 1,
        Task_Name: 'IOS interface',
        Created_On: '2016-08-09 04:05:02',
        Assigned_To: 'Sam Smith'
      });
    })
  })
});




//Manager



//tasks
var Task = sequelize.define('task', {
  Created_By: {
    type: Sequelize.INTEGER
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
