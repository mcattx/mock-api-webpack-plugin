const path = require('path')
const fs = require('fs')

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

	if (mockMap[req.path]) {
		const data = await readFile(mockMap[req.path].path)
		res.send(JSON.parse(data))
	} else {
		res.send({
			code: 200,
			message: `No Proxy Path like: ${req.path}`
		})
	}
	next()
}