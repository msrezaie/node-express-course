const { people } = require("../data");

// controller for GET method of people
const getPeople = (req, res, next) => {
  res.json(people);
};

// controller for GET method with specific people ID
const getPeopleByID = (req, res, next) => {
  const peopleID = parseInt(req.params.id);
  const result = people.find((person) => person.id === peopleID);
  result
    ? res.json(result)
    : res.status(404).json({ success: false, message: "Invalid ID" });
};

// controller for POST method with specificed name
const postPeople = (req, res, next) => {
  const clientResponse = req.body.name;
  if (!clientResponse) {
    res.status(404).json({ success: false, message: "Please provide a name" });
  } else {
    people.push({ id: people.length + 1, name: clientResponse });
    res.json({ success: true, message: `${clientResponse} added to people` });
  }
};

// controller for UPDATE method with specificed ID and name
const updatePeople = (req, res, next) => {
  const peopleID = parseInt(req.params.id);
  const result = people.find((person) => person.id === peopleID);
  const newName = req.body.name;
  if (!peopleID || !newName) {
    res.status(404).json({
      success: false,
      message: "Please provide a valid ID 'param' and new Name 'body'",
    });
  } else if (!result) {
    res.status(404).json({ success: false, message: "Invalid ID" });
  } else {
    people[peopleID - 1].name = newName;
    res.json({
      success: true,
      message: `Changed name with id ${peopleID} to ${newName}`,
      data: people,
    });
  }
};

// controller for DELETE method with specificed ID
const deletePeople = (req, res, next) => {
  const peopleID = parseInt(req.params.id);
  const result = people.find((person) => person.id === peopleID);
  if (!result) {
    res.status(404).json({ success: false, message: "Invalid ID" });
  } else {
    const modifiedPeople = people.filter((person) => person.id !== peopleID);
    res.json({
      success: true,
      message: `Deleted name with id ${peopleID}`,
      data: modifiedPeople,
    });
  }
};

module.exports = {
  getPeople,
  postPeople,
  getPeopleByID,
  updatePeople,
  deletePeople,
};
