import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string){
    const salts = bcrypt.genSaltSync()
    return bcrypt.hash(password, salts)
}