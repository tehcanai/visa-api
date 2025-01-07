import { Controller, Get, Post } from '@nestjs/common';
import { AtmgeoCodeService } from './atmgeo-code.service';
import { statusCode } from 'src/types/request';

@Controller('atmgeo-code')
export class AtmgeoCodeController {
  constructor(private readonly atmgeoCodeService: AtmgeoCodeService) {}

  @Get()
  get(): statusCode {
    return {
      ...this.atmgeoCodeService.getLive(),
      ...this.atmgeoCodeService.getCreds(),
    };
  }

  @Post()
  post() {
    return this.atmgeoCodeService.getLocations();
  }
}
