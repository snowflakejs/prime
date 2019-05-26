var express = require('express');
var app = express();
var path = require('path');
const port = 3000;


app.use(express.static(path.join(__dirname, '/dist')));

app.get("*", function(request, response) {
  response.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, () => console.log(`deployed on port ${port}`));
