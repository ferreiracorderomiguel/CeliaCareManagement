import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service';
import { NotifierService } from 'src/app/services/notifier-service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})

/**
 * Represents the EditNewsComponent component.
 */
export class EditNewsComponent implements OnInit {
  modalTitle: string = '';
  newsId: number = 0;
  opc: number = 1;
  title: string = '';
  description: string = '';
  source: string = '';
  image: string = '';
  currentDate: Date = new Date();
  dateTimeString: string = '';
  selectedFile: any;

  /**
   * Creates an instance of the EditNewsComponent.
   * @param {MatDialogRef<EditNewsComponent>} dialogRef - Reference to the dialog opened.
   * @param {MAT_DIALOG_DATA} data - Data passed to the dialog.
   * @param {NewsService} newsService - The news service used for CRUD operations.
   * @param {NotifierService} notifierService - The notifier service used for displaying notifications.
   */
  constructor(
    public dialogRef: MatDialogRef<EditNewsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { modalTitle: string; newsId: number; opc: number },
    private newsService: NewsService,
    private notifierService: NotifierService
  ) {
    this.modalTitle = data.modalTitle;
    this.newsId = data.newsId;
    this.opc = data.opc;
  }

  /**
   * Lifecycle hook that is called after the component is initialized.
   */
  ngOnInit(): void {
    this.loadNewsData();
  }

  /**
   * Event handler for when a file is selected.
   * @param {any} event - The event object containing the selected file.
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null) {
      console.log(this.selectedFile);
    }
  }

  /**
   * Loads the data of the news to be edited.
   */
  loadNewsData() {
    const news: News = this.getNewsById(this.newsId);
    this.title = news.title;
    this.description = news.description;
    this.source = news.source;
    this.image = news.image;
  }

  /**
   * Retrieves the news by its ID.
   * @param {number} newsId - The ID of the news.
   * @returns {News} The news object.
   */
  getNewsById(newsId: number) {
    return this.newsService.getNewsById(newsId);
  }

  /**
   * Updates the news with the edited information.
   * If there are no blank spaces in the required fields, updates the news and closes the dialog.
   */
  editNews() {
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

      this.newsService.updateNews(this.newsId, newNews);

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
