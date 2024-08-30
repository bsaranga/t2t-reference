import prisma from '@/db';
import { User } from '@prisma/client';

export default class UserManager {
        
    async findUserByEmail(email: string): Promise<User|null> {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}