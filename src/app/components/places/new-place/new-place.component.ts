import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Place } from 'src/app/models/place';
import { NotifierService } from 'src/app/services/notifier-service';
import { PlacesService } from 'src/app/services/places-service';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css'],
})
export class NewPlaceComponent {
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
    public dialogRef: MatDialogRef<NewPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private placesService: PlacesService,
    private notifierService: NotifierService
  ) {}

  createPlace() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();
      this.getImageName();

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
      this.placesService.addPlace(newPlace);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.name.trim() === '' ||
      this.description.trim() === '' ||
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

  getImageName() {
    let imageName = this.name.trim();

    imageName = imageName.replace(/\s+/g, '_');
    imageName = imageName.toLowerCase();
    imageName = imageName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    imageName = imageName.replace(/¿|\?/g, '');
    imageName = imageName.replace(/,/g, '');

    imageName += '.png';

    this.image = imageName;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
