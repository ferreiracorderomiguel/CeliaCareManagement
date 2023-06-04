import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { FirebaseService } from './firebase-service';
import { NotifierService } from './notifier-service';

@Injectable()
export class NewsService {
  constructor(
    private firebaseService: FirebaseService,
    private notifierService: NotifierService
  ) {}

  listNews: News[] = [];

  getNews() {
    return this.firebaseService.getNews();
  }

  getNewsById(id: number) {
    return this.listNews[id];
  }

  addNews(news: News) {
    this.listNews.push(news);
    this.firebaseService.uploadNews(this.listNews);
  }

  setNews(news: News[]) {
    this.listNews = news;
  }

  updateNews(id: number, news: News) {
    let modifiedNews = this.listNews[id];

    modifiedNews.title = news.title;
    modifiedNews.description = news.description;
    modifiedNews.image = news.image;
    modifiedNews.date = news.date;

    this.firebaseService.updateNews(id, modifiedNews);
  }

  deleteNews(id: number) {
    this.notifierService
      .showConfirmation('¿Desea eliminar la noticia?', 'Aceptar')
      .subscribe((result) => {
        if (result.dismissedByAction) {
          this.listNews.splice(id, 1);
          this.firebaseService.deleteNews(id);
          //this.firebaseService.uploadNews(this.listNews);
        }
      });
  }
}
