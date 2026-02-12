var express = require('express')
var request = require('request');
var app = express()

/* Old const colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#16a085','#27ae60',
              '#2980b9','#8e44ad','#f1c40f','#e67e22','#e74c3c','#f39c12',
              '#d35400','#c0392b'];
*/

const colors = ['#907735','#731f1d','#496179','#2d6246','#5b5c5e','#734a2a',
'#4e1d55','#261d52','#000120','#415e32','#336461','#6b7320',
'#7a2157','#725422'];


app.get('/', function (req, res) {
  try {
    let hash = req.query.email_hash || 'none'
    let name = req.query.name || "n n"

    let size = Math.max(parseInt(req.query.size) || parseInt(req.query.default_size) || 100, 10)
    ///default headers
    res.setHeader("Cache-Control", "public, max-age=1800");
    //=================

    var input = {
      followRedirect: false,
      uri: `https://www.gravatar.com/avatar/${hash.toLowerCase()}?d=none&s=${size}`
    }
    var rr = request(input).on('response', function(response) {
      res.set('content-type', response.headers['content-type'])
      if(response.statusCode == 200) {
        console.log(`gravatar found for ${name} (${hash})`)
        return rr.pipe(res);
      }

      var letter = name.charAt(0)
      var sletIndex = name.indexOf(' ');
      if(sletIndex >= 0) { letter+= name[sletIndex + 1] || '' }
      letter = letter.toUpperCase();
      var index = ((letter.charCodeAt(0) + letter.charCodeAt(1)) % colors.length) || 0;
      var color = colors[index];

      let svg = `<?xml version="1.0" encoding="utf-8"?>
        <!-- Generator: Adobe Illustrator 16.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="${size}" height="${size}" xml:space="preserve" viewBox="0,0,200,200">
        <g>
            <rect id="box_color" x="0" y="0" fill="${color}" width="200" height="200"/>
            <text x="100" y="130" id="letter_text" text-anchor="middle" font-family="'Helvetica Neue', 'Arial'" font-size="80" fill="#ffffff">${letter}</text>
        </g>
        </svg>`
        console.log(`no gravatar found. Using initial ${name} (${hash})`)
        res.set('content-type', 'image/svg+xml')
        res.send(svg)
    })
  } catch (e) {
    console.log(e)
    res.send('error')
  }
})

app.listen(process.env.PORT || 3005, function () {
  console.log("App stared")
})


