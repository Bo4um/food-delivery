import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/role/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
