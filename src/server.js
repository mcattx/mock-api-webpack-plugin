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

		app.listen(PORT, () => {
			console.log('Mock server running at http://localhost:' + PORT)
		})
	} else {
		console.warn('Mock Data Config File Not Found.')
	}
	
}