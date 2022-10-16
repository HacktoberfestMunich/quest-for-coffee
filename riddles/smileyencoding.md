# Smiling at History

In this corner of the room, a display with four windows is open. As you come closer, your perception is captured by a list of ancient runes
from *way* before the Age of Stars displayed in one of the windows.

<p>
    <select name="emojikey0" id="emojikey0-select" onchange="runCircle()">
        <option value="1F620">&#x1F620;</option>
        <option value="1F610">&#x1F610;</option>
        <option value="1F600">&#x1F600;</option>
    </select>
    <select name="emojikey1" id="emojikey1-select" onchange="runCircle()">
        <option value="1F4A9">&#x1F4A9;</option>
        <option value="1F6D1">&#x1F6D1;</option>
        <option value="023F0">&#x23F0;</option>
    </select>
    <select name="emojikey2" id="emojikey2-select" onchange="runCircle()">
        <option value="026F5">&#x26F5;</option>
        <option value="1F353">&#x1F353;</option>
        <option value="1F6E0">&#x1F6E0;</option>
    </select>
    <select name="emojikey3" id="emojikey3-select" onchange="runCircle()">
        <option value="1F512">&#x1F512;</option>
        <option value="1FA79">&#x1FA79;</option>
        <option value="02694">&#x2694;</option>
    </select>
    <select name="emojikey4" id="emojikey4-select" onchange="runCircle()">
        <option value="1F6B1">&#x1F6B1;</option>
        <option value="1F5E1">&#x1F5E1;</option>
        <option value="1F911">&#x1F911;</option>
    </select>
    <select name="emojikey5" id="emojikey5-select" onchange="runCircle()">
        <option value="1F48C">&#x1F48C;</option>
        <option value="02615">&#x2615;</option>
        <option value="02696">&#x2696;</option>
    </select>
    <select name="emojikey6" id="emojikey6-select" onchange="runCircle()">
        <option value="02668">&#x2668;</option>
        <option value="1F3FA">&#x1F3FA;</option>
        <option value="02797">&#x2797;</option>
    </select>
    <select name="emojikey7" id="emojikey7-select" onchange="runCircle()">
        <option value="1F64F">&#x1F64F;</option>
        <option value="1F615">&#x1F615;</option>
        <option value="1F6EC">&#x1F6EC;</option>
    </select>
    <select name="emojikey8" id="emojikey8-select" onchange="runCircle()">
        <option value="1F9DE">&#x1F9DE;</option>
        <option value="1F647">&#x1F647;</option>
        <option value="1F4A2">&#x1F4A2;</option>
    </select>
    <select name="emojikey9" id="emojikey9-select" onchange="runCircle()">
        <option value="1F578">&#x1F578;</option>
        <option value="1F4D3">&#x1F4D3;</option>
        <option value="1F93A">&#x1F93A;</option>
    </select>
    <select name="emojikeyA" id="emojikeyA-select" onchange="runCircle()">
        <option value="1F910">&#x1F910;</option>
        <option value="02708">&#x2708;</option>
        <option value="023F0">&#x23F0;</option>
    </select>
    <select name="emojikeyB" id="emojikeyB-select" onchange="runCircle()">
        <option value="1FA90">&#x1FA90;</option>
        <option value="1F376">&#x1F376;</option>
        <option value="1F9ED">&#x1F9ED;</option>
    </select>
    <script>
        function keygen() {
                var val0 = document.getElementById("emojikey0-select").value;
                var val1 = document.getElementById("emojikey1-select").value;
                var val2 = document.getElementById("emojikey2-select").value;
                var val3 = document.getElementById("emojikey3-select").value;
                var val4 = document.getElementById("emojikey4-select").value;
                var val5 = document.getElementById("emojikey5-select").value;
                var val6 = document.getElementById("emojikey6-select").value;
                var val7 = document.getElementById("emojikey7-select").value;
                var val8 = document.getElementById("emojikey8-select").value;
                var val9 = document.getElementById("emojikey9-select").value;
                var valA = document.getElementById("emojikeyA-select").value;
                var valB = document.getElementById("emojikeyB-select").value;
                var total = val0+val1+val2+val3+val4+val5+val6+val7+val8+val9+valA+valB;
                var key0 = parseInt(total.substring( 2, 7), 16);
                var key1 = parseInt(total.substring( 7,12), 16);
                var key2 = parseInt(total.substring(12,17), 16);
                var key3 = parseInt(total.substring(17,22), 16);
                var key4 = parseInt(total.substring(22,27), 16);
                var key5 = parseInt(total.substring(27,32), 16);
                var key6 = parseInt(total.substring(32,37), 16);
                var key7 = parseInt(total.substring(37,42), 16);
                var key8 = parseInt(total.substring(42,47), 16);
                var key9 = parseInt(total.substring(47,52), 16);
                var keyA = parseInt(total.substring(52,57), 16);
                var keyB = parseInt(total.substring(57) + total.substring(0,2), 16);
                return [key0, key1, key2, key3, key4, key5, key6, key7, key8, key9, keyA, keyB];
            }
            function decode(input) {
                var keys = keygen();
                var out = []
                for (var i = 0; i < 12; ++i)
                {
                    out.push(String.fromCharCode(parseInt(input.substring(8*i, 8*(i+1)), 10) ^ keys[i]))
                }
                return out.join("")
            }
            function runCircle()
            {
                var out = document.getElementById("decoded")
                console.log(out.innerHtml)
                console.log(decode("004014880044682900450683003324100059428800398695004975310039868400303735003162590046091200650604"))
                out.innerHtml = decode("004014880044682900450683003324100059428800398695004975310039868400303735003162590046091200650604")
            }
    </script>
</p>

Another window appears to contain a wall of text someone left open.

<p>
<code>
When I woke up that morning, I stubbed my toe - what a start, let me tell you.
Looking back, it was probably a sign, but I weren't to pick up on that until much later.
As I made my way to the cafeteria, I noticed Ensign Guybrush carrying around a tube of torque grease.
But I have told Traynor again and again that she needs to fix her security.
As I arrived, I got jumped by someone from accounting.
Apparently, someone didn't order any java - like, at all!
Now, we have a average consumption of 4 packages per tenday, leaving us with reserves that will last about 3,5 weeks which with monthly
supply runs is a problem.
What am I supposed to do there?
Should I go to the quarter master and complain that someone failed to order the single-most important substance?
Last time I did, I got written up - not doing that again.
So now I know that coffee is going to be a problem soon, making it time for my departure.
Just grab a bottle of mate and be on my way.
</code>
</p>

The third window contains a display, showing the following content:

<p><code>Your decoded password is: </code></p><div id="decoded"></div>

The fourth and final window shows a prompt, waiting for something. On the side of the monitor, close to this window,
someone has tucked on a note:

> Readable text password, no inappropriate words. Stick to the guidelines, Frank!

<details><summary>Task</summary>
When you are certain that the correct password has been unscrambled, add it behind the `8:`.
</details>

<div class="key">
8: ""
</div>
