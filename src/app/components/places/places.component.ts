import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Place } from 'src/app/models/place';
import { NotifierService } from 'src/app/services/notifier-service';
import { PlacesService } from 'src/app/services/places-service';
import { NewPlaceComponent } from './new-place/new-place.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  listPlaces: Place[] = [];

  constructor(
    public dialog: MatDialog,
    private placesService: PlacesService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    this.listPlaces = this.placesService.getPlaces();
  }

  openDialogNewPlace() {
    const dialogRef = this.dialog.open(NewPlaceComponent, {
      width: '500px',
      data: 'Crear establecimiento',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('creao');
        this.notifierService.showNotification(
          'Establecimiento creado correctamente',
          'Aceptar'
        );
        this.getPlaces();
      }
    });
  }

  deletePlace() {}
}
