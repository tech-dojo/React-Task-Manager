var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');
var Programmer = sequelize.define('programmer', {
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
});

// force: true will drop the table if it already exists
Programmer.sync({force: true}).then(function () {
  // Table created
  return Programmer.create({
    firstName: 'Felix',
    lastName: 'Stewart',
    JobTitle: 'Senior Programmer',

  });
}).then(function (){
  Programmer.findAll().then(function(programmers) {
    console.log(programmers)
  })
});
