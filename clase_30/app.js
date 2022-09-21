import express from 'express'
import __dirname from './utils.js'

const app = express()

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Listening in ${PORT}`))

//app.use(express.static(__dirname+'/public'))

app.use('/api/randoms', (req,res)=>{
    res.send(`Proceso con pid ${process.pid} atendiendo petición en Servidor con puerto ${PORT}`)
})