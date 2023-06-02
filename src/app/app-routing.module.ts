import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { PlacesComponent } from './components/places/places.component';
import { HomeComponent } from './components/home/home.component';
import { NewNewsComponent } from './components/news/new-news/new-news.component';
import { EditNewsComponent } from './components/news/edit-news/edit-news.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'edit-news', component: EditNewsComponent },
  { path: 'new-news', component: NewNewsComponent },
  { path: 'view-news', component: NewNewsComponent },
  { path: 'places', component: PlacesComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
  
}