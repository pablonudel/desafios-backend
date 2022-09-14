import dotenv from 'dotenv'
import minimist from "minimist";
dotenv.config()

const args = minimist(process.argv.slice(2), {alias:{m:'MODE', p:'PORT'}, default:{m:'prod', p:process.env.PORT}})
export let {MODE,PORT} = args

if( MODE === 'dev' ){
    PORT = 3030
}

export let argsConfig = {
    MODE:MODE,
    PORT:PORT
}