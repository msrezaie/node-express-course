const names = [
  "Dimitry SantiAgo",
  "Carlos d. Perez",
  "tam  person",
  "Mariana Gomez",
  "Amy You",
  "Mohammad Rezaie",
];

/////////////////////////////////////////////////////////////
////////////////////  !  My solutions !  ////////////////////
/////////////////////////////////////////////////////////////

// - Create a new array with only each person's last name
const lastNamesOnly = (names) => {
  return names.map((name) => name.split(" ").pop());
};

// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.
const filterNames = (names) => {
  return names.filter((name) => /^[A-Za-z]+ [A-Za-z]+$/.test(name));
};

// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]
const titleCaseNames = (names) => {
  return names.map((name) =>
    name
      .split(/\s+/)
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ")
  );
};

// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
const formatNames = (names) => {
  return names
    .filter((name) => !name.endsWith("z") && /^[A-Za-z]+ [A-Za-z]+$/.test(name))
    .map((name) => `${name} Sign up please!`);
};
