const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      setData.forEach((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id);
        set.theme = theme ? theme.name : "Unknown";
        sets.push(set);
      });

      resolve();
    } catch (error) {
      reject("Error initializing sets: " + error);
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    try {
      resolve(sets);
    } catch (error) {
      reject("Error getting all sets: " + error);
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    try {
      const foundSet = sets.find((set) => set.set_num === setNum);

      if (foundSet) {
        resolve(foundSet);
      } else {
        reject("Unable to find the requested set: " + setNum);
      }
    } catch (error) {
      reject("Error getting set by number: " + error);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    try {
      const matchingSets = sets.filter(
        (set) => set.theme.toLowerCase().includes(theme.toLowerCase())
      );

      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject("Unable to find sets for the requested theme: " + theme);
      }
    } catch (error) {
      reject("Error getting sets by theme: " + error);
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };