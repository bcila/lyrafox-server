import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { CustomRequest } from '../../common/interfaces/custom-request.interface';
import { ApiResponse } from '../../common/dto/response.dto';
import { UserWithoutPassword } from '../users/types/users.types';
import { ApiStatus } from '../../common/enums/api-status.enum';
import { AccessToken } from './types/auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @Post('login')
  async signIn(
    @Request() req: CustomRequest,
  ): Promise<ApiResponse<AccessToken>> {
    const token: AccessToken = await this.authService.login(req.user);

    return {
      status: ApiStatus.SUCCESS,
      data: token,
    };
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<ApiResponse<UserWithoutPassword>> {
    const newUser: UserWithoutPassword =
      await this.authService.register(registerDto);
    return {
      status: ApiStatus.SUCCESS,
      data: newUser,
    };
  }
}
