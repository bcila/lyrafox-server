import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findOne(email: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: { email: email },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    try {
      const users = await this.prismaService.user.findMany({
        select: { id: true, email: true, createdAt: true, updatedAt: true },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    console.log(typeof user.createdAt);
    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: await argon2.hash(createUserDto.password),
        },
        select: { id: true, email: true, createdAt: true, updatedAt: true },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    const userUpdated = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
      select: { id: true, email: true },
    });
    return userUpdated;
  }

  async deleteUser(
    id: string,
  ): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>> {
    const isDeleted = await this.prismaService.user.delete({
      where: { id: id },
      select: { id: true, email: true },
    });

    return isDeleted;
  }
}
