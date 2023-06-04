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
}
