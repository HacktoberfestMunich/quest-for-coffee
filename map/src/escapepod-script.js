const formInput = document.getElementById("symbol");

const portalStatus = WA.state.loadVariable("escapeStatus");
const portalInput = WA.state.loadVariable("escapeInput");

console.debug("Status: " + portalStatus);
if (portalStatus == "OPEN") {
  formInput.style = "display:none";
}

if (portalInput != undefined) {
  const parsedInput = JSON.parse(portalInput);
  formInput.value = parsedInput.join(',');
}

formInput.addEventListener("change", (e) => {
  const symbols = document.getElementById("symbol").value;
  const splitted = symbols.split(',')
  console.debug("Input: " + JSON.stringify(splitted));
  WA.state.saveVariable("escapeInput", JSON.stringify(splitted));
});
