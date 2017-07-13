// http://blog.modulus.io/getting-started-with-mongoose
// mongoose 4.3.x
var mongoose = require('mongoose');
var Constants = require('../utils/Constants.js');
var MobileService = require('../mongoose/MobileService.js');
/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.Promise = global.Promise;

var conn = mongoose.connection;

mongoose.connect(Constants.MONGODB_URI, options);

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  console.info("Mongo Connected");
  MobileService.setMongoConnected(true);
});