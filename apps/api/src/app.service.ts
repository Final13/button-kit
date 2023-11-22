import { stage } from '@lskjs/env';
import { Injectable } from '@nestjs/common';

import getDataHandler from './getData';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World from API: ${stage}`;
  }

  getData(req, res) {
    return getDataHandler(req, res);
  }
}
