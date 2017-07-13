const Schema = require('../mongoose/MobiAdzMobileMongoSchema.js');

class MongoMobiAdzData {

	constructor(isMongoConnected) {
		this.isMongoConnected = isMongoConnected;
	}

	setMongoConnected(isMongoConnected) {
		this.isMongoConnected = isMongoConnected;
	}

	getMongoConnected() {
		return this.isMongoConnected;
	}

	save(data, callback) {
		var dummyData = new Schema({
			data: data
		});

		if (this.isMongoConnected) {
			dummyData.save(function(err, dummyData) {
				callback(err, dummyData);
  				// if (err) return console.error(err);
  				// console.dir(dummyData);
			});
		} else {
			callback("Mongo Connection Error :(", null);
		}
	}

	findOne(fbData, callback) {
		// fbData = { recepientId: 'Dhruv' };
		if (this.isMongoConnected) {
			Schema.findOne(fbData, function(err, data) {
				callback(err, data);
				// if (err) return console.error(err);
  				// console.info(data);
			});
		} else {
			callback("Mongo Connection Error :(", null);
		}
	}

	findAll(callback) {
		if (this.isMongoConnected) {
			Schema.find(function(err, dataList) {
				callback(err, dataList);
	  			// if (err) return console.error(err);
  				// console.info(dataList);
			});
		} else {
			callback("Mongo Connection Error :(", null);
		}
	}

	update(data, callback) {
		if (this.isMongoConnected) {
			data.save(function(err, dataList) {
				callback(err, dataList);
	  			// if (err) return console.error(err);
  				// console.info(dataList);
			});
		} else {
			callback("Mongo Connection Error :(", null);
		}
	}
}

var mongoMobiAdzData = new MongoMobiAdzData(false);

module.exports = mongoMobiAdzData;