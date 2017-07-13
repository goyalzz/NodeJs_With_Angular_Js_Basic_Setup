class Constants {

	constructor() {
		this.PORT = process.env.PORT || 8090;
		this.MONGODB_URI = process.env.MONGODB_URI || "mongodb://<USER_NAME>:<PASSWORD>@<DOMAIN_NAME>:<PORT>/<DB_NAME>";
	}
}

var constants = new Constants();

module.exports = constants;