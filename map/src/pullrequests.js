const PR_STATS_FILE = 'https://hacktoberfestmunich.github.io/quest-for-coffee/solutions/pr-data.json';
const CODE = "6h7H20B"
const NERF_CONTRIBUTORS = { "svendroid": 1, "Poeschl": 5, "cramosk": 11 };

let screenMessage;

function checkPRs() {

  fetch(PR_STATS_FILE)
    .then(res => res.json())
    .then(async contributors => {
      console.debug("Recieved stats: " + JSON.stringify(contributors));

      const contributorMap = new Map();
      for (const index in contributors) {
        const contributor = contributors[index];

        const nerfCount = NERF_CONTRIBUTORS[contributor.contributor] || 0;
        const contributionCount = contributor.count - nerfCount;
        if (contributionCount > 0) {
          contributorMap.set(contributor.contributor, contributor.count - nerfCount);
        }
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
  if (sortedContributors.size > 0) {
    for (const [name, count] of sortedContributors) {
      text = text + name + ": " + count + "; ";
    }
  } else {
    text = "No contributions detected"
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