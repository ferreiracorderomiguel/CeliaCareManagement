import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { FirebaseService } from './firebase-service';
import { Observable, map } from 'rxjs';

@Injectable()
export class PlacesService {
  constructor(private firebaseService: FirebaseService) {}

  listPlaces: Place[] = [];

  getPlaces() {
    return this.firebaseService.getPlaces();
  }

  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces);
  }

  setPlaces(places: Place[]) {
    this.listPlaces = places;
  }
}
