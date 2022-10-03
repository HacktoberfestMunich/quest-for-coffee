function createNonTalkativeZone() {
  WA.controls.disableWebcam();
  WA.controls.disableMicrophone();
  WA.controls.disablePlayerProximityMeeting();
}

function init() {
  createNonTalkativeZone();
}

export { init };