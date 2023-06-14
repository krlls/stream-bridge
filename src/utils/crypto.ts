import * as argon2 from 'argon2'

export const hashPass = async (pass: string) => argon2.hash(pass)
export const verifyPass = async (pass: string, hash: string) => argon2.verify(hash, pass)
