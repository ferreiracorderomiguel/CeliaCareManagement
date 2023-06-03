import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { FirebaseService } from './firebase-service';
import { Observable, map } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private firebaseService: FirebaseService) {}

  listNews: News[] = [];

  getNews() {
    this.getNewsConverter().subscribe((news: News[]) => {
      this.listNews = news;
    });

    return this.listNews;
  }

  getNewsConverter(): Observable<News[]> {
    return this.firebaseService
      .getNews()
      .pipe(map((data: any) => Object.values(data) as News[]));
  }

  addNews(news: News) {
    this.listNews.push(news);
    this.firebaseService.uploadNews(this.listNews);
  }
}
