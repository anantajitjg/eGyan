var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyParser.json());

var env = "dev";
var auth_url = "";
var data_url = "";
var headers = {
  'Content-Type': 'application/json'
};

if (env === "dev") {
  headers.Authorization = 'Bearer ' + process.env.ADMIN_TOKEN;
  auth_url = "https://auth.festival40.hasura-app.io";
  data_url = "https://data.festival40.hasura-app.io";
} else {
  auth_url = "http://auth.hasura";
  data_url = "http://data.hasura";
}

headers['X-Hasura-Role'] = 'admin';
headers['X-Hasura-User-Id'] = 1;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', "index.html"));
});
app.get('/student', function (req, res) {
  res.sendFile(path.join(__dirname, 'template', "student_home.html"));
});
app.get('/course', function (req, res) {
  res.sendFile(path.join(__dirname, 'template', "course_home.html"));
});
app.get('/logout', function (req, res) {
  res.sendFile(path.join(__dirname, 'template', "logout.html"));
});

// app.post("/signup", function (req, res) {
//   var request_url = auth_url + '/signup';
//   var data_query_url = data_url + "/v1/query";
//   var user_dtl = {
//     username: "",
//     email: "",
//     password: ""
//   };
//   var name = req.body.name;
//   var email = req.body.email;
//   var password = req.body.password;
//   if (name.trim() === "" || email.trim() == "" || password.trim() === "") {
//     res.status(400).send("Invalid input values!");
//   } else {
//     user_dtl.username = email;
//     user_dtl.email = email;
//     user_dtl.password = password;
//     //Making HTTP request
//     request({
//       url: request_url,
//       method: "POST",
//       json: true,
//       body: user_dtl
//     }, function (error, response, body) {
//       if (error) {
//         return res.status(500).send(error.toString());
//       }
//       if (response.statusCode == 200) {
//         var user_id = response.body.hasura_id;
//         var auth = "Bearer " + response.body.auth_token;
//         var data_query = {
//           "type": "insert",
//           "args": {
//             "table": "user_other_details",
//             "objects": [{
//               "user_id": user_id,
//               "name": name
//             }]
//           }
//         };
//         request({
//           url: data_query_url,
//           method: "POST",
//           json: true,
//           headers: {
//             'Authorization': auth
//           },
//           body: data_query
//         }, function (error, response, body) {
//           if (response.body.affected_rows >= 1) {
//             res.status(200).send("Successfully Registered!");
//           } else {
//             res.status(500).send(JSON.stringify({
//               message: "There was some problem registering!"
//             }));
//           }
//         });
//       } else {
//         if (response.statusCode == 409) {
//           res.status(409).send(JSON.stringify({
//             message: "Email already exists!"
//           }));
//         } else {
//           res.status(response.statusCode).send(JSON.stringify(response.body));
//         }
//       }
//     });
//   }
// });


app.post("/signup", function (req, res) {
  var request_url = auth_url + '/signup';
  var data_query_url = data_url + "/v1/query";
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
    }, function (error, response, body) {
      if (error) {
        return res.status(500).send(error.toString());
      }
      if (response.statusCode == 200) {
        var user_id = response.body.hasura_id;
        //var auth = "Bearer " + response.body.auth_token;
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
        request({
          url: data_query_url,
          method: "POST",
          headers: headers,
          body: data_query
        }, function (error, response, body) {
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
app.get('/getinfo', function (req, res) {
  var result = [];
  var info = {
    id: req.get('X-Hasura-User-Id'),
    role: req.get('X-Hasura-Role')
  };
  result.push(info);
  res.send(JSON.stringify(result));
});

//loading static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});