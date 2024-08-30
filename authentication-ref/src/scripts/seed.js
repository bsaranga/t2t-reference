const { PrismaClient } = require('prisma/prisma-client')

const prisma = new PrismaClient();

/**
 * Creates temporary user with password set to 'admin'
 */
async function seed() {
    try {
        const users = await prisma.user.findMany();
        if (users.length == 0) {
            console.log('Seeding...');
            await prisma.user.createMany({
                data: [
                    {
                        first_name: "John",
                        last_name: "Doe",
                        email: "johndoe@aol.com",
                        hashed_pw: "$2a$10$hOoQBvN/L5EkQaG.aT.lGuf/j2BaV0gRCcbMkKPLXfSIKaRCMw596",
                        email_confirmed: true,
                        role: "STUDENT"
                    },
                    {
                        first_name: "Jane",
                        last_name: "Doe",
                        email: "janedoe@aol.com",
                        hashed_pw: "$2a$10$hOoQBvN/L5EkQaG.aT.lGuf/j2BaV0gRCcbMkKPLXfSIKaRCMw596",
                        email_confirmed: true,
                        role: "MENTOR"
                    },
                    {
                        first_name: "Alex",
                        last_name: "Doe",
                        email: "alexdoe@aol.com",
                        hashed_pw: "$2a$10$hOoQBvN/L5EkQaG.aT.lGuf/j2BaV0gRCcbMkKPLXfSIKaRCMw596",
                        email_confirmed: true,
                        role: "SUPERADMIN"
                    }
                ]
            })
        } else {
            console.log('Users already exist')
        }
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
    }
}


seed().then(async () => {
    await prisma.$disconnect();
});