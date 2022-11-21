import { Router } from 'express'
import passport from 'passport'
import { middleware } from '../middlewares/index.js';
import { ServerResponse } from "../utils/index.js";


const router = Router()

router.get('/auth', middleware.checkAuth, (req,res) =>{
    ServerResponse.success({req:req, res, data:{userID:req.user._id, cart:req.user.cart, email:req.user.email}})
})

router.post('/register', passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}), async (req,res)=>{
    ServerResponse.success({req:req, res, data:req.user})
})

router.get('/registerfail', async (req, res)=>{
    ServerResponse.notFound({req:req, res, error:'Register fail'})
})

router.post('/login', passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}), async (req,res)=>{
    req.session.user = {id:req.user._id, name:req.user.name, lastname:req.user.lastname, email:req.user.email, role:req.user.role, avatar:req.user.avatar, cart:req.user.cart}
    ServerResponse.success({req:req, res, data:req.session.user})
})

router.get('/loginfail', (req, res)=>{
    ServerResponse.notFound({req:req, res, error:'Login fail'})
})

router.get('/logout', (req,res)=>{
    req.session.destroy(error => {
        if(error) return ServerResponse.internalError({req:req, res, data:'Internal Server Error'})
        ServerResponse.success({req:req, res, data:'Deslogueado'})
    } )
})


export default router;