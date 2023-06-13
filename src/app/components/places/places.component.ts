import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Place } from 'src/app/models/place';
import { PlacesService } from 'src/app/services/places-service';
import { NewPlaceComponent } from './new-place/new-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})

/**
 * Represents the PlacesComponent component.
 */
export class PlacesComponent implements OnInit {
  listPlaces: Place[] = [];

  /**
   * Creates an instance of the PlacesComponent.
   * @param {MatDialog} dialog - Reference to the MatDialog service used for opening dialogs.
   * @param {PlacesService} placesService - The places service used for CRUD operations.
   */
  constructor(public dialog: MatDialog, private placesService: PlacesService) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * It retrieves the places from the places service.
   */
  ngOnInit(): void {
    this.getPlaces();
  }

  /**
   * Retrieves the places from the places service and updates the list of places.
   */
  getPlaces() {
    this.placesService.getPlaces().subscribe((places) => {
      this.listPlaces = Object.values(places);
      this.placesService.setPlaces(this.listPlaces);
    });
  }

  /**
   * Opens the dialog for creating a new place entry.
   * After the dialog is closed, it refreshes the list of places if a new entry was created.
   */
  openDialogNewPlace() {
    const dialogRef = this.dialog.open(NewPlaceComponent, {
      width: '620px',
      data: 'Crear establecimiento',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  /**
   * Opens the dialog for editing or viewing a place entry.
   * @param {number} placeId - The ID of the place entry.
   * @param {number} opc - The operation code indicating whether it's an edit or view operation.
   */
  openDialogEditPlace(placeId: number, opc: number) {
    let title = 'Editar establecimiento';
    if (opc == 1) {
      title = 'Editar establecimiento';
    } else if (opc == 2) {
      title = 'Ver establecimiento';
    }

    const dialogRef = this.dialog.open(EditPlaceComponent, {
      width: '620px',
      data: {
        modalTitle: title,
        placeId: placeId,
        opc: opc,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  /**
   * Deletes a place entry.
   * @param {number} placeId - The ID of the place entry to be deleted.
   */
  deletePlace(placeId: number) {
    this.placesService.deletePlace(placeId);
  }
}
