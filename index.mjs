import os from 'node:os'

// porcentage of memory used
const cpuStat = os.cpus()
let initialTime = 0
let idleTime = 0

cpuStat.forEach(({ times }) => {
  initialTime += times.user + times.sys + times.idle + times.irq
  idleTime += times.idle
})

// interval to watch parametres every time
setInterval(() => {
  let finalInitial = 0
  let finalIdle = 0
  os.cpus().forEach(({ times }) => {
    finalInitial += times.user + times.sys + times.idle + times.irq
    finalIdle += times.idle
  })

  const diffTotal = finalInitial - initialTime
  const diffIdle = finalIdle - idleTime

  const cpuUsage = (1 - diffIdle / diffTotal) * 100
  // porcentage of memory used and available

  const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
  const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
  const porcentageMemoryUsed = 100 - (freeMemory / totalMemory * 100)
  const localTime = new Date().toLocaleTimeString()
  console.log(`${localTime}     CPU-USED: ${cpuUsage.toFixed(2)}%     MEM-USED:${porcentageMemoryUsed.toFixed(2)}% `)
}, 1000)
