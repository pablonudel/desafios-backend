////
process.on('exit',evt=>{
    console.log(`Process ended width code ${evt}`);
})
process.on('uncaughtException', evt=>{
    switch(evt.message){
        case 'INVALID TYPE':
            process.exit(-5)
            break
        case 'Empty input':
            process.exit(-4)
    }
})
const processNumbers = (...numbers) => {
    let sum = 0
    if(numbers.length===0){
        console.log({
            error:{
                description:'Empty input'
            }
        });
        throw new Error("Empty input")
    }
    for(const number of numbers){
        if(isNaN(number)){
            console.log({
                error:{
                    description:'INVALID TYPE',
                    numbers,
                    types:numbers.map(value=>typeof value)
                }
            });
            throw new Error("INVALID TYPE")
        }
        sum+=number
    }
    console.log(sum);
}
processNumbers(1,2,3)
///

//console.log(process.cwd()) // Muestra la carpeta actual Current Work Directory **
//console.log(process.pid) // Id del proceso que esta corriendo **
//console.log(process.title) // Desde donde se ejecuta el proceso
//console.log(process.version) // Version del proceso (en este caso node)
//console.log(process.execPath) // Trae el runtime actual **
//console.log(process.platform)
//console.log(process.memoryUsage())