const times = [1, 2, 3]
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

let all = [
	Promise.all(times.map(time => wait(1000))),
	Promise.all(times.map(time => wait(500)))
]

Promise.all(all).then(() => 
	console.log('super dupa profit')
)
