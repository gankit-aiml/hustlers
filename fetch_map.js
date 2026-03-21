const http = require('https');

http.get('https://maps.app.goo.gl/tjKXtQczXp8LBv8b6', (res) => {
  console.log(res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
