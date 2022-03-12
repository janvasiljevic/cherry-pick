import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  providers: [SampleService],
  controllers: [SampleController],
  imports: [PrismaModule],
})
export class SampleModule {}
