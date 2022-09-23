const NO_MATE_LAYER = 'noMate';
const NO_COFFE_LAYER = 'noCoffee';

function emptyMate() {
  const emptyMateMessage = WA.ui.displayActionMessage({
    message: "Kein Mate verfügbar"
  });
  console.debug("Show Mate")
}

function emptyCoffee() {
  const emptyCoffeeMessage = WA.ui.displayActionMessage({
    message: "Kein Kaffee verfügbar, nur noch koffeinfrei...."
  });
}

function initLayersFunctions() {
  WA.room.onEnterLayer(NO_MATE_LAYER).subscribe(() => { emptyMate(); });
  WA.room.onLeaveLayer(NO_MATE_LAYER).subscribe(() => { shownActionMessage.remove(); });

  WA.room.onEnterLayer(NO_COFFE_LAYER).subscribe(() => { emptyCoffee(); });
  WA.room.onLeaveLayer(NO_COFFE_LAYER).subscribe(() => { shownActionMessage.remove(); });
}

export { initLayersFunctions };