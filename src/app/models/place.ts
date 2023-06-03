export class Place {
  name: string;
  description: string;
  image: string;
  date: string;

  constructor(name: string, description: string, image: string, date: string) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.date = date;
  }
}
