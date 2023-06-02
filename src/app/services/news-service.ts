import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { News } from "../models/news";

@Injectable()
export class NewsService{

    constructor(private httpClient:HttpClient){
    }

    news: News[]=[]

    addNews(newNews:News){
        this.news.push(newNews);
        this.uploadNews(this.news);
    }

    uploadNews(newsArray: News[]){
        this.httpClient.post('https://celiacare-mfercor326v-default-rtdb.europe-west1.firebasedatabase.app/news.json', newsArray);
    }
}