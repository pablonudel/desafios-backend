import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import { config, initPassport } from './configs/index.js'
import { middleware } from './middlewares/index.js'
import {sessionsRouter, usersRouter, cartRouter, productsRouter} from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(middleware.logger)
app.use(cors())

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_DB.URL,
        dbName:config.MONGO_DB.DB_NAME,
        mongoOptions:{useNewUrlParser:true, useUnifiedTopology:true},
        ttl:6000
    }),
    secret:config.SERVER.SESSION.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
}))
initPassport()
app.use(passport.initialize())
app.use(passport.session())




// app.use('/', (rer,res)=>{
//     res.send('Ok')
// })

app.use(config.SERVER.ROUTES.SESSIONS, sessionsRouter)
app.use(config.SERVER.ROUTES.USERS, usersRouter)
app.use(config.SERVER.ROUTES.CARTS, cartRouter)
app.use(config.SERVER.ROUTES.PRODUCTS, productsRouter)

/** Server Init */
const server = app.listen(config.SERVER.PORT, ()=>{
    console.log(`Server listening on http://localhost:${config.SERVER.PORT}`)
})
server.on('error', error => console.log(`Server error: ${error}`))