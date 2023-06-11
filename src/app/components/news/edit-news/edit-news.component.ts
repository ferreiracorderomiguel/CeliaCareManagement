import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
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
  opc: number = 1;
  title: string = '';
  description: string = '';
  source: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';
  selectedFile: any;

  constructor(
    public dialogRef: MatDialogRef<EditNewsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { modalTitle: string; newsId: number; opc: number },
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {
    this.modalTitle = data.modalTitle;
    this.newsId = data.newsId;
    this.opc = data.opc;
  }

  ngOnInit(): void {
    this.loadNewsData();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null) {
      console.log(this.selectedFile);
    }
  }

  loadNewsData() {
    const news: News = this.getNewsById(this.newsId);
    this.title = news.title;
    this.description = news.description;
    this.source = news.source;
    this.image = news.image;
  }

  getNewsById(newsId: number) {
    return this.newsService.getNewsById(newsId);
  }

  editNews() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();
      this.getImageName();

      const newNews = new News(
        this.title,
        this.description,
        this.image,
        this.dateTimeString,
        this.source
      );

      this.newsService.updateNews(this.newsId, newNews);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.title.trim() === '' ||
      this.description.trim() === '' ||
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

  getImageName() {
    let imageName = this.title.trim();

    imageName = imageName.replace(/\s+/g, '_');
    imageName = imageName.toLowerCase();
    imageName = imageName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    imageName = imageName.replace(/¿|\?/g, '');
    imageName = imageName.replace(/,/g, '');

    imageName += '.png';

    this.image = imageName;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
