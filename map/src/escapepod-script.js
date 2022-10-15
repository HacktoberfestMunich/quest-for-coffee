const form = document.getElementById("form");
const formInput = document.getElementById("symbol");

const portalStatus = WA.state.loadVariable("escapeStatus");
const portalInput = WA.state.loadVariable("escapeInput");

function onStatusChange(status){
  if (status == "OPEN") {
    form.style = "display:none";
  } else {
    form.style = "";
  }
}

console.debug("Status: " + portalStatus);
WA.state.onVariableChange(VAR_PREFIX + "Status").subscribe(status => { onStatusChange(status) });
onStatusChange(portalStatus);

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