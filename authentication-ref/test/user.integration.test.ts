import prisma from "../src/db";

beforeAll(async() => {
    await prisma.user.create({
        data: {
            role: 'STUDENT',
            email: 'johndoe@aol.com',
            hashed_pw: 's09d8f7us0dfhisodlkf',
            email_confirmed: true,
            first_name: 'John',
            last_name: 'Doe'
        }
    })
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

it('can retreive users', async () => {
    const users = await prisma.user.findMany();
    console.log(users);
});