import { compareArrays } from "./utils";

const COMBINATIONS = [
  ['yellow', 'red', 'red', 'green'],
  ['red', 'blue', 'red', 'red', 'yellow', 'red'],
  ['blue', 'blue', 'red', 'green', 'green', 'green', 'blue'],
  ['blue', 'blue', 'red', 'red', 'red', 'yellow', 'green']
];
const VAR_PRESET = "colors-";
const WRONG_SOUND = WA.sound.loadSound("https://cdn.pixabay.com/download/audio/2022/03/10/audio_8b0fae46ef.mp3?filename=wrong-47985.mp3");
const CORRECT_SOUND = WA.sound.loadSound("https://cdn.pixabay.com/download/audio/2021/08/04/audio_a5fa3caf34.mp3?filename=good-6081.mp3");

let screenMessage;

function walkOnColoring(color, onColor) {
  const status = WA.state.loadVariable(VAR_PRESET + "status");
  if (status == "RUNNING" && onColor) {
    WA.room.showLayer("colors/" + color);
  } else {
    WA.room.hideLayer("colors/" + color);
  }
}

function addColorInput(color) {
  const status = WA.state.loadVariable(VAR_PRESET + "status");
  if (status == "RUNNING") {
    let inputsequence = JSON.parse(WA.state.loadVariable(VAR_PRESET + "input"));

    inputsequence.push(color);

    WA.state.saveVariable(VAR_PRESET + "input", JSON.stringify(inputsequence));
    console.debug("colors: added " + color + " - " + inputsequence);

    const solution = JSON.parse(WA.state.loadVariable(VAR_PRESET + "solution"));
    if (inputsequence.length == solution.length) {
      checkSequence(inputsequence, solution);
    }
  }
}

function checkSequence(input, solution) {
  if (compareArrays(input, solution)) {
    const round = WA.state.loadVariable(VAR_PRESET + "round");
    if (round == (COMBINATIONS.length - 1)) {
      WA.state.saveVariable(VAR_PRESET + "status", "FINISHED");
    } else {
      WA.state.saveVariable(VAR_PRESET + "status", "CORRECT");
    }
  } else {
    WA.state.saveVariable(VAR_PRESET + "status", "FAILED");
  }
}

function nextCombination() {
  const round = WA.state.loadVariable(VAR_PRESET + "round");
  console.debug("Next combination: " + round);

  const nextSequence = COMBINATIONS[round];
  WA.state.saveVariable(VAR_PRESET + "round", (round + 1) % COMBINATIONS.length);
  WA.state.saveVariable(VAR_PRESET + "solution", JSON.stringify(nextSequence));
}

function onStatusChange(status) {
  if (status == "CORRECT" || status == "FINISHED") {
    WA.room.showLayer("colors/correct");
    CORRECT_SOUND.play();
  } else if (status == "FAILED") {
    WA.room.showLayer("colors/failed");
    WRONG_SOUND.play();
  } else {
    WA.room.hideLayer("colors/correct");
    WA.room.hideLayer("colors/failed");
  }

  if (status == "PREVIEW") {
    const solution = JSON.parse(WA.state.loadVariable(VAR_PRESET + "solution"));
    WA.state.saveVariable(VAR_PRESET + "input", JSON.stringify([]));
    showColors(solution);
  }
}

function clearColors() {
  WA.room.hideLayer("colors/yellow");
  WA.room.hideLayer("colors/blue");
  WA.room.hideLayer("colors/red");
  WA.room.hideLayer("colors/green");
}

function emptyColor(colors) {
  clearColors();
  setTimeout(() => { showColors(colors); }, 200);
}

function showColors(colors) {
  clearColors();

  if (colors.length == 0) {
    WA.state.saveVariable(VAR_PRESET + "status", "RUNNING");
    return
  }

  const color = colors[0];
  colors.splice(0, 1);

  //console.debug("Showing color: " + color + "; Next: " + colors);
  WA.room.showLayer("colors/" + color);
  setTimeout(() => { emptyColor(colors); }, 500);
}

function redButton() {
  const status = WA.state.loadVariable(VAR_PRESET + "status");

  if (status == "CORRECT" || status == "START") {
    nextCombination();
    WA.state.saveVariable(VAR_PRESET + "status", "PREVIEW");
  } else if (status == "FAILED" || status == "RUNNING") {
    WA.state.saveVariable(VAR_PRESET + "status", "PREVIEW");
  }
}

function showMessage() {
  const status = WA.state.loadVariable(VAR_PRESET + "status");

  let text;
  if (status == "FINISHED") {
    text = "Color-coded lock unlocked! Here is your code: 6cvBsd3";
  } else {
    text = "Press the red button.";
  }

  if (screenMessage != undefined) {
    screenMessage.remove();
  }
  screenMessage = WA.ui.displayActionMessage({
    message: text,
    type: "message",
    callback: () => {
      redButton();
      showMessage();
    }
  });
}

function init() {
  clearColors();
  onStatusChange("START");

  WA.room.onEnterLayer("colors/yellow").subscribe(() => { walkOnColoring("yellow", true); addColorInput("yellow") });
  WA.room.onLeaveLayer("colors/yellow").subscribe(() => { walkOnColoring("yellow", false); });

  WA.room.onEnterLayer("colors/red").subscribe(() => { walkOnColoring("red", true); addColorInput("red") });
  WA.room.onLeaveLayer("colors/red").subscribe(() => { walkOnColoring("red", false); });

  WA.room.onEnterLayer("colors/green").subscribe(() => { walkOnColoring("green", true); addColorInput("green") });
  WA.room.onLeaveLayer("colors/green").subscribe(() => { walkOnColoring("green", false); });

  WA.room.onEnterLayer("colors/blue").subscribe(() => { walkOnColoring("blue", true); addColorInput("blue") });
  WA.room.onLeaveLayer("colors/blue").subscribe(() => { walkOnColoring("blue", false); });

  WA.room.onEnterLayer("colors-hidden/button").subscribe(() => { showMessage(); });
  WA.room.onLeaveLayer("colors-hidden/button").subscribe(() => { screenMessage.remove(); });

  WA.state.onVariableChange(VAR_PRESET + "status").subscribe(status => { onStatusChange(status); });
}

export { init }