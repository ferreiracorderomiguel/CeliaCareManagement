import { Component } from '@angular/core';
import { News } from 'src/app/models/news';

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

  deleteNews(){
    
  }

}
