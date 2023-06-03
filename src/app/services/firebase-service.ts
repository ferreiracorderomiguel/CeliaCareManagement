import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { NotifierService } from './notifier-service';

@Injectable()
export class FirebaseService {
  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService
  ) {}

  uploadNews(newsArray: News[]) {
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json',
        newsArray
      )
      .subscribe(
        (response) => {
          this.notifierService.showNotification(
            'Se ha subido la noticia a Firebase',
            'Aceptar'
          );
        },
        (error) => {
          this.notifierService.showNotification(
            'Error al subir la noticia a Firebase: ' + error,
            'Aceptar'
          );
        }
      );
  }

  uploadPlaces(placesArray: any[]) {
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places.json',
        placesArray
      )
      .subscribe(
        (response) => {
          this.notifierService.showNotification(
            'Se ha subido el establecimiento a Firebase',
            'Aceptar'
          );
        },
        (error) => {
          this.notifierService.showNotification(
            'Error al subir el establecimiento a Firebase: ' + error,
            'Aceptar'
          );
        }
      );
  }

  getPlaces() {
    return this.httpClient.get(
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places.json'
    );
  }
}
