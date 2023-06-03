import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { Place } from 'src/app/models/place';
import { PlacesService } from 'src/app/services/places-service';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css'],
})
export class NewPlaceComponent {
  name: string = '';
  description: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  constructor(
    public dialogRef: MatDialogRef<NewPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private placesService: PlacesService
  ) {}

  createPlace() {
    this.getActualDate();

    const newPlace = new Place(
      this.name,
      this.description,
      this.image,
      this.dateTimeString
    );
    this.placesService.addPlace(newPlace);

    this.dialogRef.close(true);
  }

  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
