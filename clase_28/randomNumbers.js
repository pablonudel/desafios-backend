process.on('message', cant=>{
    const rndNmb = []
    const numberCounter = {}
    for(let i=0; i<cant;i++){
        rndNmb.push(Math.floor(Math.random()*(1000 - 1)+1))
    }
    rndNmb.forEach(function (n) { numberCounter[n] = (numberCounter[n] || 0) + 1; });
    process.send(numberCounter)
})