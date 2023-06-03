import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewNewsComponent } from './new-news/new-news.component';
import { NewsService } from 'src/app/services/news-service';
import { NotifierService } from 'src/app/services/notifier-service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  listNews: News[] = [];

  constructor(
    public dialog: MatDialog,
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.listNews = this.newsService.getNews();
  }

  openDialogNewNews() {
    const dialogRef = this.dialog.open(NewNewsComponent, {
      width: '500px',
      data: 'Crear noticia',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('creao');
        this.notifierService.showNotification(
          'Noticia creada correctamente',
          'Aceptar'
        );
        this.getNews();
      }
    });
  }

  deleteNews() {}
}
