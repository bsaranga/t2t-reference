import prisma from "@/db";
import { User } from "@prisma/client";
import BaseRepository from "./BaseRepository";

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super(prisma.user)
    }
}