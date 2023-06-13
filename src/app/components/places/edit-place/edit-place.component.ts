import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Place } from 'src/app/models/place';
import { NotifierService } from 'src/app/services/notifier-service';
import { PlacesService } from 'src/app/services/places-service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
})

/**
 * Represents the EditPlaceComponent class.
 */
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

  /**
   * Creates an instance of the EditPlaceComponent.
   * @param {MatDialogRef<EditPlaceComponent>} dialogRef - Reference to the MatDialogRef of the dialog.
   * @param {Object} data - The data object containing the modalTitle, placeId, and opc values.
   * @param {string} data.modalTitle - The title of the dialog.
   * @param {number} data.placeId - The ID of the place to be edited.
   * @param {number} data.opc - The option value indicating the type of operation (1: Edit, 2: View).
   * @param {PlacesService} placesService - The places service used for CRUD operations.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   */
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

  /**
   * Initializes the component and loads the data of the place to be edited.
   */
  ngOnInit(): void {
    this.loadPlacesData();
  }

  /**
   * Loads the data of the place to be edited based on the provided placeId.
   */
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

  /**
   * Retrieves the place object based on the provided placeId.
   * @param {number} placeId - The ID of the place to retrieve.
   * @returns {Place} - The place object matching the placeId.
   */
  getPlaceById(placeId: number) {
    return this.placesService.getPlaceById(placeId);
  }

  /**
   * Updates the place entry with the modified information.
   * If all required fields are filled, it updates the place using the provided information.
   * It also performs some validation checks on the fields before updating the place.
   * Finally, it closes the dialog and refreshes the list of places if an update was successful.
   */
  editPlace() {
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

      this.placesService.updatePlace(this.placeId, newPlace);

      this.dialogRef.close(true);
    }
  }

  /**
   * Checks for blank spaces in the required fields.
   * It also checks if the name field contains a period (.) character.
   * Displays a notification if any required field is empty or if the name contains a period character.
   * @returns {boolean} - Returns true if all required fields are filled and the name doesn't contain a period character; otherwise, false.
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
   * Gets the current date and time in the specified format.
   */
  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  /**
   * Generates the image name based on the trimmed name value.
   * Replaces spaces with underscores, converts the name to lowercase, and removes special characters.
   * Appends '.png' as the file extension.
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
   * Closes the dialog without performing any changes.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }
}
