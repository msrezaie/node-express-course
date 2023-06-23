const express = require("express");
const router = express.Router();

const {
  getPeople,
  postPeople,
  getPeopleByID,
  updatePeople,
  deletePeople,
} = require("../controllers/people");

// HTTP methods with url routes connected to their specific controllers, done through chaining
router.route("/api/v1/people/").get(getPeople).post(postPeople);
router
  .route("/api/v1/people/:id")
  .get(getPeopleByID)
  .put(updatePeople)
  .delete(deletePeople);

module.exports = router;
