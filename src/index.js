const Util = require("./util/util.js");

module.exports = {
	// Main classes
	Client: require("./Client/Client.js"),
	ClientApiError: require("./Client/rest/ClientApiError.js"),
	RestClient: require("./Client/rest/RestClient.js"),

	// DTO
	Entity: require("./DTO/Entity.js"),
	Mapper: require("./DTO/Mapper.js"),
	Manager: require("./DTO/Manager.js"),

	// Entites
	User: require("./Entities/User.js"),

	// Services
	UserService: require("./Services/UserService.js"),
	
	// Utilities
	Collection: require("./util/collection.js"),
	DataResolver: require("./util/DataResolver.js"),
	Endpoint: require("./util/Endpoint.js"),
	typedefs: require("./typedefs.js"),
	Util: Util,
	util: Util
}
