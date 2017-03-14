var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
var Manager = sequelize.define('manager', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  JobTitle: {
    type: Sequelize.STRING
  },
},
{ timestamps: false,
    tableName: 'manager',
});

// force: true will drop the table if it already exists
Manager.sync({force: true}).then(function () {
  // Table created
  return Manager.create({
    firstName: 'John',
    lastName: 'Hancock',
    JobTitle: 'Senior Manager',

  });
}).then(function (){
  Manager.findAll().then(function(users) {
    console.log(users)
  })
});
