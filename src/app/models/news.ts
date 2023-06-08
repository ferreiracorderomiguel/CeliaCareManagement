export class News {
  title: string;
  description: string;
  image: string;
  date: string;
  source: string;

  constructor(
    title: string,
    description: string,
    image: string,
    date: string,
    source: string
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = date;
    this.source = source;
  }
}
