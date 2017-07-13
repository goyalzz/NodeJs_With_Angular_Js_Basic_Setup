// https://coligo.io/create-url-shortener-with-node-express-mongo/
var mongoose = require('mongoose');

// create the counters schema with an _id field and a seq field
var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: 'url_count'},
    seq: {type: Number, default: 1001 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new mongoose.Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: {type: Date, default: Date.now}
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  // find the url_count and increment it by 1
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, cntr) {
      if (error) {
        return next(error);
      }
      // set the _id of the urls collection to the incremented value of the counter
      if(cntr !== null && typeof cntr !== "undefined") {
        doc._id = cntr.seq;
      } else {
        var newCounter = new counter();
        newCounter.save(function(err, data){
          if(err) console.log(err);
          console.log(data);
        });
      }
      next();
  });
});

// create a model from that schema
module.exports = mongoose.model('Url', urlSchema);