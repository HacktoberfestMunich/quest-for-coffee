import { compareArrays } from "./utils";

const PORTAL_LAYER = "escapeportal";
const VAR_PREFIX = "escape";
const SOLUTION = ["來", "咖", "醒", "伴"]

function onInputChanges(input) {
  const parsedInput = JSON.parse(input);
  if (compareArrays(parsedInput, SOLUTION)) {
    WA.state.saveVariable(VAR_PREFIX + "Status", "OPEN");
  }
}

function onStatusChange(status) {
  if (status == "OPEN") {
    WA.room.showLayer(PORTAL_LAYER);
  } else {
    WA.room.hideLayer(PORTAL_LAYER);
  }
}

function init() {

  WA.ui.onStatusChange(WA.state.loadVariable(VAR_PREFIX + "Status"));

  WA.state.onVariableChange(VAR_PREFIX + "Input").subscribe(input => { onInputChanges(input); });
  WA.state.onVariableChange(VAR_PREFIX + "Status").subscribe(status => { onStatusChange(status); });
}

export { init }