import { getLayersMap } from '@workadventure/scripting-api-extra';

let automoving = false;

async function getMovementLayer() {
  const layersMap = await getLayersMap();
  const layers = Array.from(layersMap.keys()).filter(layer => layer.startsWith("movementLayer/"));

  console.debug("Found movement layer: " + JSON.stringify(layers));
  let fullLayer = [];
  for (const index in layers) {
    fullLayer.push(layersMap.get(layers[index]));
  }
  return fullLayer;
}

async function init() {
  const layerToInit = await getMovementLayer();

  layerToInit.forEach(layer => {
    WA.room.onEnterLayer(layer.name).subscribe(() => {
      const moveTo = layer.properties.find(it => it.name == "moveTo");
      if (moveTo != undefined && !automoving) {
        const coords = moveTo.value.split(',');
        const x = parseInt(coords[0]);
        const y = parseInt(coords[1]);
        console.debug("Move to: " + x + "," + y);

        WA.controls.disablePlayerControls();
        automoving = true;

        WA.player.moveTo(x, y, 15).then((result) => {
          WA.controls.restorePlayerControls();
          automoving = false;
        });
      }
    });
  });

  //WA.player.onPlayerMove(console.log);
}

export { init }