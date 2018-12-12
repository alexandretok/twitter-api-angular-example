import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) {}

  getTweets(count: number, username: string) {
  	return new Promise(resolve => {
      this.http.get(this.generateUrl(count, username)).subscribe(data => {
        resolve(data);
      });
    });
  }

  generateUrl(count: number, username: string) {
  	return `http://localhost:7890/1.1/statuses/user_timeline.json?count=${count}&screen_name=${username}`;
  }
}
