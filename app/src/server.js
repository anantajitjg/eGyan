var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.set('env', 'production'); //development or production

app.set('views', path.join(__dirname, "template"));
//view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

var auth_url = "";
var data_url = "";
var headers = {
  'Content-Type': 'application/json'
};

if (app.get('env') === "development") {
  headers.Authorization = 'Bearer ' + process.env.ADMIN_TOKEN;
  auth_url = "https://auth.festival40.hasura-app.io";
  data_url = "https://data.festival40.hasura-app.io";
} else {
  auth_url = "http://auth.hasura";
  data_url = "http://data.hasura";
}

headers['X-Hasura-Role'] = 'admin';
headers['X-Hasura-User-Id'] = 1;

var data_query_url = data_url + "/v1/query";

function getBasicAuthInfo(req) {
  var info = {};
  var dev_info = {
    id: 50,
    role: "user"
  };
  info = app.get('env') === 'development' ? dev_info : info;
  if (req.get('X-Hasura-User-Id') && req.get('X-Hasura-Role')) {
    info.id = req.get('X-Hasura-User-Id');
    info.role = req.get('X-Hasura-Role');
  }
  return info;
}

function makePOSTRequest(data, callback) {
  request({
    url: data_query_url,
    method: "POST",
    json: true,
    headers: headers,
    body: data
  }, callback);
}

//routes
app.get('/', function (req, res) {
  res.render('index', {
    title: "eGyan - Simple and Effective Elearning Platform for Everyone"
  });
});
app.get('/student', function (req, res) {
  res.render('student', {
    title: "eGyan - Student Home"
  });
});
app.get('/course/id/:id', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  var course_id = parseInt(req.params.id) ? parseInt(req.params.id) : null;
  var status = req.query.status ? req.query.status : "";
  if (course_id !== null && (status === "active" || status === "completed" || status === "available")) {
    //query data
    var fetch_course_details_query = {
      "type": "select",
      "args": {
        "table": "course_details",
        "columns": ["course_id", "name", "about", "syllabus", "course_logo",
          {
            "name": "user_course_status",
            "columns": ["status"],
            "where": {
              "user_id": userInfo.id
            }
          }
        ],
        "where": {
          "course_id": course_id
        }
      }
    };
    //display the course
    makePOSTRequest(fetch_course_details_query, function (error, response) {
      if (response.statusCode == 200) {
        if (response.body.length > 0) {
          var courseStatusInfo = {};
          var statusCheck = response.body[0].user_course_status.length;
          courseStatusInfo.available = statusCheck === 0 ? true : false;
          courseStatusInfo.completed = statusCheck > 0 ? response.body[0].user_course_status[0].status : false;
          if (statusCheck === 0) {
            //query data
            var insert_course_status = {
              "type": "insert",
              "args": {
                "table": "course_status",
                "objects": [{
                  "user_id": userInfo.id,
                  "course_id": course_id
                }]
              }
            };
            //enroll in course
            makePOSTRequest(insert_course_status, function (error, response) {
              if (response.body.affected_rows < 1) {
                res.redirect('/student');
              }
            });
          }
          res.render('course', {
            title: 'eGyan - ' + response.body[0].name + ' Course',
            courseStatus: courseStatusInfo,
            courseLogo: response.body[0].course_logo,
            courseHeading: response.body[0].name,
            courseDescription: response.body[0].about,
            contentHeader: "Syllabus",
            content: response.body[0].syllabus
          });
        } else {
          res.redirect('/student');
        }
      } else {
        res.redirect('/student');
      }
    });
  } else {
    res.redirect('/student');
  }
});
app.get('/logout', function (req, res) {
  res.render('logout', {
    title: 'Logged Out!'
  });
});

app.post("/signup", function (req, res) {
  var request_url = auth_url + '/signup';
  var user_dtl = {};
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  if (name.trim() === "" || email.trim() == "" || password.trim() === "") {
    res.status(400).send("Invalid input values!");
  } else {
    user_dtl.username = email;
    user_dtl.email = email;
    user_dtl.password = password;
    //Making HTTP request
    request({
      url: request_url,
      method: "POST",
      json: true,
      body: user_dtl
    }, function (error, response) {
      if (error) {
        return res.status(500).send(error.toString());
      }
      if (response.statusCode == 200) {
        var user_id = response.body.hasura_id;
        var data_query = {
          "type": "insert",
          "args": {
            "table": "user_other_details",
            "objects": [{
              "user_id": user_id,
              "name": name
            }]
          }
        };
        makePOSTRequest(data_query, function (error, response) {
          if (response.body.affected_rows >= 1) {
            res.status(200).send("Successfully Registered!");
          } else {
            res.status(500).send(JSON.stringify({
              message: "There was some problem registering!"
            }));
          }
        });
      } else {
        if (response.statusCode == 409) {
          res.status(409).send(JSON.stringify({
            message: "Email already exists!"
          }));
        } else {
          res.status(response.statusCode).send(JSON.stringify(response.body));
        }
      }
    });
  }
});

app.post('/insert/badge', function (req, res) {
  var badge_arr = req.body.badge_array;
  var insert_badge_query = {
    "type": "insert",
    "args": {
      "table": "badge_status",
      "objects": badge_arr
    }
  };
  makePOSTRequest(insert_badge_query, function (error, response) {
    if (response.body.affected_rows >= 1) {
      res.status(200).send("Successfully inserted!");
    } else {
      res.status(500).send(JSON.stringify({
        message: "There was some Error!"
      }));
    }
  });
});

app.get('/getinfo', function (req, res) {
  res.json(getBasicAuthInfo(req));
});

//loading static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});