import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.component.html',
  styleUrls: ['./new-news.component.css'],
})
export class NewNewsComponent {
  title: string = '';
  description: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private newsService: NewsService
  ) {}

  createNews() {
    this.getActualDate();

    const newNews = new News(
      this.title,
      this.description,
      this.image,
      this.dateTimeString
    );

    console.log(newNews);
    this.newsService.addNews(newNews);

    this.dialogRef.close(true);
  }

  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
