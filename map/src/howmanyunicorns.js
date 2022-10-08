import { registerRiddleSubscription } from "./roomupdates"

const RIDDLE_LISTEN_ID = 7

function showHiddenUnicorns() {
  WA.room.showLayer("howmanyunicorns/hidden-unicorns");
}

function init() {
  WA.room.hideLayer("howmanyunicorns/hidden-unicorns");
  registerRiddleSubscription(7, showHiddenUnicorns)
}

export { init }