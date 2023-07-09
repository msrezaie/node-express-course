const Task = require("../models/task");

const getTasks = (req, res) => {
  res.send("all tasks");
};

const getTask = (req, res) => {
  res.send("one task");
};

const postTasks = (req, res) => {
  Task.create(req.body)
    .then((task) => {
      console.log("document added to DB!");
      res.status(201).json({ task });
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTasks = (req, res) => {
  res.send("update a task");
};

const deleteTasks = (req, res) => {
  res.send("delete a task");
};

module.exports = {
  getTasks,
  getTask,
  postTasks,
  updateTasks,
  deleteTasks,
};
