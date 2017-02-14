var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://muhib68:td123@localhost:5432/project_db');

var Employee = sequelize.define('employee', {
  name:  {
    type     : Sequelize.STRING,
    allowNull: false,
    get      : function()  {
      var title = this.getDataValue('title');
      // 'this' allows you to access attributes of the instance
      return this.getDataValue('name') + ' (' + title + ')';
    },
  },
  title: {
    type     : Sequelize.STRING,
    allowNull: false,
    set      : function(val) {
      this.setDataValue('title', val.toUpperCase());
    }
  }
});

Employee
  .create({ name: 'John Doe', title: 'senior engineer' })
  .then(function(employee) {
    console.log(employee.get('name')); // John Doe (SENIOR ENGINEER)
    console.log(employee.get('title')); // SENIOR ENGINEER
  })
