const path= require('path');
const express = require('express');
const DIST_DIR = path.join(__dirname, "dist");
const PORT = process.env.PORT || 8080;
const app = express();

// Colors are always nice
const noColor = '\033[0m';
const magenta = '\x1b[35m';

app.use(express.static(DIST_DIR));

// Hook it up
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

// Serve it
app.listen(PORT, function(){
  `\n${magenta}Front-end is listening at http://localhost:${PORT}\n${noColor}`
});
