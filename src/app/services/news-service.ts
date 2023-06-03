import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';

@Injectable()
export class NewsService {
  listNews: News[] = [];

  constructor(private httpClient: HttpClient) {
    this.listNews.push(
      new News('Hola', 'Lo que pasa', 'Imagen', '03/06/2023 11:00'),
      new News('Adios', 'Lo que pasa', 'Imagen', '04/06/2023 12:00'),
      new News('AAAA', 'Lo que pasa', 'Imagen', '05/06/2023 13:00')
    );
  }

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
    if (this.listNews === null) {
      this.listNews = [];
    }
    this.listNews.push(news);
    this.uploadNews(this.listNews);
  }

  uploadNews(newsArray: News[]) {
    this.httpClient
      .post(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json',
        newsArray
      )
      .subscribe(
        (response) => console.log('Se ha subido la noticia: ' + response),
        (error) => console.log('Error al subir la noticia: ' + error)
      );
  }
}
