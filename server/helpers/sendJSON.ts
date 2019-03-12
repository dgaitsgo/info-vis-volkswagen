const sendJSON = (res, content) => {

	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify(content))
}

export default sendJSON