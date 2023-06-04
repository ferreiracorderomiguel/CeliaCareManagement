import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { NotifierService } from './notifier-service';
import { Place } from '../models/place';

@Injectable()
export class FirebaseService {
  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService
  ) {}

  getNews() {
    return this.httpClient.get(
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json'
    );
  }

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

  updateNews(id: number, news: News) {
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news/' +
      id +
      '.json';

    this.httpClient.put(url, news).subscribe(
      (response) => {
        this.notifierService.showNotification(
          'Se ha actualizado la noticia en Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al actualizar la noticia en Firebase: ' + error,
          'Aceptar'
        );
      }
    );
  }

  deleteNews(id: number) {
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news/' +
      id +
      '.json';

    this.httpClient.delete(url).subscribe(
      (response) => {
        this.notifierService.showNotification(
          'Se ha eliminado la noticia en Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al eliminar la noticia en Firebase: ' + error,
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

  updatePlace(id: number, place: Place) {
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places/' +
      id +
      '.json';

    this.httpClient.put(url, place).subscribe(
      (response) => {
        this.notifierService.showNotification(
          'Se ha actualizado el establecimiento en Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al actualizar el establecimiento en Firebase: ' + error,
          'Aceptar'
        );
      }
    );
  }

  deletePlace(id: number) {
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places/' +
      id +
      '.json';

    this.httpClient.delete(url).subscribe(
      (response) => {
        this.notifierService.showNotification(
          'Se ha eliminado el establecimiento en Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al eliminar el establecimiento en Firebase: ' + error,
          'Aceptar'
        );
      }
    );
  }
}
