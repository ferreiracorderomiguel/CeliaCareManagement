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

/**
 * Represents the NewPlaceComponent component.
 */
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

  /**
   * Creates an instance of the NewPlaceComponent.
   * @param {MatDialogRef<NewPlaceComponent>} dialogRef - Reference to the MatDialogRef of the dialog.
   * @param {String} modalTitle - The title of the dialog.
   * @param {PlacesService} placesService - The places service used for CRUD operations.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   */
  constructor(
    public dialogRef: MatDialogRef<NewPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private placesService: PlacesService,
    private notifierService: NotifierService
  ) {}

  /**
   * Creates a new place entry.
   * If all required fields are filled, it creates a new place using the provided information.
   * It also performs some validation checks on the fields before creating the place.
   * Finally, it closes the dialog and refreshes the list of places if a new entry was created.
   */
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

  /**
   * Checks if the required fields are not empty and performs some additional validations.
   * @returns {boolean} - True if all required fields are filled and pass validations, false otherwise.
   */
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

  /**
   * Retrieves the actual date and formats it as a string.
   */
  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  /**
   * Generates the image name based on the provided place name.
   */
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

  /**
   * Closes the dialog without creating a new place entry.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }
}
