import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { News } from 'src/app/models/news';
import { NewNewsComponent } from './new-news/new-news.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  listNews: News[] = [
    {
      id: 1,
      title: "Turquía",
      description: "Yonki ya te toca",
      image: "Imagen que no vea",
      date: "02/06/2023"
    }
  ];

  constructor(public dialog: MatDialog,
    ) { }

  openDialogNewNews(){
    const dialogRef = this.dialog.open(NewNewsComponent, {
      width: '500px',
      data: "Crear noticia"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log("creao");
      }
    });
  }

  deleteNews(){
    
  }

}
