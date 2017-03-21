var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
var Task = sequelize.define('task', {
  Created_By: {
    type: Sequelize.STRING
  },
  Task_Name: {
    type: Sequelize.STRING
  },
  Created_On: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
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

// force: true will drop the table if it already exists
Task.sync({force: true}).then(function () {
  // Table created
  return Task.create({
    Created_By: 'Fred Hancock',
    Task_Name: 'IOS interface',
    Assigned_To: 'Sam Smith'
  });
}).then(function (){
  Task.findAll().then(function(tasks) {
    console.log(tasks)
  })
});
