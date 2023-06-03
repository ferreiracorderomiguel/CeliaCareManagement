import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { FirebaseService } from './firebase-service';

@Injectable()
export class PlacesService {
  constructor(private firebaseService: FirebaseService) {}

  listPlaces: Place[] = [
    new Place('Pirri', 'Toodo mu rico', 'Imagen', '03/06/2023 19:50'),
    new Place(
      'Taurina',
      'La limpieza deja que desear',
      'Imagen',
      '03/06/2023 19:50'
    ),
  ];

  getPlaces() {
    /*this.firebaseService
      .getPlaces()
      .subscribe((response) => (this.listPlaces = response));*/
    return this.listPlaces;
  }

  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces);
  }
}
