import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { FirebaseService } from './firebase-service';

@Injectable()
export class NewsService {
  constructor(
    private httpClient: HttpClient,
    private firebaseService: FirebaseService
  ) {}

  listNews: News[] = [
    new News('Hola', 'Lo que pasa', 'Imagen', '03/06/2023 11:00'),
    new News('Adios', 'Lo que pasa', 'Imagen', '04/06/2023 12:00'),
    new News('AAAA', 'Lo que pasa', 'Imagen', '05/06/2023 13:00'),
  ];

  getNews() {
    this.httpClient
      .get<News[]>(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json'
      )
      .subscribe(
        (response) => {
          this.listNews = response;
        },
        (error) => {
          console.log('Error al recuperar noticias');
        }
      );
    return this.listNews;
  }

  addNews(news: News) {
    this.listNews.push(news);
    this.firebaseService.uploadNews(this.listNews);
  }
}
