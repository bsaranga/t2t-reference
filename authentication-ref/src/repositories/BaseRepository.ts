import { PrismaClient } from "@prisma/client/extension";

export default abstract class BaseRepository<T> {
    constructor(protected modelClient: PrismaClient) {}

    getAll(options: Record<string, any> = {}): Promise<Array<T>> {
        return this.modelClient.findMany(options);
    }

    getById(id: String | number): Promise<T> {
        return this.modelClient.findUnique({
            where: {
                id,
            }
        });
    }

    create(entity: Omit<T,'id'>): Promise<T> {
        return this.modelClient.create({
            data: entity
        })
    }
}