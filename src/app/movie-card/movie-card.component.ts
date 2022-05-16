/**
 * Renders a responsive flex structure of movie cards for each movie in the database.
 * Each card contains a picture, buttons to open Director description, Genre description,
 * Synopsis description and a last button to add the specific movie to a user's favorite list.
 * 
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  userFavorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  /**
   * Under, Function to get Movies and CurrentUser when component is initialized.

   */
  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getMovies();
  }

  /**
   * When the User logs in, getMovies() get all de movies from the server through getAllMovies() with a GET request via 
   * [[FetchApiDataService.getAllMovies]].
   * to connect with the endpoint of API, and displays each one by each card.
   * @function getMovies
   * @returns movies in JSON format

   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      
      return this.movies;
    });
  }

  /**
   * When the user is logged the functions grab de user from local storage and add the details to the state.
   * @function getFavoriteMovies
   * @returns user in JSON format

   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
      console.log(resp.FavoriteMovies)
     this.userFavorites = resp.FavoriteMovies;
     return this.userFavorites;

    });
  }

  /**
   * Adds a movie to a user's list of favorites with a POST request via 
   * [[FetchApiDataService.addFavoriteMovies]].
   * 
   * @function addToUserFavorites
   * @param MovieID {string}
   */
  
  addToUserFavorites(MovieID: string): void {
    
    const username = localStorage.getItem('Username') || '';
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((response: any) => {
      console.log(response)
      console.log(MovieID)
      this.snackBar.open(
        `The Movie has been added to your list!`,
        'OK',
        {
          duration: 2000,
        }
      );
      //Under forced a reload to update the favorite button state.
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
    this.ngOnInit();
  }

  /**
   * Removes a movie from a user's list of favorites with a DELETE request via 
   * [[FetchApiDataService.removeFavoriteMovies]].
   * 
   * @function removeFavorite
   * @param MovieID {string}
   */

  removeFavorite(MovieID: string): void {
    console.log(MovieID);
      this.fetchApiData.removeFavoriteMovies(MovieID).subscribe((response: any) => {
        this.snackBar.open(
          `The Movie has been removed from your list!`,
          'OK',
          {
            duration: 2000,
          }
        );
        //Under forced a reload to update the favorite button state.
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      console.log(response);
    });
    
  }

  /**
   * Created isFavorite function to activate when a movie is added/removed to the favorite list
   * isFavorite is used in the form of condition on the button in [movie.card.component.html].
   * @param MovieID {string}
   * @returns the user favorite list updated
   */

  isFavorite(MovieID: any): boolean {
    return this.userFavorites.includes(MovieID)
  }

  /**
   * Open's a dialog through SynopsisCardComponent with the Synopsis of a certain movie.
   * 
   * @param title {string}
   * @param imageUrl {any}
   * @param description {string}
   */
  
  openSynopsis(title: string, imageUrl: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImageUrl: imageUrl,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * Open's a dialog through GenreCardComponent with the Genre of a certain movie.
   * 
   * @param name {string}
   * @param description {string}
   */
  
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * Open's a dialog through DirectorCardComponent with the Director of a certain movie.
   * 
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   * @param death {string}
   */

  openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '500px'
    });
  }

}
