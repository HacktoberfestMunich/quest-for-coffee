const BACKGROUND_SOUND = "";

function createNonTalkativeZone() {
  WA.controls.disableWebcam();
  WA.controls.disableMicrophone();
  WA.controls.disablePlayerProximityMeeting();
}

function initMapFeatures() {
  createNonTalkativeZone();
}

export { initMapFeatures };