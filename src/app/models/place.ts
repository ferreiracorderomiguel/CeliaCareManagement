export class Place {
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  image: string;
  phoneNumber: string;
  date: string;
  coordinates: string;

  constructor(
    name: string,
    description: string,
    streetAddress: string,
    city: string,
    image: string,
    phoneNumber: string,
    date: string,
    coordinates: string
  ) {
    this.name = name;
    this.description = description;
    this.streetAddress = streetAddress;
    this.city = city;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.date = date;
    this.coordinates = coordinates;
  }
}
