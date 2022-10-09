const PR_STATS_FILE = 'https://poeschl.github.io/quest-for-coffee/solutions/pr-data.json';
const CODE = "6h7H20B"

let screenMessage;

function checkPRs() {

  fetch(PR_STATS_FILE)
    .then(res => res.json())
    .then(async contributors => {
      console.debug("Recieved stats: " + JSON.stringify(contributors));

      const contributorMap = new Map();
      for (const index in contributors) {
        const contributor = contributors[index];
        contributorMap.set(contributor.contributor, contributor.count);
      }

      screenMessage.remove();
      let text;
      if (checkValid(contributorMap)) {
        text = buildSuccessText();
      } else {
        text = buildContributionInfo(contributorMap);
      }
      screenMessage = WA.ui.displayActionMessage({
        message: text,
        type: "message",
        callback: () => { checkPRs(); }
      });

    });
}

function checkValid(contributorMap) {
  const validContributions = new Map([...contributorMap].filter(([name, count]) => count >= 2));
  return validContributions.size >= 4;
}

function buildContributionInfo(contributorMap) {
  let text = "Detected contributions: ";
  const sortedContributors = new Map([...contributorMap.entries()].sort((a, b) => b[1] - a[1]));
  for (const [name, count] of sortedContributors) {
    text = text + name + ": " + count + "; ";
  }
  return text.substring(0, text.length - 2);
}

function buildSuccessText() {
  return "Contributions are equal :) Here is your code: " + CODE;
}

function showCheckMessage() {
  screenMessage = WA.ui.displayActionMessage({
    message: "Contribution check with Space",
    type: "message",
    callback: () => { checkPRs(); }
  });
}

function init() {
  WA.room.onEnterLayer("pullrequests/info").subscribe(() => { showCheckMessage() });
  WA.room.onLeaveLayer("pullrequests/info").subscribe(() => { screenMessage.remove() });
}

export { init }