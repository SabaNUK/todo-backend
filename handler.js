const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {
  // Do the logic for getting all the tasks from the DB
  response.status(200).send({
    tasks: [
      { id: 0001, taskDescription: "Search Product", completed: false, userId: 1 },
      { id: 0002, taskDescription: "Check Availability of Product", completed: true, userId : 2},
      { id: 0003, taskDescription: "check the delivery time and date", completed: false, userId : 1 },
      { id: 0004, taskDescription: "Pay for the Product", completed: true, userId : 2 },
      { id:0005, taskDescription: "check the invoice", completed: false, userId :2 },
      { id: 0006, taskDescription: "check calender dates", completed: false, userId:1 }
    ] 
  });
});

app.post("/tasks", function (request, response) {
  // Do the logic for saving the new task in the DB
  const task = request.body;
  // { text: "do the dishes", completed: true, date: "2019" }
  response.status(201).send("Successfully created task: " + task.text);
});
app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  response.status(200).send("Deleted task with id " + taskId);
});
app.put("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  const updatedTask = request.body;
  response.status(200).send("Updated task with id " + taskId);
});

module.exports.tasks = serverlessHttp(app);