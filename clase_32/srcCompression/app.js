import express from 'express'
import compression from 'compression'

const app = express()

app.use(compression())

let string = ''
const concat = (text, qty)=>{
    for(let i=0; i<qty; i++){
        string+= text
    }
    return string
}

app.get('/', (req,res)=>{
    res.send(concat('Lorem ipsum se de fue de paseo ',10000))
})

/** Server configuration */
const server = app.listen(8080, ()=>{
    console.log('Server listening on http://localhost:8080')
})
server.on('error', error => console.log(`Server error: ${error}`))