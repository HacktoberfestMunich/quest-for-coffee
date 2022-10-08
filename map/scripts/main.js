import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { init as init4tiles1monitor } from "./4tiles1monitor";
import { init as initLayersFunctions } from "./layerfunctions";
import { init as initRoomUpdates } from "./roomupdates";

WA.onInit().then(() => {
  console.log('WorkAdventure API Extra ready');

  bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
  }).catch(e => console.error(e));

  //Setup map
  WA.controls.disableWebcam();
  WA.controls.disableMicrophone();
  WA.controls.disablePlayerProximityMeeting();

  initRoomUpdates();
  initLayersFunctions();
  init4tiles1monitor();
});