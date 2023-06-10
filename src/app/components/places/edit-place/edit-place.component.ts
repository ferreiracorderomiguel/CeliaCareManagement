import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Place } from 'src/app/models/place';
import { NotifierService } from 'src/app/services/notifier-service';
import { PlacesService } from 'src/app/services/places-service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
})
export class EditPlaceComponent implements OnInit {
  modalTitle: string = '';
  placeId: number = 0;
  opc: number = 1;
  name: string = '';
  description: string = '';
  streetAddress: string = '';
  city: string = '';
  image: string = '';
  phoneNumber: string = '';
  coordinates: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditPlaceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { modalTitle: string; placeId: number; opc: number },
    private placesService: PlacesService,
    private notifierService: NotifierService
  ) {
    this.modalTitle = data.modalTitle;
    this.placeId = data.placeId;
    this.opc = data.opc;
  }

  ngOnInit(): void {
    this.loadPlacesData();
  }

  loadPlacesData() {
    const place: Place = this.getPlaceById(this.placeId);
    this.name = place.name;
    this.description = place.description;
    this.streetAddress = place.streetAddress;
    this.city = place.city;
    this.phoneNumber = place.phoneNumber;
    this.image = place.image;
    this.coordinates = place.coordinates;
  }

  getPlaceById(placeId: number) {
    return this.placesService.getPlaceById(placeId);
  }

  editPlace() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();

      const newPlace = new Place(
        this.name,
        this.description,
        this.streetAddress,
        this.city,
        this.image,
        this.phoneNumber,
        this.dateTimeString,
        this.coordinates
      );

      this.placesService.updatePlace(this.placeId, newPlace);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.name.trim() === '' ||
      this.description.trim() === '' ||
      this.image.trim() === '' ||
      this.streetAddress.trim() === '' ||
      this.city.trim() === '' ||
      this.phoneNumber.trim() === '' ||
      this.coordinates.trim() === ''
    ) {
      this.notifierService.showNotification(
        'No puede haber campos vacíos',
        'OK'
      );
      return false;
    } else {
      if (this.name.includes('.')) {
        this.notifierService.showNotification(
          'El nombre no puede contener puntos (.)',
          'OK'
        );
        return false;
      } else {
        return true;
      }
    }
  }

  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
