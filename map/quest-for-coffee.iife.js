(function(){"use strict";function e(o){WA.room.hideLayer("Doors/"+o)}function t(){fetch("https://poeschl.github.io/quest-for-coffee/solutions/result.json").then(o=>o.json()).then(o=>{console.debug("Recieved door flags "+JSON.stringify(o));for(const[n,s]of Object.entries(o))s&&e(n)})}setInterval(t,1e3)})();
//# sourceMappingURL=quest-for-coffee.iife.js.map
