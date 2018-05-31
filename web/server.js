const path= require('path');
const express = require('express');

const DIST_DIR = path.join(__dirname, "dist"),
      PORT = 8080,
      app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

const noColor = '\033[0m';
const magenta = '\x1b[35m';

app.listen(PORT, () => {
  `\n${magenta}Front-end is listening at http://192.168.99.100:${PORT}\n${noColor}`
});
