import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlacesComponent } from './components/places/places.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { EditNewsComponent } from './components/news/edit-news/edit-news.component';
import { NewNewsComponent } from './components/news/new-news/new-news.component';
import { ViewNewsComponent } from './components/news/view-news/view-news.component';
import { NewsService } from './services/news-service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PlacesService } from './services/places-service';
import { FirebaseService } from './services/firebase-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierService } from './services/notifier-service';
import { NewPlaceComponent } from './components/places/new-place/new-place.component';
import { EditPlaceComponent } from './components/places/edit-place/edit-place.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NavbarComponent,
    PlacesComponent,
    HomeComponent,
    EditNewsComponent,
    NewNewsComponent,
    ViewNewsComponent,
    NewPlaceComponent,
    EditPlaceComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [NewsService, PlacesService, FirebaseService, NotifierService],
  bootstrap: [AppComponent],
})
export class AppModule {}
