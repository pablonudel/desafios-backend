import passport from 'passport'
import local from 'passport-local'
import {UserModel, CartModel} from '../models/index.js'
import {hashPass, unhashPass} from '../utils/index.js'
import {config} from './config.js'

const LocalStrategy = local.Strategy
const userAdmin = {_id:'admin', name:'Admin',lastname:'User', role:'admin'} // cargar en variables de entorno
const avatar = "/images/default-avatar.jpg"

export const initPassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req, email, password, done)=>{
        try {
            const {name,lastname} = req.body
            if(!name || !lastname || !email || !password) return done(null, false)
            const exist = await UserModel.findOne({email:email})
            if(exist) return done(null, false)
            const userCart =  await CartModel.create({})
            const result = await UserModel.create({name,lastname,email,password:hashPass(password),role:'user', cartID: userCart.id, avatar: avatar})
            return done(null, result)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'}, async( email, password, done)=>{
        try {
            if(!email || !password) return done(null, false)
            if(email===config.SERVER.ADMIN.USER && password === config.SERVER.ADMIN.PASSWORD){
                return done(null, userAdmin)
            }else{
            const user = await UserModel.findOne({email:email})
            if(!user) return done(null, false)
            if(!unhashPass(user,password)) return done(null, false)
            return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async (id, done)=>{
        if(id==='admin'){
            return done(null, userAdmin)
        }else{
        const result = await UserModel.findOne({_id:id})
        return done(null, result)
        }
    })
}