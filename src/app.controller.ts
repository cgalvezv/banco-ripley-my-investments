import {Controller, Get, Post, UseGuards, Request, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {User} from "@prisma/client";
import {UserService} from "./user/user.service";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authSrv: AuthService,
      private userSrv: UserService,
  ) {}

  @Get()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const { email } = req.body;
    return this.authSrv.login(email);
  }

  @Post('auth/signup')
  async signup(
      @Body() postData: { email: string ; password: string; name?: string }
  ): Promise<User> {
    return this.userSrv.createUser(postData);
  }
}
