import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service';
import { NotifierService } from 'src/app/services/notifier-service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.component.html',
  styleUrls: ['./new-news.component.css'],
})

/**
 * Represents the NewNewsComponent component.
 */
export class NewNewsComponent {
  title: string = '';
  description: string = '';
  image: string = '';
  source: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';

  /**
   * Creates an instance of the NewNewsComponent.
   * @param {MatDialogRef<NewNewsComponent>} dialogRef - Reference to the dialog opened.
   * @param {MAT_DIALOG_DATA} modalTitle - The title of the dialog.
   * @param {NewsService} newsService - The news service used for CRUD operations.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   */
  constructor(
    public dialogRef: MatDialogRef<NewNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalTitle: String,
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {}

  /**
   * Event handler for when a file is selected.
   * @param {any} event - The event object containing the selected file.
   */
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      /*const path = 'news/${this.title}';
      const uploadtask = await this.fireStorage.upload(path, file);
      const url = await uploadtask.ref.getDownloadURL();
      console.log(url);*/
      console.log(file);
    }
  }

  /**
   * Creates a new news entry.
   * If there are no blank spaces in the required fields, creates the news entry and closes the dialog.
   */
  createNews() {
    if (this.checkBlankSpaces()) {
      this.getActualDate();
      this.getImageName();

      const newNews = new News(
        this.title,
        this.description,
        this.image,
        this.dateTimeString,
        this.source
      );

      this.newsService.addNews(newNews);

      this.dialogRef.close(true);
    }
  }

  /**
   * Checks if there are any blank spaces in the required fields.
   * If there are blank spaces, displays a notification.
   * @returns {boolean} True if there are no blank spaces, false otherwise.
   */
  checkBlankSpaces() {
    if (
      this.title.trim() === '' ||
      this.description.trim() === '' ||
      this.source.trim() === ''
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

  /**
   * Retrieves the current date and time and formats it.
   */
  getActualDate() {
    const formattedDateTime = format(this.currentDate, 'dd/MM/yyyy HH:mm');
    this.dateTimeString = formattedDateTime;
  }

  /**
   * Generates the image name based on the news title.
   * The name is formatted to remove any special characters and spaces.
   */
  getImageName() {
    let imageName = this.title.trim();

    imageName = imageName.replace(/\s+/g, '_');
    imageName = imageName.toLowerCase();
    imageName = imageName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    imageName = imageName.replace(/¿|\?/g, '');
    imageName = imageName.replace(/,/g, '');

    imageName += '.png';

    this.image = imageName;
  }

  /**
   * Closes the dialog without saving any changes.
   */
  closeDialog() {
    this.dialogRef.close(false);
  }
}
