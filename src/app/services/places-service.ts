import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { FirebaseService } from './firebase-service';
import { Observable, map } from 'rxjs';

@Injectable()
export class PlacesService {
  constructor(private firebaseService: FirebaseService) {}

  listPlaces: Place[] = [];
  /*listPlaces: Place[] = [
    new Place('Pirri', 'Toodo mu rico', 'Imagen', '03/06/2023 19:50'),
    new Place(
      'Taurina',
      'La limpieza deja que desear',
      'Imagen',
      '03/06/2023 19:50'
    ),
  ];*/

  getPlaces() {
    this.getPlacesConverter().subscribe((places: Place[]) => {
      this.listPlaces = places;
    });

    return this.listPlaces;
  }

  getPlacesConverter(): Observable<Place[]> {
    return this.firebaseService
      .getPlaces()
      .pipe(map((data: any) => Object.values(data) as Place[]));
  }

  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces);
  }
}
