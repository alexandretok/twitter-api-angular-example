import { TestBed } from '@angular/core/testing';
import { TwitterService } from './twitter.service';
import {HttpClientModule} from '@angular/common/http';

describe('TwitterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect(service).toBeTruthy();
  });

  it('should retrieve tweets', async () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect((await service.getTweets(1, 'makeschool')).length).toEqual(1);
  });
});
