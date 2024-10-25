import { SignInDto } from './DTOs/sign-in.dto';
import { CreatUserDto } from './../users/DTOs/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(CreatUserDto: CreatUserDto) {
    const { email, name, password } = CreatUserDto;
    const user = await this.userService.findOne({ email });
    if (user) throw new BadRequestException('User already exists');
    const hashedPass = await bcrypt.hash(password, 10);
    await this.userService.creat({ email, name, password: hashedPass });
    return { succes: true, message: 'User registerd succesfully' };
  }
  async signIn(SignInDto: SignInDto) {
    const { email, password, rememberMe } = SignInDto;
    const user = await this.userService.findByEmail({ email });
    if (!user) throw new BadRequestException('Invalid email or password');
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual)
      throw new BadRequestException('Invalid email or password');
    const payload = {
      sub: user._id
    };
    const expire = rememberMe ? "7d" : "1h"
    return {
      accessToken:  await this.jwtService.signAsync(payload,{expiresIn:expire})
    };
  }

  getCurrentUser(req){
    return this.userService.getById(req.userId)
  }
}
