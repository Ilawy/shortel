import { Reflector } from '@nestjs/core';

export const SYSTEM_ROLES = ['admin', 'user'] as const;

export type Role = (typeof SYSTEM_ROLES)[number];

export const Auth = Reflector.createDecorator<Role[] | boolean>({
  key: 'roles',
  transform: (x) => {
    return x || true;
  },
});
