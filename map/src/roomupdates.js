import { getLayersMap } from '@workadventure/scripting-api-extra';
import { compareArrays } from './utils';

const UPDATE_INTERVAL = 1000; //in ms
const RESULT_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/result.json';
const DEBUG = false;
const DEBUG_FLAGS = { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true, "6": true, "7": true, "8": true, "10": true, "11": true, "12": true, "13": true, "14": true, "15": true, "16": true, "17": true, "18": true }
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

  if (!DEBUG) {
    fetch(RESULT_FILE)
      .then(res => res.json())
      .then(async doorFlags => {
        checkFlags(doorFlags);
      });
  } else {
    console.log("### DEBUG MODE ###\nUsing DEBUG door flags.")
    checkFlags(DEBUG_FLAGS);
  }
}

async function checkFlags(doorFlags) {
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
}

function executeSubscriptionActions(riddleId) {
  const callback = ROOM_SUBSCRIPTIONS.get(parseInt(riddleId));
  if (callback != undefined) {
    console.debug("Execute riddle subscription callback for riddle " + riddleId);
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
