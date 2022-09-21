import os from 'os'
import cluster from 'cluster'
import express, { application } from 'express'

const CPUs = os.cpus().length
const app = express()

if(cluster.isPrimary){
    console.log(`Proceso Primario con pid ${process.pid}`)
    for(let i = 0; i<CPUs; i++ ){
        cluster.fork()
    }
    cluster.on('message', message=>{
        console.log(message)
    })
    cluster.on('exit', worker=>{
        console.log(`Proceso hijo ${worker.process.pid} ha muerto :(`)
        cluster.fork()
    })
}else{
    console.log(`Proceso hijo con pid ${process.pid} inicializado`);
    app.listen(8080, ()=>console.log(`Listen on PORT 8080`))
}

app.get('/', (req,res)=>{
    res.send(`El proceso ${process.pid} ha atendido esta petición`)
})

app.get('/operacion', (req,res)=>{
    let result = 0
    process.send('hola')
    for(let i=0; i<5e9; i++){
        result+=i
    }
    res.send(`El proceso con pid ${process.pid} finaliza la operacion ${result}`)
})