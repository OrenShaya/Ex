import fs from 'fs'

function sumFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    return new Promise((resolve) => {
        const sum = content.split('\n').reduce((sum, num) => {
            sum += +num
            return sum
        }, 0)
        resolve(sum)
    })
}

sumFromFile('./nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Cannot sum:', err))