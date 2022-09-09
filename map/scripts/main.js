/* This script will check regulary for flags on solve puzzles. If flags are true the corresponding doors will open. */

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

const UPDATE_INTERVAL = 1000 //in ms
const RESULT_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/result.json'

WA.onInit().then(() => {
  console.log('WorkAdventure API Extra ready');

  bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
  }).catch(e => console.error(e));

  setInterval(checkForNewOpenDoors, UPDATE_INTERVAL)
});

function openDoor(name) {
  WA.room.hideLayer("Doors/" + name);
}

function checkForNewOpenDoors() {

  fetch(RESULT_FILE)
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