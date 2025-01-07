import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtmgeoCodeController } from './atmgeo-code/atmgeo-code.controller';
import { AtmgeoCode } from './atmgeo-code/atmgeo-code';
import { AtmgeoCodeService } from './atmgeo-code/atmgeo-code.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, AtmgeoCodeController],
  providers: [AppService, AtmgeoCode, AtmgeoCodeService],
})
export class AppModule {}
