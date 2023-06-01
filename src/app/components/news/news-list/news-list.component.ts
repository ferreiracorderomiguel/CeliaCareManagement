import { Component, Input } from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {

  @Input() news:News = {
    id: 0,
    title: '',
    description: '',
    image: '',
    date: ''
  };
}
