import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { FirebaseService } from './firebase-service';
import { NotifierService } from './notifier-service';

/**
 * Service for managing places.
 * It provides methods for retrieving, adding, updating, and deleting places.
 */
@Injectable()
export class PlacesService {
  listPlaces: Place[] = [];

  /**
   * Constructs a new instance of the PlacesService.
   *
   * @param firebaseService The FirebaseService used to interact with Firebase.
   * @param notifierService The NotifierService used to show notifications.
   */
  constructor(
    private firebaseService: FirebaseService,
    private notifierService: NotifierService
  ) {}

  /**
   * Retrieves the list of places from Firebase.
   *
   * @returns A Promise that resolves to the list of places.
   */
  getPlaces() {
    return this.firebaseService.getPlaces();
  }

  /**
   * Retrieves a place by its ID.
   *
   * @param id The ID of the place.
   * @returns The place with the specified ID.
   */
  getPlaceById(id: number) {
    return this.listPlaces[id];
  }

  /**
   * Adds a new place.
   *
   * @param place The place to add.
   */
  addPlace(place: Place) {
    this.listPlaces.push(place);
    this.firebaseService.uploadPlaces(this.listPlaces, 1);
  }

  /**
   * Sets the list of places.
   *
   * @param places The new list of places.
   */
  setPlaces(places: Place[]) {
    this.listPlaces = places;
  }

  /**
   * Updates a place.
   *
   * @param id The ID of the place to update.
   * @param place The updated place data.
   */
  updatePlace(id: number, place: Place) {
    let modifiedPlace = this.listPlaces[id];

    modifiedPlace.name = place.name;
    modifiedPlace.description = place.description;
    modifiedPlace.streetAddress = place.streetAddress;
    modifiedPlace.city = place.city;
    modifiedPlace.image = place.image;
    modifiedPlace.phoneNumber = place.phoneNumber;
    modifiedPlace.date = place.date;
    modifiedPlace.coordinates = place.coordinates;

    this.firebaseService.updatePlace(id, modifiedPlace);
  }

  /**
   * Deletes a place.
   *
   * @param id The ID of the place to delete.
   */
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
