const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const postTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, added: task });
});

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  console.log("all tasks fetched from the DB!");
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.taskID;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTasks = asyncWrapper(async (req, res) => {
  const taskID = req.params.taskID;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    runValidators: true,
    new: true,
    overwrite: true,
  });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res.status(200).json({
    success: true,
    msg: `Task with ID: ${taskID} updated!`,
    new: task,
  });
});

const deleteTasks = asyncWrapper(async (req, res) => {
  const taskID = req.params.taskID;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID: ${taskID}`, 404));
  }
  res
    .status(200)
    .json({ success: true, msg: `Task with ID: ${taskID} deleted!` });
});

module.exports = {
  getTasks,
  getTask,
  postTasks,
  updateTasks,
  deleteTasks,
};
