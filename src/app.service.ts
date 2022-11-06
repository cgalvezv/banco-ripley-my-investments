import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): string {
    return 'This app was developed by Camilo Gálvez Vidal';
  }
}
