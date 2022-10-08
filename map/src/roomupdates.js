import { getLayersMap } from '@workadventure/scripting-api-extra';
import { compareArrays } from './utils';

const UPDATE_INTERVAL = 1000; //in ms
const RESULT_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/result.json';
let LAST_RECIEVED_FLAGS = [];
let ROOM_SUBSCRIPTIONS = new Map();

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
      const recievedFlags = Object.values(doorFlags);
      if (!compareArrays(recievedFlags, LAST_RECIEVED_FLAGS)) {
        LAST_RECIEVED_FLAGS = recievedFlags;

        console.debug("Recieved new door flags " + JSON.stringify(doorFlags));
        for (const [riddleId, open] of Object.entries(doorFlags)) {
          if (open) {
            openArea(await findLayerGroup(riddleId));
            executeSubscriptionActions(riddleId)
          }
        }
      }
    });
}

function executeSubscriptionActions(riddleId) {
  const callback = ROOM_SUBSCRIPTIONS.get(riddleId);
  if (callback != undefined) {
    callback();
  }
}

function registerRiddleSubscription(riddleId, onSolveCallback) {
  ROOM_SUBSCRIPTIONS.set(riddleId, onSolveCallback);
}

function init() {
  checkForNewOpenDoors();
  setInterval(checkForNewOpenDoors, UPDATE_INTERVAL);
}

export { init, registerRiddleSubscription };
