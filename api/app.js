var path = require('path');
const app = require('./config/express');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
module.exports = app;

app.listen(8000, () => {
  console.log("Server running on port 8000");
 });