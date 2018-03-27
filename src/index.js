const server = require('./server.js')

function MockApiWebpackPlugin({ config, port = 3000 }) {
	
	this.mockMap = config
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