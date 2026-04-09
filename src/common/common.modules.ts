import { Module } from '@nestjs/common';
import { HashingService } from './hasing/hasing.service';
import { BcryptHasingService } from './hasing/bcrypt-hashing-service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHasingService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
