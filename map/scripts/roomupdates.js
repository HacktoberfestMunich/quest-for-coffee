import { getLayersMap } from '@workadventure/scripting-api-extra';

const UPDATE_INTERVAL = 1000 //in ms
const RESULT_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/result.json'

function openArea(name) {
  WA.room.hideLayer("Doors/" + name);
  WA.room.hideLayer("RiddleLayerHidesTransparency/" + name);
}

async function findLayerGroup(riddleId) {
  const layerNames = await getLayersMap();
  const layerPath = Array.from(layerNames.keys()).filter(layer => layer.startsWith("Doors/" + riddleId + "-"))[0];
  const layer = layerPath.split('/')[1]
  console.debug("Get layer group " + layer + " for id " + riddleId);
  return layer;
}

function checkForNewOpenDoors() {

  fetch(RESULT_FILE)
    .then(res => res.json())
    .then(async doorFlags => {

      console.debug("Recieved door flags " + JSON.stringify(doorFlags));

      for (const [riddleId, open] of Object.entries(doorFlags)) {
        if (open) {
          openArea(await findLayerGroup(riddleId));
        }
      }
    });
}

function initRoomUpdates() {
  checkForNewOpenDoors();
  setInterval(checkForNewOpenDoors, UPDATE_INTERVAL);
}

export { initRoomUpdates };