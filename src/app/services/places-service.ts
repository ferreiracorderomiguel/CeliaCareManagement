import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { FirebaseService } from './firebase-service';
import { NotifierService } from './notifier-service';

@Injectable()
export class PlacesService {
  constructor(
    private firebaseService: FirebaseService,
    private notifierService: NotifierService
  ) {}

  listPlaces: Place[] = [];

  getPlaces() {
    return this.firebaseService.getPlaces();
  }

  getPlaceById(id: number) {
    return this.listPlaces[id];
  }

  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces, 1);
  }

  setPlaces(places: Place[]) {
    this.listPlaces = places;
  }

  updatePlace(id: number, place: Place) {
    let modifiedPlace = this.listPlaces[id];

    modifiedPlace.name = place.name;
    modifiedPlace.description = place.description;
    modifiedPlace.streetAddress = place.streetAddress;
    modifiedPlace.city = place.city;
    modifiedPlace.image = place.image;
    modifiedPlace.phoneNumber = place.phoneNumber;
    modifiedPlace.date = place.date;

    this.firebaseService.updatePlace(id, modifiedPlace);
  }

  deletePlace(id: number) {
    this.notifierService
      .showConfirmation('¿Desea eliminar el establecimiento?', 'Aceptar')
      .subscribe((result) => {
        if (result.dismissedByAction) {
          this.listPlaces.splice(id, 1);
          this.firebaseService.deletePlace(id);
          this.firebaseService.uploadPlaces(this.listPlaces, 2);
        }
      });
  }
}
