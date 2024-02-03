import bcrypt from 'bcrypt'

export class bCryptService {
    constructor() {
    }
    // Encrypta la contraseña del usuario antes de guardarla en la base de datos
    async Encrypt (password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    
    // Compara la contraseña encryptada del usuario con la contraseña guardada en la base de datos
    async Compare (password: string, hasPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hasPassword)
    }
}
