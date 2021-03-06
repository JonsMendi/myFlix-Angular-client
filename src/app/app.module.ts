// Important: This file is the entry point of the Angular App.
// Meaning that, it's mostly used to wire up different modules together and express dependencies.

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Under, Material Modules dependencies.
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
// Under, Forms Module.
import { FormsModule } from '@angular/forms';
// Under, Router.
import { RouterModule, Routes } from '@angular/router';
// Under, different App Components.
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SynopsisCardComponent } from './synopsis-card/synopsis-card.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { DirectorCardComponent } from './director-card/director-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileEditCardComponent } from './profile-edit-card/profile-edit-card.component';

// Under, appRoutes is the constant that contains the Routes definitions.
// In case of need to add more Routes, added here like so example: '{ path: 'profile', component: ProfileCardComponent },'.
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileCardComponent },
  //Under, is called in case that the app doesn't find any other route.
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    SynopsisCardComponent,
    GenreCardComponent,
    DirectorCardComponent,
    ProfileCardComponent,
    NavbarComponent,
    ProfileEditCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    //Under, understand how 'appRoutes' (defined above containing the routes) is implemented.
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
