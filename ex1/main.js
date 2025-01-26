import fs from 'fs'
import ms from 'ms'

const content = fs.readFileSync('./timestamp-data.txt', 'utf-8')

// console.log(ms('6 days', {long: true}))

content.split('\n').forEach((ts) => {
    console.log(ts)
    console.log(ms(ts, {long: true}))
})