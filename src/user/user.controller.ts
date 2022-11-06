import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userSrv: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:email')
    async getUserByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userSrv.getUser({ email });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(params: any): Promise<User[]> {
        return this.userSrv.getAllUsers(params);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:email')
    async deleteUsers(@Param('email') email: string): Promise<User> {
        return this.userSrv.deleteUser({ email })
    }


}
