import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import * as argon2 from 'argon2';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    return users;
  }

  async getUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      select: { id: true, email: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          password: await argon2.hash(createUserDto.password),
        },
        select: { id: true, email: true, createdAt: false, updatedAt: true },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
      select: { id: true, email: true },
    });
    return userUpdated;
  }

  async deleteUser(id: number) {
    const isDeleted = await this.prismaService.user.delete({
      where: { id: id },
      select: { id: true, email: true },
    });

    return isDeleted;
  }
}
