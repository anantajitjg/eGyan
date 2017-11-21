var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');
//custom modules for egyan app
var DataQuery = require('./data-query');

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
var dataQuery = new DataQuery();

var auth_url = "";
var data_url = "";
var headers = {
  'Content-Type': 'application/json'
};

if (app.get('env') === "development") {
  headers.Authorization = 'Bearer ' + process.env.ADMIN_TOKEN;
  auth_url = "https://auth.chaste17.hasura-app.io";
  data_url = "https://data.chaste17.hasura-app.io";
} else {
  auth_url = "http://auth.hasura";
  data_url = "http://data.hasura";
}

headers['X-Hasura-Role'] = 'admin';
headers['X-Hasura-User-Id'] = 1;

var data_query_url = data_url + "/v1/query";

function getBasicAuthInfo(req) {
  var info = {};
  // var dev_info = {
  //   id: 50,
  //   role: "user"
  // };
  // info = app.get('env') === 'development' ? dev_info : info;
  if (req.get('X-Hasura-Role')) {
    if (req.get('X-Hasura-User-Id')) {
      info.id = parseInt(req.get('X-Hasura-User-Id'));
    }
    info.role = req.get('X-Hasura-Role');
  }
  return info;
}

function makePOSTRequest(data, callback) {
  request({
    url: data_query_url,
    forever: true,
    gzip: true,
    jar: true,
    method: "POST",
    json: true,
    headers: headers,
    body: data
  }, callback);
}

//routes
app.get('/', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    res.redirect('/student');
  } else {
    res.render('index', {
      title: "eGyan - Simple and Effective Elearning Platform for Everyone"
    });
  }
});
app.get('/student', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    res.render('student', {
      title: "eGyan - Student Home"
    });
  } else {
    res.redirect('/');
  }
});
app.get('/course/id/:id', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    var course_id = parseInt(req.params.id) ? parseInt(req.params.id) : null;
    var status = req.query.status ? req.query.status : "";
    if (course_id !== null && (status === "active" || status === "completed" || status === "available")) {
      //fetch course details
      makePOSTRequest(dataQuery.fetchCourseDetails(userInfo.id, course_id), function (error, response) {
        if (response.statusCode == 200) {
          if (response.body.length > 0) {
            var courseStatusInfo = {};
            var statusCheck = response.body[0].user_course_status.length;
            courseStatusInfo.available = statusCheck === 0 ? true : false;
            courseStatusInfo.completed = statusCheck > 0 ? response.body[0].user_course_status[0].status : false;
            if (statusCheck === 0) {
              //enroll in course
              makePOSTRequest(dataQuery.insertCourseStatus(userInfo.id, course_id), function (error, response) {
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
  } else {
    res.redirect('/');
  }
});
app.get('/logout', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    res.redirect('/student');
  } else {
    res.render('logout', {
      title: 'Logged Out!'
    });
  }
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
        //now, insert the name
        makePOSTRequest(dataQuery.insertFullName(user_id, name), function (error, response) {
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
//For fetching badge details
app.get('/fetch/badge', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    //first fetch points
    makePOSTRequest(dataQuery.fetchUserPoints(userInfo.id), function (error, response) {
      if (response.statusCode == 200) {
        var points = response.body[0].points;
        //now, fetch badge details
        makePOSTRequest(dataQuery.fetchBadgeDetails(userInfo.id, points), function (error, response) {
          if (response.statusCode == 200) {
            var total_badges = response.body.length;
            if (total_badges > 0) {
              var user_badge_arr = [];
              for (var i = 0; i < total_badges; i++) {
                if (response.body[i].user_badge_status.length === 0) {
                  var badge_info = {};
                  badge_info.user_id = userInfo.id;
                  badge_info.badge_id = response.body[i].badge_id;
                  user_badge_arr.push(badge_info);
                }
              }
              if (user_badge_arr.length > 0) {
                //insert badge for user
                makePOSTRequest(dataQuery.insertUserBadge(user_badge_arr), function (error, response) {});
              }
            }
            res.status(200).json(response.body);
          } else {
            res.status(400).send("Invalid request!");
          }
        });

      } else {
        res.status(500).send("Error!");
      }
    });
  } else {
    res.status("403").send("Not allowed!");
  }
});
//For completing a topic and updating points
app.post('/topic/complete', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    var topic_id = req.body.topic_id;
    var module_id = req.body.module_id;
    //first fetch topic points
    makePOSTRequest(dataQuery.fetchTopicPoints(topic_id), function (error, response) {
      if (response.statusCode == 200) {
        if (response.body.length > 0) {
          var topic_points = response.body[0].topic_points;
          //now insert topic status
          makePOSTRequest(dataQuery.insertTopicStatus(userInfo.id, topic_id, topic_points, module_id), function (error, response) {
            if (response.body.affected_rows >= 1) {
              //now update user points
              makePOSTRequest(dataQuery.updateUserPoints(userInfo.id, topic_points), function (error, response) {
                if (response.body.affected_rows >= 1) {
                  res.status(200).json({
                    topicStatus: "completed"
                  });
                } else {
                  res.status(200).json({
                    topicStatus: "uncompleted"
                  });
                }
              });
            } else {
              res.status(400).send("Invalid request!");
            }
          });
        } else {
          res.status(404).send("Not Found!");
        }
      } else {
        res.status(500).send("Error!");
      }
    });

  } else {
    res.status("403").send("Not allowed!");
  }
});
//For completing the course
app.get('/course/complete', function (req, res) {
  var userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    var course_id = parseInt(req.query.course_id);
    //first, fetch course status
    makePOSTRequest(dataQuery.fetchCourseStatus(userInfo.id, course_id), function (error, response) {
      if (response.statusCode == 200) {
        var module_length = response.body.length;
        if (module_length > 0) {
          var status_check = 0;
          for (var i = 0; i < module_length; i++) {
            if (response.body[i].module_topics.length === response.body[i].user_topic_status.length) {
              status_check++;
            }
          }
          if (status_check === module_length) {
            //now update course status
            makePOSTRequest(dataQuery.updateCourseStatus(userInfo.id, course_id), function (error, response) {
              if (response.body.affected_rows >= 1) {
                res.status(200).json({
                  courseStatus: "completed"
                });
              } else {
                res.status(200).json({
                  courseStatus: "uncompleted"
                });
              }
            });
          } else {
            res.status(200).json({
              courseStatus: "uncompleted"
            });
          }
        } else {
          res.status(400).send("Invalid request!");
        }
      } else {
        res.status(500).send("Error!");
      }
    });
  } else {
    res.status("403").send("Not allowed!");
  }
});
app.get('/getinfo', function (req, res) {
  res.json(getBasicAuthInfo(req));
});

//loading static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});
