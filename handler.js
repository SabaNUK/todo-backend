const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: "todos"
});


app.get("/tasks", function (request, response) {
  // Do the logic for getting all the tasks from the DB
  connection.query("SELECT * FROM task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else response.status(200) . jason({task:data}); 
      response.json({
        tasks: data
      });
    connection.end();
  });
    
  


app.post("/tasks", function (request, response) {
  const taskDescription = request.body.taskDescription;
  const done = request.body.done;
  const date = request.body.date;
  const userId = request.body.userId;

  const sql = 'INSERT INTO task (taskDescription, done, date, userId) VALUES  (?, ?, ?, ?)';

  connection.query(sql, [taskDescription, done, date, userId], (err, results, fields) => {

    if (err) {
      console.log("Error inserting tasks", err);
      response.status(500).json({
        error: err
      });

    } else {
      response.status(201).json({   
        taskId: results.insertId,         
        taskDescription,
        done,
        date       
      });
    }    
  });

  connection.end();  
});

app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;

  const sql = 'DELETE FROM task WHERE taskId = ?';

    connection.query(sql, [taskId], (err, results, fields) => {

    if (err) {
      console.log("Error deleting tasks", err);
      response.status(500).json({
        error: err
      });
    } 
    
  });
  connection.end();  
});
app.put("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  const taskDescription = request.body.taskDescription;
  const done = request.body.done;
  const date = request.body.date;
  const userId = request.body.userId;

  const sql = 'UPDATE task SET taskDescription = ?, done = ?, date = ?, userId = ? WHERE taskId = ?';
  connection.query(sql, [taskDescription, done, date, userId, taskId ], (err, results, fields)=> {

    if (err) {
      console.log("Error updating tasks", err);
      response.status(500).json({
        error: err
      });
    }

  });
  connection.end();  
});

module.exports.tasks = serverlessHttp(app);

