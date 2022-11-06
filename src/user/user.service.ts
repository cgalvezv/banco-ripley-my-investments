import {Injectable, Logger} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prismaSrv: PrismaService) {}

    async getUser(where: Prisma.UserWhereUniqueInput): Promise<User| null> {
        return this.prismaSrv.user.findUnique({
            where
        });
    }

    async getAllUsers(params: any): Promise<User[]> {
        return this.prismaSrv.user.findMany({
            ...params
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prismaSrv.user.create({ data });
    }

    async updateUser(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prismaSrv.user.update({ data, where });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaSrv.user.delete({ where });
    }
}
