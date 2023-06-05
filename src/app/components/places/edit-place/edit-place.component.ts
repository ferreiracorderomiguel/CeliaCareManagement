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
  name: string = '';
  description: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditPlaceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { modalTitle: string; placeId: number },
    private placesService: PlacesService,
    private notifierService: NotifierService
  ) {
    this.modalTitle = data.modalTitle;
    this.placeId = data.placeId;
  }

  ngOnInit(): void {
    this.loadPlacesData();
  }

  loadPlacesData() {
    const place: Place = this.getPlaceById(this.placeId);
    this.name = place.name;
    this.description = place.description;
    this.image = place.image;
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
        this.image,
        this.dateTimeString
      );

      this.placesService.updatePlace(this.placeId, newPlace);

      this.dialogRef.close(true);
    }
  }

  checkBlankSpaces() {
    if (
      this.name.trim() === '' ||
      this.description.trim() === '' ||
      this.image.trim() === ''
    ) {
      this.notifierService.showNotification(
        'No puede haber campos vacíos',
        'OK'
      );
      return false;
    } else {
      return true;
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
