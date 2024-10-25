import { CreatUserDto } from './../users/DTOs/create-user.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './DTOs/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body()CreatUserDto: CreatUserDto){
    return this.authService.signUp(CreatUserDto)
  }
  @Post('sign-in')
  SigIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto)
  }
  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req){
    return this.authService.getCurrentUser(req)
  }
  @Get('Create')
  @UseGuards(AuthGuard)
  create(@User() id){
    console.log(id, "userId")
  }
}
