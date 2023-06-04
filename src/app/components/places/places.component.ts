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
export class PlacesComponent implements OnInit {
  listPlaces: Place[] = [];

  constructor(public dialog: MatDialog, private placesService: PlacesService) {}

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    this.placesService.getPlaces().subscribe((places) => {
      this.listPlaces = Object.values(places);
      this.placesService.setPlaces(this.listPlaces);
    });
  }

  openDialogNewPlace() {
    const dialogRef = this.dialog.open(NewPlaceComponent, {
      width: '500px',
      data: 'Crear establecimiento',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  openDialogEditPlace(placeId: number) {
    const dialogRef = this.dialog.open(EditPlaceComponent, {
      width: '500px',
      data: { modalTitle: 'Editar establecimiento', placeId: placeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  deletePlace(placeId: number) {}
}
