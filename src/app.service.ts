import { Injectable } from '@nestjs/common';
import { data } from '../data/reviews';

@Injectable()
export class AppService {
  getHello() {
    return data.reviews[0];
  }
}
