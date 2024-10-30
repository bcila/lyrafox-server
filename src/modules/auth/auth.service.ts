import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserWithoutPassword } from '../users/types/users.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async signIn(
  //   email: string,
  //   password: string,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.usersService.findOne(email);
  //
  //   if (!user) {
  //     throw new BadRequestException('Invalid email or password');
  //   }
  //
  //   if (await argon2.verify(user.password, password)) {
  //     const payload = { id: user.id, email: user.email };
  //     return { access_token: await this.jwtService.signAsync(payload) };
  //   } else {
  //     throw new UnauthorizedException('Invalid password or password');
  //   }
  // }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    // const isPasswordMatch = await argon2.verify(user.password, pass);
    if (user && (await argon2.verify(user.password, pass))) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<UserWithoutPassword> {
    return await this.usersService.createUser(registerDto);
  }
}
