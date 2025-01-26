import fs from 'fs'

function writeToFile(str) {
    fs.writeFile('./newFile.txt', str, {encoding: 'utf-8'}, ()=>{})
    console.log("I've wrote to a file 😎")
    return new Promise((resolve, reject) => resolve())
}

// writeToFile('This is me writing to a file\nI\'m also checking backslash n\n worked?')

drawSquareToFile()
function drawSquareToFile(times = 500) {
    const str = getSquare(getRandomIntInclusive(3, 20))
    writeToFile(str)
        .then(() => {
            setTimeout(() => drawSquareToFile(times-1), 200)
        })
}

function getSquare(size) {
    var str = '*'.repeat(size) + '\n'
    for (let i = 0; i < size; i++) {
        str += '*' + ' '.repeat(size - 2) + '*\n'
    }
    str += '*'.repeat(size) + '\n'
    return str
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}