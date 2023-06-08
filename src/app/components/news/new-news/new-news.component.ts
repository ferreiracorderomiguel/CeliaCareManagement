import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service';
import { NotifierService } from 'src/app/services/notifier-service';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.component.html',
  styleUrls: ['./new-news.component.css'],
})
export class NewNewsComponent {
  title: string = '';
  description: string = '';
  image: string = '';
  source: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {}

  createNews() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();

      const newNews = new News(
        this.title,
        this.description,
        this.image,
        this.dateTimeString,
        this.source
      );

      this.newsService.addNews(newNews);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.title.trim() === '' ||
      this.description.trim() === '' ||
      this.image.trim() === '' ||
      this.source.trim() === ''
    ) {
      this.notifierService.showNotification(
        'No puede haber campos vacíos',
        'OK'
      );
      return false;
    } else {
      return true;
    }
  }

  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
