var express = require('express');
var Sequelize = require('sequelize');
var path = require('path');
var app = express();
var dbConfig = require('./config');
var sequelize = new Sequelize(dbConfig.db_url_production);
var cors = require('cors');
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'));
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
        type: Sequelize.STRING
    },
    user_type: {
        type: Sequelize.STRING
    }
}, {timestamps: false});

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
        defaultValue: Sequelize.NOW
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
        type: Sequelize.STRING,
        allowNull: true
    }
}, {timestamps: false});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/api/user/create', function(req, res) {
    User.create({id: new Date().valueOf(), user_name: req.body.user_name, password: req.body.password, user_type: req.body.user_type}).then(function(user) {
        res.json(user);
    }).catch(function(error) {
        res.json(error.errors);
    })
});
app.post('/api/user/signin', function(req, res) {
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    }).then(function(user) {
        if (req.body.password === user.password) {
            res.json(user);
        } else {
            res.json({error: "mismatch"});
        }
    }).catch(function(error) {
        res.json(error);
    })
});

app.get('/api/user/all', function(req, res) {
    User.findAll().then(function(user) {
        res.json(user);
    })
});


app.get('/api/user/:ID', function(req, res) {

    var id = req.params.ID;

    User.findById(id).then(function(user) {
        res.json(user);
    })
});

app.get('/api/programmer', function(req, res) {
    User.findAll({
        where: {
            user_type: "Programmer"
        }
    }).then(function(user) {
        res.json(user);
    })
});

app.post('/api/task/create', function(req, res) {
    Task.create({task_id: new Date().valueOf(), created_by: req.body.created_by, task_name: req.body.task_name, assigned_to: req.body.assigned_to, estimated_time: req.body.estimated_time}).then(function(task) {
        res.json(task);
    })
});

app.put('/api/task/update/:t_ID', function(req, res) {
    var tid = req.params.t_ID;
    Task.update({
        task_name: req.body.task_name,
        assigned_to: req.body.assigned_to,
        estimated_time: req.body.estimated_time,
        started_on: req.body.started_on,
        completed_on: req.body.completed_on
    }, {
        where: {
            task_id: tid
        }
    }).then(function(task) {
        res.json(task);
    }).catch(function(e) {
        res.json(e);
    });
});

app.get('/api/task/all', function(req, res) {
    Task.findAll().then(function(task) {
        res.json(task);
    })
});

app.get('/api/taskP/:programmerName', function(req, res) {
    var programmer = req.params.programmerName;
    Task.findAll({
        where: {
            assigned_to: programmer
        }
    }).then(function(task) {
        res.json(task);
    }).catch(function(e) {
        console.log("Project update failed !");
    });

});

app.get('/api/task/tid/:t_ID', function(req, res) {
    var id = req.params.t_ID;
    Task.findById(id).then(function(task) {
        res.json(task);
    })
});

app.put('/api/user/update/:ID', function(req, res) {
    var uid = req.params.ID;
    User.update({
        user_name: req.body.user_Name,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_type: req.body.user_type
    }, {
        where: {
            id: uid
        }
    }).then(function(user) {
        res.json(user);

    }).catch(function(e) {
        console.log("Project update failed !");
        res.json(e);
    });

});

User.sync({force: false});
Task.sync({force: false});
app.listen(process.env.PORT || 3080);
