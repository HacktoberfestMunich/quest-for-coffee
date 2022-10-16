
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

      function encode(input) {
          var keys = keygen();

          var out = []
          for (var i = 0; i < 12; ++i) {
              var transform = input.value.charCodeAt(i) ^ keys[i];
              var padded = ("" + transform).padStart(8, '0');
              out.push(padded);
          }
          return out.join("");
      }