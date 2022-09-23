const NO_MATE_LAYER = 'noMate';
const NO_COFFE_LAYER = 'noCoffee';

function emptyMate() {
  const emptyMateMessage = WA.ui.displayActionMessage({
    message: "Kein Mate verfügbar"
  });
  console.debug("Show Mate message")

  setTimeout(() => {
    emptyMateMessage.remove();
  }, 1000)
}

function emptyCoffee() {
  const emptyCoffeeMessage = WA.ui.displayActionMessage({
    message: "Kein Kaffee verfügbar, nur noch koffeinfrei...."
  });
  setTimeout(() => {
    emptyCoffeeMessage.remove();
  }, 1000)
}

function initLayersFunctions() {
  WA.room.onEnterLayer(NO_MATE_LAYER).subscribe(() => { emptyMate(); });
  WA.room.onEnterLayer(NO_COFFE_LAYER).subscribe(() => { emptyCoffee(); });
}

export { initLayersFunctions };