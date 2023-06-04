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

  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces);
  }

  setPlaces(places: Place[]) {
    this.listPlaces = places;
  }

  updatePlace(id: number, place: Place) {
    let modifiedPlace = this.listPlaces[id];

    modifiedPlace.name = place.name;
    modifiedPlace.description = place.description;
    modifiedPlace.image = place.image;
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
          //this.firebaseService.uploadPlaces(this.listPlaces);
        }
      });
  }
}
