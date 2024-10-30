import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ApiResponseMeta } from '../../common/dto/response.dto';
import {
  DeleteUserResponse,
  UserUpdateResponse,
  UserWithoutPassword,
} from './types/users.types';
import { ApiStatus } from '../../common/enums/api-status.enum';
import { UserQueryDto } from './dto/user-query.dto';

@ApiTags('Users')
@ApiBearerAuth() // Swagger UI
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
  ): Promise<ApiResponse<UserWithoutPassword>> {
    const user = await this.usersService.getUser(id);

    return {
      status: ApiStatus.SUCCESS,
      data: user,
    };
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Page number',
    type: Number,
  })
  async getUsers(
    @Query() userQueryDto: UserQueryDto,
  ): Promise<ApiResponse<UserWithoutPassword[]>> {
    const { take = 10, skip = 0 } = userQueryDto;
    console.log(userQueryDto);
    const users: UserWithoutPassword[] = await this.usersService.getUsers({
      take,
      skip,
    });
    const meta: ApiResponseMeta = {
      pageSize: take,
      currentPage: skip,
      totalItems: users.length,
      totalPages: Math.ceil(users.length / skip),
    };

    return {
      status: ApiStatus.SUCCESS,
      data: users,
      meta: meta,
    };
  }

  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserUpdateResponse>> {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    return {
      status: ApiStatus.SUCCESS,
      data: updatedUser,
    };
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<ApiResponse<DeleteUserResponse>> {
    await this.usersService.deleteUser(id);
    return {
      status: ApiStatus.SUCCESS,
    };
  }
}
