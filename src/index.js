const Util = require("./util/util.js");

module.exports = {
	// Main classes
	Client: require("./Client/Client.js"),
	ClientApiError: require("./Client/rest/ClientApiError.js"),
	RestClient: require("./Client/rest/RestClient.js"),

	// DTOs
	Dto: require("./DTO/Dto.js"),
	CleverDto: require("./DTO/CleverDto.js"),
	User: require("./DTO/User.js"),

	// Managers
	Manager: require("./Store/Manager.js"),
	UserManager: require("./Store/UserManager.js"),
	
	// Utilities
	Collection: require("./util/collection.js"),
	typedefs: require("./typedefs.js"),
	Util: Util,
	util: Util
}
