import { compareArrays } from "./utils";

const FIRST = { code: [1, 2, 3, 6], number: 4 };
const SECOND = { code: [4, 8, 9, 6], number: 5 };
const THIRD = { code: [8, 5, 2, 3], number: 2 };
const FOURTH = { code: [5, 7, 8, 9], number: 9 };

const VAR_PRESET = "4tiles-"

let screenMessage;

function retrieveInput() {
  const occupiedTiles = [];
  for (let tileId = 1; tileId <= 9; tileId++) {
    const playerInLayer = WA.state.loadVariable(VAR_PRESET + tileId);
    if (playerInLayer > 0) {
      occupiedTiles.push(tileId);
    }
  }

  console.debug("Retrieved tileIds " + occupiedTiles)
  return occupiedTiles;
}

function getDigit(input, validate, solutionDigit) {
  if (compareArrays(input, validate)) {
    return solutionDigit;
  } else {
    return "-";
  }
}

function computeScreen() {
  const input = retrieveInput();

  const display =
    getDigit(input, FIRST.code, FIRST.number)
    + getDigit(input, SECOND.code, SECOND.number)
    + getDigit(input, THIRD.code, THIRD.number)
    + getDigit(input, FOURTH.code, FOURTH.number)

  screenMessage.remove();
  screenMessage = WA.ui.displayActionMessage({
    message: "The screen shows: " + display,
    type: "message",
    callback: () => { computeScreen(); }
  });
}

function showCheckMessage() {
  screenMessage = WA.ui.displayActionMessage({
    message: "Click Space to check the screen",
    type: "message",
    callback: () => { computeScreen(); }
  });
}

function showResetMessage() {
  screenMessage = WA.ui.displayActionMessage({
    message: "Click Space to reset tile counters",
    type: "message",
    callback: () => { resetTiles(); }
  });
}

function setTileVariable(tileId, playerOnIt) {
  let current = WA.state.loadVariable(VAR_PRESET + tileId);

  let newState;
  if (playerOnIt) {
    newState = current + 1;
  } else {
    newState = current - 1;
  }
  WA.state.saveVariable(VAR_PRESET + tileId, newState);
  console.debug("4tiles: " + tileId + " " + current + " -> " + newState);
}

function resetTiles(){
  for (let tileId = 1; tileId <= 9; tileId++) {
    WA.state.saveVariable(VAR_PRESET + tileId, 0);    
  }
}

function init() {

  WA.room.onEnterLayer("4tiles1monitor/topleft").subscribe(() => { setTileVariable(1, true) });
  WA.room.onLeaveLayer("4tiles1monitor/topleft").subscribe(() => { setTileVariable(1, false) });

  WA.room.onEnterLayer("4tiles1monitor/top").subscribe(() => { setTileVariable(2, true) });
  WA.room.onLeaveLayer("4tiles1monitor/top").subscribe(() => { setTileVariable(2, false) });

  WA.room.onEnterLayer("4tiles1monitor/topright").subscribe(() => { setTileVariable(3, true) });
  WA.room.onLeaveLayer("4tiles1monitor/topright").subscribe(() => { setTileVariable(3, false) });

  WA.room.onEnterLayer("4tiles1monitor/left").subscribe(() => { setTileVariable(4, true) });
  WA.room.onLeaveLayer("4tiles1monitor/left").subscribe(() => { setTileVariable(4, false) });

  WA.room.onEnterLayer("4tiles1monitor/center").subscribe(() => { setTileVariable(5, true) });
  WA.room.onLeaveLayer("4tiles1monitor/center").subscribe(() => { setTileVariable(5, false) });

  WA.room.onEnterLayer("4tiles1monitor/right").subscribe(() => { setTileVariable(6, true) });
  WA.room.onLeaveLayer("4tiles1monitor/right").subscribe(() => { setTileVariable(6, false) });

  WA.room.onEnterLayer("4tiles1monitor/bottomleft").subscribe(() => { setTileVariable(7, true) });
  WA.room.onLeaveLayer("4tiles1monitor/bottomleft").subscribe(() => { setTileVariable(7, false) });

  WA.room.onEnterLayer("4tiles1monitor/bottom").subscribe(() => { setTileVariable(8, true) });
  WA.room.onLeaveLayer("4tiles1monitor/bottom").subscribe(() => { setTileVariable(8, false) });

  WA.room.onEnterLayer("4tiles1monitor/bottomright").subscribe(() => { setTileVariable(9, true) });
  WA.room.onLeaveLayer("4tiles1monitor/bottomright").subscribe(() => { setTileVariable(9, false) });

  WA.room.onEnterLayer("4tiles1monitor/code").subscribe(() => { showCheckMessage() });
  WA.room.onLeaveLayer("4tiles1monitor/code").subscribe(() => { screenMessage.remove() });

  WA.room.onEnterLayer("4tiles1monitor/reset").subscribe(() => { showResetMessage() });
  WA.room.onLeaveLayer("4tiles1monitor/reset").subscribe(() => { screenMessage.remove() });
}

export { init }