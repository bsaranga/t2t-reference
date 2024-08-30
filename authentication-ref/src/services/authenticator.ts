import { User } from "@prisma/client";
import { compare } from "bcrypt-ts";

async function passwordMatch(password: string, user: User) {
    const hash = user.hashed_pw;
    return await compare(password, hash);    
}

export { passwordMatch }