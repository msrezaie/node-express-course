const router = require("express").Router();

const {
  getTasks,
  getTask,
  postTasks,
  updateTasks,
  deleteTasks,
} = require("../controllers/tasks");

router.route("/").get(getTasks).post(postTasks);
router.route("/:id").get(getTask).patch(updateTasks).delete(deleteTasks);

module.exports = router;
