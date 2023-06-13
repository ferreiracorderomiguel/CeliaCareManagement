import { Injectable } from '@angular/core';
import { News } from '../models/news';
import { FirebaseService } from './firebase-service';
import { NotifierService } from './notifier-service';

@Injectable()
export class NewsService {
  constructor(
    private firebaseService: FirebaseService,
    private notifierService: NotifierService
  ) {}

  listNews: News[] = [];

  /**
   * Retrieves the news from the Firebase service.
   * @returns {Observable<any>} - The news data.
   */
  getNews() {
    return this.firebaseService.getNews();
  }

  /**
   * Retrieves the news from the Firebase service.
   * @returns {Observable<any>} - The news data.
   */
  getNewsById(id: number) {
    return this.listNews[id];
  }

  /**
   * Adds a new news item to the list and uploads it to Firebase.
   * @param {News} news - The news item to add.
   */
  addNews(news: News) {
    this.listNews.push(news);
    this.firebaseService.uploadNews(this.listNews, 1);
  }

  /**
   * Sets the news list with the provided news data.
   * @param {News[]} news - The news data to set.
   */
  setNews(news: News[]) {
    this.listNews = news;
  }

  /**
   * Updates an existing news item in the list and Firebase.
   * @param {number} id - The ID of the news item to update.
   * @param {News} news - The updated news object.
   */
  updateNews(id: number, news: News) {
    let modifiedNews = this.listNews[id];

    modifiedNews.title = news.title;
    modifiedNews.description = news.description;
    modifiedNews.image = news.image;
    modifiedNews.date = news.date;
    modifiedNews.source = news.source;

    this.firebaseService.updateNews(id, modifiedNews);
  }

  /**
   * Deletes a news item from the list and Firebase.
   * @param {number} id - The ID of the news item to delete.
   */
  deleteNews(id: number) {
    this.notifierService
      .showConfirmation('¿Desea eliminar la noticia?', 'Aceptar')
      .subscribe((result) => {
        if (result.dismissedByAction) {
          this.listNews.splice(id, 1);
          this.firebaseService.deleteNews(id);
          this.firebaseService.uploadNews(this.listNews, 2);
        }
      });
  }
}
