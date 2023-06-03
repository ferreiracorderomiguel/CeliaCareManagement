export class News {
  title: string;
  description: string;
  image: string;
  date: string;

  constructor(title: string, description: string, image: string, date: string) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = date;
  }
}
