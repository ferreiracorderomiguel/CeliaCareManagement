import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCv_ustb1hbD6XwYgVmlTaeQt6mFLcofb4',
      authDomain: 'celiacare-mfercor326v.firebaseapp.com',
    });
  }
}
