import express from "express";
import {PORT} from './minimist.config.js'
import {info} from './info.js'
import {fork} from 'child_process'
const app = express()

let visitas = 0

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send(`<p>Estoy funcionando en el puerto ${PORT}</p>`)
})
app.get('/info', (req,res)=>{
    res.send(`
    <h1>INFO</h1>
    <p><strong>Argumentos de entrada:</strong> Modo: ${info.Args.MODE} - Puerto: ${info.Args.PORT}</p>
    <p><strong>Nombre de la plataforma:</strong> ${info.OS}</p>
    <p><strong>Versión de node.js:</strong> ${info.NodeVersion}</p>
    <p><strong>Memoria total reservada (rss):</strong> ${info.MemoryUsage}</p>
    <p><strong>Path de ejecución:</strong> ${info.ExecPath}</p>
    <p><strong>Process id:</strong> ${info.ProcessID}</p>
    <p><strong>Carpeta del proyecto:</strong> ${info.ProjectFolder}</p>
    `)
})

app.get('/api/randoms', (req,res)=>{
    const cant = !req.query.cant ? 100000000 : req.query.cant
    const result = fork('./randomNumbers.js')
    result.send(cant)
    result.on('message', result=>{
        res.send(result)
    }) 
})
 
app.get('/visitas', (req,res)=>{
    res.send(`visitado ${++visitas} veces`)
})

/** Server configuration */
const server = app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})
server.on('error', error => console.log(`Server error: ${error}`))