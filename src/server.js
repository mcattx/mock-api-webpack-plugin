const express = require('express')
const mockHandler = require('./mock.js')
const app = express()

module.exports = ({
	mockMap, port = 3000
}) => {
	if (mockMap) {
		const PORT = port

		app.use((req, res, next) => {
			req.mockMap = mockMap
			next()
		})

		app.use(mockHandler)

		const server = app.listen(PORT, () => {
			console.log('Mock server running at http://localhost:' + PORT)
		})

		server.on('error', (err) => {
			// check if port is occupied
		    if (err.code === 'EADDRINUSE') {
		    	console.log('The port【' + PORT + '】 is occupied, please change other port.')
		    }
		})
	} else {
		console.warn('Mock Data Config File Not Found.')
	}
	
}