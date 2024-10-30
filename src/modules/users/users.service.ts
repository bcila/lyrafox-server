import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UserUpdateResponse, UserWithoutPassword } from './types/users.types';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  // If you do not need password please do not use this method
  async findOne(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUser(id: string): Promise<UserWithoutPassword> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async getUsers(userQueryDto: UserQueryDto): Promise<UserWithoutPassword[]> {
    const { take, skip } = userQueryDto;
    console.log('take', take, 'skip', skip);
    const users = await this.prismaService.user.findMany({
      select: { id: true, email: true, createdAt: true, updatedAt: true },
      take: take,
      skip: skip,
    });

    if (!users) {
      throw new NotFoundException(`Users not found`);
    }

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new BadRequestException('Invalid user data');
    }

    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponse> {
    const updatedUser = this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const isDeleted = await this.prismaService.user.delete({
      where: { id: id },
      select: { id: true },
    });

    if (!isDeleted) {
      throw new NotFoundException(`User not found`);
    }

    return !!isDeleted;
  }
}
