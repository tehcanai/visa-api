import { Test, TestingModule } from '@nestjs/testing';
import { AtmgeoCodeService } from './atmgeo-code.service';

describe('AtmgeoCodeService', () => {
  let service: AtmgeoCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtmgeoCodeService],
    }).compile();

    service = module.get<AtmgeoCodeService>(AtmgeoCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
