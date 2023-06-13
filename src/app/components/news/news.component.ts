import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewNewsComponent } from './new-news/new-news.component';
import { NewsService } from 'src/app/services/news-service';
import { EditNewsComponent } from './edit-news/edit-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})

/**
 * Represents the NewsComponent component.
 */
export class NewsComponent implements OnInit {
  listNews: News[] = [];

  /**
   * Creates an instance of the NewsComponent.
   * @param {MatDialog} dialog - Reference to the MatDialog service used for opening dialogs.
   * @param {NewsService} newsService - The news service used for CRUD operations.
   */
  constructor(public dialog: MatDialog, private newsService: NewsService) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * It retrieves the news from the news service.
   */
  ngOnInit() {
    this.getNews();
  }

  /**
   * Retrieves the news from the news service and updates the list of news.
   */
  getNews() {
    this.newsService.getNews().subscribe((news) => {
      this.listNews = Object.values(news);
      this.newsService.setNews(this.listNews);
    });
  }

  /**
   * Opens the dialog for creating a new news entry.
   * After the dialog is closed, it refreshes the list of news if a new entry was created.
   */
  openDialogNewNews() {
    const dialogRef = this.dialog.open(NewNewsComponent, {
      width: '500px',
      data: 'Crear noticia',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getNews();
      }
    });
  }

  /**
   * Opens the dialog for editing or viewing a news entry.
   * @param {number} newsId - The ID of the news entry.
   * @param {number} opc - The operation code indicating whether it's an edit or view operation.
   */
  openDialogEditNews(newsId: number, opc: number) {
    let title = 'Editar noticia';
    if (opc == 1) {
      title = 'Editar noticia';
    } else if (opc == 2) {
      title = 'Ver noticia';
    }

    const dialogRef = this.dialog.open(EditNewsComponent, {
      width: '600px',
      data: { modalTitle: title, newsId: newsId, opc: opc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getNews();
      }
    });
  }

  /**
   * Deletes a news entry.
   * @param {number} newsId - The ID of the news entry to be deleted.
   */
  deleteNews(newsId: number) {
    this.newsService.deleteNews(newsId);
  }
}
