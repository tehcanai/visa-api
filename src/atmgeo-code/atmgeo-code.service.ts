import { HttpStatus, Injectable } from '@nestjs/common';
import { statusCode } from 'src/types/request';
import { readFileSync } from 'fs';
import { Agent } from 'https';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

interface VisaConfig {
  VISA_ENDPOINT: string;
  USER_ID: string;
  PASSWORD: string;
}

@Injectable()
export class AtmgeoCodeService {
  private agent = new Agent({
    key: readFileSync('./cert/key.pem'),
    cert: readFileSync('./cert/cert.pem'),
    ca: readFileSync('./cert/ca.pem'),
  });

  private readonly url = this.configService.get('VISA_ENDPOINT');
  private readonly userId = this.configService.get('USER_ID');
  private readonly password = this.configService.get('PASSWORD');

  constructor(private configService: ConfigService<VisaConfig>) {}

  getLive(): statusCode {
    return { status: HttpStatus.OK.toString() };
  }

  getCreds() {
    return {
      userId: this.userId,
      password: this.password,
      url: this.url,
    };
  }

  async getLocations() {
    const response = await axios.post(
      this.url,
      {
        requestData: {
          culture: 'en-US',
          options: {
            sort: {
              primary: 'distance',
              direction: 'asc',
            },
            range: {
              count: 10,
              start: 0,
            },
            findFilters: [
              {
                filterName: 'string',
                filterVaule: 'string',
              },
            ],
            operationName: 'or',
            useFirstAmbiguous: true,
          },
          distance: 20,
          location: {
            address: {},
            geocodes: {
              latitude: '30.26759000000004',
              longitude: '-97.74298999999996',
            },
            placeName: 'Austin',
          },
          distanceUnit: 'mi',
          metaDataOptions: 0,
        },
      },
      {
        method: 'POST',
        httpsAgent: this.agent,
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json',
          Authorization:
            'Basic ' +
            Buffer.from(this.userId + ':' + this.password).toString('base64'),
        },
      },
    );
    return response.data;
  }
}
