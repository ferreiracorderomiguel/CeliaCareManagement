import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewNewsComponent } from './new-news/new-news.component';
import { NewsService } from 'src/app/services/news-service';
import { EditNewsComponent } from './edit-news/edit-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  listNews: News[] = [];

  constructor(public dialog: MatDialog, private newsService: NewsService) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.getNews().subscribe((news) => {
      this.listNews = Object.values(news);
      this.newsService.setNews(this.listNews);
    });
  }

  openDialogNewNews() {
    const dialogRef = this.dialog.open(NewNewsComponent, {
      width: '500px',
      data: 'Crear noticia',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getNews();
      }
    });
  }

  openDialogEditNews(newsId: number) {
    const dialogRef = this.dialog.open(EditNewsComponent, {
      width: '500px',
      data: { modalTitle: 'Editar noticia', newsId: newsId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getNews();
      }
    });
  }

  deleteNews() {}
}
