import UserRepository from "@/repositories/UserRepository";
import prisma from "@/db";

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
    });
});

afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

it('User repository retreival works', async () => {
    const userRepository = new UserRepository();

    const users = await userRepository.getAll();
    expect(users[0].email).toBe("johndoe@aol.com");
});

it('User can be created via repository', async () => {
    const userRepository = new UserRepository();

    const addedUser = await userRepository.create({
        email: "janedoe@aol.com",
        email_confirmed: false,
        first_name: "Jane",
        last_name: "Doe",
        hashed_pw: "sdhfs9df0sdfuiojk",
        role: 'MENTOR'
    });

    const allUsers = await userRepository.getAll();
    const janeDoe = allUsers.find(t => t.email == 'janedoe@aol.com');

    expect(janeDoe).not.toBeNull();
    expect(janeDoe?.email).toBe('janedoe@aol.com');
    expect(janeDoe?.role).toBe('MENTOR');
});