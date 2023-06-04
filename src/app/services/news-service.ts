import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { FirebaseService } from './firebase-service';

@Injectable()
export class NewsService {
  constructor(private firebaseService: FirebaseService) {}

  listNews: News[] = [];

  getNews() {
    return this.firebaseService.getNews();
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
}
