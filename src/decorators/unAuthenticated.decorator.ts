import { SetMetadata } from '@nestjs/common';

export const UNAUTHENTICATED_KEY = 'UnAuthenticated';
export const UnAuthenticated = () => SetMetadata(UNAUTHENTICATED_KEY, true);
