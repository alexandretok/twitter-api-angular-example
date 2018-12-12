import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  numTweets: number;
  numTweetsCallback;
  orderCallback;

  constructor(
    private dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.numTweets = data.numTweets;
    this.numTweetsCallback = data.numTweetsCallback;
    this.orderCallback = data.orderCallback;
  }

  close() {
    this.dialogRef.close();
  }

  changeNumTweets() {
    this.numTweetsCallback(this.numTweets);
  }

  ngOnInit() { }
}
