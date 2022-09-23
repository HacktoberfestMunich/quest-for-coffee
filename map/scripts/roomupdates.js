const UPDATE_INTERVAL = 1000 //in ms
const RESULT_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/result.json'

function openArea(name) {
  WA.room.hideLayer("Doors/" + name);
}

function checkForNewOpenDoors() {

  fetch(RESULT_FILE)
    .then(res => res.json())
    .then(doorFlags => {

      console.debug("Recieved door flags " + JSON.stringify(doorFlags));

      for (const [door, open] of Object.entries(doorFlags)) {
        if (open) {
          openArea(door);
        }
      }
    });
}

function initRoomUpdates() {
  checkForNewOpenDoors();
  setInterval(checkForNewOpenDoors, UPDATE_INTERVAL);
}

export { initRoomUpdates };