const os = require('os');
const log = require('./logger')

const { freemem, totalmem } = os

setInterval( () => {

    const getMB = (memoryAmount) => parseInt(memoryAmount / ( 1024 ** 2 ))
    const memoryUsage = getMB(totalmem()) - getMB(freemem())
    const getPercent = () =>  parseInt((memoryUsage / getMB(totalmem)) * 100)

    const stats = {
        free: `${getMB(freemem())} MB`,
        total: `${getMB(totalmem())} MB`,
        usage: `${getPercent()}%`
    }

    console.clear()
    console.table(stats)

    log(`${JSON.stringify(stats)}\n`)

}, 1000 )
