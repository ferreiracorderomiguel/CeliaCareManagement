import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';

@Injectable()
export class FirebaseService {
  constructor(private httpClient: HttpClient) {}

  uploadNews(newsArray: News[]) {
    this.httpClient
      .post(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json',
        newsArray
      )
      .subscribe(
        (response) => console.log('Se ha subido la noticia a Firebase'),
        (error) => console.log('Error al subir la noticia a Firebase: ' + error)
      );
  }
}
