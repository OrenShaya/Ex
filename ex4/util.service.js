import fs from 'fs'
import http from 'http'
import https from 'https'

export function httpGet(url) {
	const protocol = url.startsWith('https') ? https : http
	const options = {
		method: 'GET',
	}
	return new Promise((resolve, reject) => {
		const req = protocol.request(url, options, res => {
			let data = ''
			res.on('data', chunk => {
				data += chunk
			})
			res.on('end', () => {
				resolve(data)
			})
		})
		req.on('error', err => {
			reject(err)
		})
		req.end()
	})
}

export function readJsonFile(path) {
	const json = fs.readFileSync(path, 'utf8')
	const data = JSON.parse(json)
	return data
}

export function writeJsonFile(path, data) {
	const json = JSON.stringify(data, null, 4)

	return new Promise((resolve, reject) => {
		fs.writeFile(path, json, err => {
			if (err) reject(err)
			resolve()
		})
	})
}

export function download(url, fileName) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(fileName)
		https.get(url, content => {
			content.pipe(file)
			file.on('error', reject)
			file.on('finish', () => {
				file.close()
				resolve()
			})
		})
	})
}
