import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { NotifierService } from './notifier-service';
import { Place } from '../models/place';
import { LoginService } from './login-service';

@Injectable()
export class FirebaseService {
  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService,
    private loginService: LoginService
  ) {}

  getNews() {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json?auth=' +
        token
    );
  }

  uploadNews(newsArray: News[], option: number) {
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json',
        newsArray
      )
      .subscribe(
        (response) => {
          if (option == 1) {
            this.notifierService.showNotification(
              'Se ha subido la noticia a Firebase',
              'Aceptar'
            );
          }
        },
        (error) => {
          if (option == 1) {
            this.notifierService.showNotification(
              'Error al subir la noticia a Firebase. Compruebe que está logueado.',
              'Aceptar'
            );
          }
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
          'Error al actualizar la noticia en Firebase. Compruebe que está logueado.',
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
          'Se ha eliminado la noticia de Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al eliminar la noticia de Firebase. Compruebe que está logueado.',
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

  uploadPlaces(placesArray: any[], option: number) {
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places.json',
        placesArray
      )
      .subscribe(
        (response) => {
          if (option == 1) {
            this.notifierService.showNotification(
              'Se ha subido el establecimiento a Firebase',
              'Aceptar'
            );
          }
        },
        (error) => {
          if (option == 1) {
            this.notifierService.showNotification(
              'Error al subir el establecimiento a Firebase. Compruebe que está logueado.',
              'Aceptar'
            );
          }
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
          'Error al actualizar el establecimiento en Firebase. Compruebe que está logueado.',
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
          'Se ha eliminado el establecimiento de Firebase',
          'Aceptar'
        );
      },
      (error) => {
        this.notifierService.showNotification(
          'Error al eliminar el establecimiento de Firebase. Compruebe que está logueado.',
          'Aceptar'
        );
      }
    );
  }
}
