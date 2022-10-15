# The escape pods

You see three strange machines with an text engraved into the pedestal.
When coming close to a pedestal an holographic keyboard apprears.

The engraved text tells you:

```markdown
When you enter the right symbols, a gate to the next space station will open. The symbols needs to be separeted with a comma.
```

Below the text on the middle one, there is also an old sticker: `Get your free cup at StarSpace Coffee, now also on the next space station`

----
<form action="#">
<label for="symbol">Symbol input</label><br>
<input type="text" id="symbol" name="symbol"><br>
</form>

<script src="https://play.workadventu.re/iframe_api.js"></script>
<script>
WA.onInit().then(() => {
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
});
</script>
