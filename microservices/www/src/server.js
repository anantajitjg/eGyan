let hbs = require('express-handlebars'),
    path = require('path'),
    express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser');

// custom modules
let DataQuery = require('./data-query');

let app = express();
let dataQuery = new DataQuery();
app.use(bodyParser.json());
app.set('env', 'production'); //development or production

// view
//===============================================================
app.set('views', path.join(__dirname, "template"));
app.engine('handlebars', hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials')
}));
app.set('view engine', 'handlebars');

// config
//===============================================================
let data_url = "";
let auth_url = "";
let headers = {
  'Content-Type': 'application/json'
};
if (app.get('env') === "development") {
  const cluster_name = process.env.CLUSTER_NAME;
  headers.Authorization = 'Bearer ' + process.env.ADMIN_TOKEN;
  auth_url = `https://auth.${cluster_name}.hasura-app.io`;
  data_url = `https://data.${cluster_name}.hasura-app.io`;
} else {
  auth_url = "http://auth.hasura";
  data_url = "http://data.hasura";
}
headers['X-Hasura-Role'] = 'admin';
headers['X-Hasura-User-Id'] = 1;
let auth_query_url = auth_url + "/v1";
let data_query_url = data_url + "/v1/query";

// custom functions
//===============================================================
function getBasicAuthInfo(req) {
  let info = {};
  let dev_info = { id: 7, role: "user" }; // for development only
  info = app.get('env') === 'development' ? dev_info : info;
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

// routes
//===============================================================
app.get('/', function (req, res) {
  let userInfo = getBasicAuthInfo(req);
  if (app.get('env') === "production" && (userInfo.role === "user" || userInfo.role === "admin")) {
    res.redirect('/student');
  } else {
    res.render('index', {
      title: "eGyan - Simple and Effective Elearning Platform for Everyone"
    });
  }
});

app.get('/student', function (req, res) {
  let userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    res.render('student', {
      title: "eGyan - Student Home"
    });
  } else {
    res.redirect('/');
  }
});

app.get('/course/id/:id', function (req, res) {
  let userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    let course_id = parseInt(req.params.id) ? parseInt(req.params.id) : null;
    let status = req.query.status ? req.query.status : "";
    if (course_id !== null && (status === "active" || status === "completed" || status === "available")) {
      //fetch course details
      makePOSTRequest(dataQuery.fetchCourseDetails(userInfo.id, course_id), function (error, response) {
        if (response.statusCode == 200) {
          if (response.body.length > 0) {
            let courseStatusInfo = {};
            let statusCheck = response.body[0].user_course_status.length;
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
  let userInfo = getBasicAuthInfo(req);
  if (app.get('env') === "production" && (userInfo.role === "user" || userInfo.role === "admin")) {
    res.redirect('/student');
  } else {
    res.render('logout', {
      title: 'Logged Out!'
    });
  }
});

app.post("/signup", function (req, res) {
  let request_url = auth_query_url + '/signup';
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  if (name.trim() === "" || email.trim() == "" || password.trim() === "") {
    res.status(400).send("Invalid input values!");
  } else {
    //Making HTTP request
    if(req.get('X-Hasura-Base-Domain')) {
      headers['X-Hasura-Base-Domain'] = req.get('X-Hasura-Base-Domain');
    }
    request({
      url: request_url,
      method: "POST",
      headers: headers,
      json: true,
      body: {
        "provider": "username",
        "data": {
          "username": email,
          "password": password,
          "email": email
        }
      }
    }, function (error, response) {
      if (error) {
        return res.status(500).send(error.toString());
      }
      if (response.statusCode == 200) {
        let user_id = response.body.hasura_id;
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
  let userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    //first fetch points
    makePOSTRequest(dataQuery.fetchUserPoints(userInfo.id), function (error, response) {
      if (response.statusCode == 200) {
        let points = response.body[0].points;
        //now, fetch badge details
        makePOSTRequest(dataQuery.fetchBadgeDetails(userInfo.id, points), function (error, response) {
          if (response.statusCode == 200) {
            let total_badges = response.body.length;
            if (total_badges > 0) {
              let user_badge_arr = [];
              for (let i = 0; i < total_badges; i++) {
                if (response.body[i].user_badge_status.length === 0) {
                  let badge_info = {};
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
  let userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    let topic_id = req.body.topic_id;
    let module_id = req.body.module_id;
    //first fetch topic points
    makePOSTRequest(dataQuery.fetchTopicPoints(topic_id), function (error, response) {
      if (response.statusCode == 200) {
        if (response.body.length > 0) {
          let topic_points = response.body[0].topic_points;
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
  let userInfo = getBasicAuthInfo(req);
  if (userInfo.role === "user" || userInfo.role === "admin") {
    let course_id = parseInt(req.query.course_id);
    //first, fetch course status
    makePOSTRequest(dataQuery.fetchCourseStatus(userInfo.id, course_id), function (error, response) {
      if (response.statusCode == 200) {
        let module_length = response.body.length;
        if (module_length > 0) {
          let status_check = 0;
          for (let i = 0; i < module_length; i++) {
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

// loading static files
app.use(express.static(path.join(__dirname, 'public')));

// listens for connections on the port 8080
app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});