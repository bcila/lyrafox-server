import { User } from '@prisma/client';
import { ApiStatus } from '../../../common/enums/api-status.enum';

export type UserWithoutPassword = Omit<User, 'password'>;
export type UserUpdateResponse = Omit<User, 'password'>;
export type DeleteUserResponse = { status: ApiStatus };
