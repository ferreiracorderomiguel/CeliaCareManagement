import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service';
import { NotifierService } from 'src/app/services/notifier-service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent implements OnInit {
  modalTitle: string = '';
  newsId: number = 0;
  title: string = '';
  description: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditNewsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { modalTitle: string; newsId: number },
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {
    this.modalTitle = data.modalTitle;
    this.newsId = data.newsId;
  }

  ngOnInit(): void {
    this.loadNewsData();
  }

  loadNewsData() {
    const news: News = this.getNewsById(this.newsId);
    this.title = news.title;
    this.description = news.description;
    this.image = news.image;
  }

  getNewsById(newsId: number) {
    return this.newsService.getNewsById(newsId);
  }

  editNews() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();

      const newNews = new News(
        this.title,
        this.description,
        this.image,
        this.dateTimeString
      );

      this.newsService.updateNews(this.newsId, newNews);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.title.trim() === '' ||
      this.description.trim() === '' ||
      this.image.trim() === ''
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
