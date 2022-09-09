/* This script will check regulary for flags on solve puzzles. If flags are true the corresponding doors will open. */

const UPDATE_INTERVAL = 1000 //in ms

function openDoor(name) {
  WA.room.hideLayer("Doors/" + name);
}

function checkForNewOpenDoors() {

  fetch('https://poeschl.github.io/quest-for-coffee/solutions/result.json')
    .then(res => res.json())
    .then(doorFlags => {

      console.debug("Recieved door flags " + JSON.stringify(doorFlags))

      for (const [door, open] of Object.entries(doorFlags)) {
        if (open) {
          openDoor(door)
        }
      }
    });
}

setInterval(checkForNewOpenDoors, UPDATE_INTERVAL)