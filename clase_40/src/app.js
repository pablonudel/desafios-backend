import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import passport from 'passport'
import {config, initPassport} from './configs/index.js'
import { middleware } from './middlewares/index.js'
import {productsRouter, usersRouter, cartsRouter, sessionsRouter} from './routes/index.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(middleware.logger)
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

// app.use('/', (rer,res)=>{
//     res.send('Ok')
// })

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(config.SERVER.ROUTES.SESSIONS, sessionsRouter)
app.use(config.SERVER.ROUTES.PRODUCTS, productsRouter)
app.use(config.SERVER.ROUTES.USERS, usersRouter)
app.use(config.SERVER.ROUTES.CARTS, cartsRouter)

/** Server configuration */
const server = app.listen(config.SERVER.PORT, ()=>{
    console.log(`Server listening on http://localhost:${config.SERVER.PORT}`)
})
server.on('error', error => console.log(`Server error: ${error}`))