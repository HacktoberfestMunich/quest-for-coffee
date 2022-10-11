const form = document.getElementById("symbol");
form.addEventListener("change", (e) => {
  const symbols = document.getElementById("symbol").value;
  const splitted = symbols.split(',')
  console.debug("Input: " + JSON.stringify(splitted));
  WA.state.saveVariable("escapeInput", JSON.stringify(splitted));
});
const podStatus = WA.state.loadVariable("escapeStatus");
console.debug("Status: " + podStatus);
if (podStatus == "OPEN") {
  form.style = "display:none";
}
