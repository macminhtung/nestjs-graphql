import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ScopesGuard } from 'guards/scopes.guard';

export const SCOPE_NAMES_KEY = 'scopeNames';

export function Authorization(scopeNames: string[]) {
  return applyDecorators(
    UseGuards(ScopesGuard),
    SetMetadata(SCOPE_NAMES_KEY, scopeNames),
  );
}
