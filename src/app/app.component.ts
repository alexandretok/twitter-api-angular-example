import { Component } from '@angular/core';
import { TwitterService } from './twitter.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  numTweets: number = 30;
  tweetRows: Array = [];

  constructor(private twitterService: TwitterService, private dialog: MatDialog) {
    this.loadTweets();
  }

  async loadTweets() {
    this.tweetRows = [];
    const makeschool: Array = [...this.tweetRows, ...(await this.twitterService.getTweets(this.numTweets, 'makeschool'))];
    const newsycombinator: Array = [...this.tweetRows, ...(await this.twitterService.getTweets(this.numTweets, 'newsycombinator'))];
    const ycombinator: Array = [...this.tweetRows, ...(await this.twitterService.getTweets(this.numTweets, 'ycombinator'))];

    // Organizes the tweets as rows in a matrix
    for(let i = 0; i < this.numTweets; i++)
      this.tweetRows.push([
        makeschool[i],
        newsycombinator[i],
        ycombinator[i]
      ]);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      numTweets: this.numTweets,
      numTweetsCallback: numTweets => {
        this.numTweets = numTweets;
        this.loadTweets();
      },
      orderCallback: direction => {
        if(direction < 0) {
          this.tweetRows.forEach(row => {
            const _tmp = row[0];
            row[0] = row[1];
            row[1] = row[2];
            row[2] = _tmp;
          });
        } else {
          this.tweetRows.forEach(row => {
            const _tmp = row[2];
            row[2] = row[1];
            row[1] = row[0];
            row[0] = _tmp;
          });
        }
      }
    };
    this.dialog.open(MyDialogComponent, dialogConfig);
  }
}
