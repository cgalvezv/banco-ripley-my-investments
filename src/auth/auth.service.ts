import {BadRequestException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private userSrv: UserService,
        private jwtSrv: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userSrv.getUser({email})
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string) {
        const user = await this.userSrv.getUser({email})
        if (!user) {
            throw new BadRequestException();
        }
        const payload = { email, sub: user.id };
        const accessToken = this.jwtSrv.sign(payload)
        await this.userSrv.updateUser({email}, {token: accessToken})
        return {
            accessToken,
            expiresIn: new Date(new Date().getTime() + 86400000)
        };
    }
}
