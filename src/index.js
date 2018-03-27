const server = require('./server.js')

function MockApiWebpackPlugin({ mockMap, port = 3000 }) {
	
	this.mockMap = mockMap
	this.port = port
}

MockApiWebpackPlugin.prototype.apply = function(compiler) {

	server({
		mockMap: this.mockMap,
		port: this.port
	})

	compiler.plugin('emit', (compilation, callback) => {
		callback()
	})
}


module.exports = MockApiWebpackPlugin