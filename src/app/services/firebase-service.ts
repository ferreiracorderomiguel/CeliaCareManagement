import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { NotifierService } from './notifier-service';
import { Place } from '../models/place';
import { LoginService } from './login-service';

/**
 * Represents the FirebaseService class.
 * This service handles CRUD operations for news and places using Firebase as the backend.
 */
@Injectable()
export class FirebaseService {
  /**
   * Creates an instance of the FirebaseService.
   * @param {HttpClient} httpClient - The HttpClient used for making HTTP requests.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   * @param {LoginService} loginService - The login service used for obtaining authentication tokens.
   */
  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService,
    private loginService: LoginService
  ) {}

  /**
   * Creates an instance of the FirebaseService.
   * @param {HttpClient} httpClient - The HttpClient used for making HTTP requests.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   * @param {LoginService} loginService - The login service used for obtaining authentication tokens.
   */
  getNews() {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json?auth=' +
        token
    );
  }

  /**
   * Uploads news data to Firebase.
   * @param {News[]} newsArray - An array of news objects to be uploaded.
   * @param {number} option - The option value indicating the type of operation (1: Upload, 2: Update).
   */
  uploadNews(newsArray: News[], option: number) {
    const token = this.loginService.getIdToken();
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json?auth=' +
          token,
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

  /**
   * Updates a news entry in Firebase.
   * @param {number} id - The ID of the news entry to be updated.
   * @param {News} news - The updated news object.
   */
  updateNews(id: number, news: News) {
    const token = this.loginService.getIdToken();
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news/' +
      id +
      '.json?auth=' +
      token;

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

  /**
   * Deletes a news entry from Firebase.
   * @param {number} id - The ID of the news entry to be deleted.
   */
  deleteNews(id: number) {
    const token = this.loginService.getIdToken();
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news/' +
      id +
      '.json?auth=' +
      token;

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

  /**
   * Retrieves place data from Firebase.
   * @returns {Observable<any>} - An Observable that emits the place data from Firebase.
   */
  getPlaces() {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places.json?auth=' +
        token
    );
  }

  /**
   * Uploads place data to Firebase.
   * @param {any[]} placesArray - An array of place objects to be uploaded.
   * @param {number} option - The option value indicating the type of operation (1: Upload, 2: Update).
   */
  uploadPlaces(placesArray: any[], option: number) {
    const token = this.loginService.getIdToken();
    this.httpClient
      .put(
        'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places.json?auth=' +
          token,
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

  /**
   * Updates a place entry in Firebase.
   * @param {number} id - The ID of the place entry to be updated.
   * @param {Place} place - The updated place object.
   */
  updatePlace(id: number, place: Place) {
    const token = this.loginService.getIdToken();
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places/' +
      id +
      '.json?auth=' +
      token;

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

  /**
   * Deletes a place entry from Firebase.
   * @param {number} id - The ID of the place entry to be deleted.
   */
  deletePlace(id: number) {
    const token = this.loginService.getIdToken();
    let url =
      'https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/places/' +
      id +
      '.json?auth=' +
      token;

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
