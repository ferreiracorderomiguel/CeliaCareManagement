import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.component.html',
  styleUrls: ['./new-news.component.css']
})
export class NewNewsComponent {

  name: string = "";

  constructor(
    public dialogRef: MatDialogRef<NewNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public title: String
  ) { }

  createNews(){
    this.dialogRef.close(true);
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
