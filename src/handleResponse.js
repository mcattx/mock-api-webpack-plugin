const path = require('path')
const fs = require('fs')
const Mock = require('mockjs')

const readFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				if (err.syscall === 'open') {
					console.error(`Open "${err.path}" fail`)
				}
				reject(err)
			}
			resolve(data.toString())
		})
	})
}

module.exports = async(req, res, next) => {
	const mockMap = req.mockMap

	let result = {}

	if (mockMap[req.path]) {
		const data = await readFile(mockMap[req.path].path)
		const parseData = JSON.parse(data)
		if (parseData.randomMock) {
			delete parseData.randomMock
			result = Mock.mock(parseData)
		} else {
			result = parseData
		}
		res.send(result)
	} else {
		res.send({
			code: 200,
			message: `No Proxy Path like: ${req.path}`
		})
	}
	next()
}