const BACKGROUND_SOUND = "https://cdn.pixabay.com/download/audio/2022/02/22/audio_8590a9aa91.mp3?filename=spaceship-ambience-with-effects-21420.mp3";

function startEnvironmentEmersion() {
  var spaceSounds = WA.sound.loadSound(BACKGROUND_SOUND);
  var config = {
    volume: 0.25,
    loop: true,
    rate: 1,
    detune: 1,
    delay: 0,
    seek: 0,
    mute: false
  }
  spaceSounds.play(config);
}

function createNonTalkativeZone() {
  WA.controls.disableWebcam();
  WA.controls.disableMicrophone();
  WA.controls.disablePlayerProximityMeeting();
}

function initMapFeatures() {
  startEnvironmentEmersion();
  createNonTalkativeZone();
}

export { initMapFeatures };