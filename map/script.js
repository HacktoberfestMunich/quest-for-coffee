/* This script will check regulary for flags on solve puzzles. If flags are true the corresponding doors will open. */

const UPDATE_INTERVAL = 30000 //in ms

function getDoorFlags() {
  return {"riddle-0": true};
}

function openDoor(name) {
  WA.room.hideLayer("Doors/" + name);
}

function checkForNewOpenDoors() {
  const doorFlags = getDoorFlags();
  console.debug("Recieved door flags" + JSON.stringify(doorFlags))

  for (const [door, open] of Object.entries(doorFlags)) {
    if (open) {
      openDoor(door)
    }
  }
}

setInterval(checkForNewOpenDoors, UPDATE_INTERVAL)
