import { ServerResponse } from '../utils/serverResponse.js'
export function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        ServerResponse.unauthorized({req:req, res, error:'No autorizado'})
    }
}