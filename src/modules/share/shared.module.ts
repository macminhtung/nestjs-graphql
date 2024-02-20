import { Global, Module, Logger } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { PROVIDER_TOKENS } from 'common/constants';

const SHARING_SERVICES = [ConfigService];

@Global()
@Module({
  providers: [
    ...SHARING_SERVICES,
    {
      provide: PROVIDER_TOKENS.LOGGER,
      useClass: Logger,
    },
  ],
  exports: [...SHARING_SERVICES, PROVIDER_TOKENS.LOGGER],
})
export class SharedModule {}
