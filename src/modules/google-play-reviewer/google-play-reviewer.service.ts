import { Injectable } from '@nestjs/common';
import { data } from '../../../data/reviews';

@Injectable()
export class GooglePlayReviewerService {
  getGooglePlayReviews() {
    return data;
  }
}
