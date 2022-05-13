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

  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;
  favArray = <any>[];

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
    this.getCurrentUser();
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
      console.log(this.movies);
      console.log(' this.user ===========',  this.user );
      this.favArray = this.movies.filter((movie: any)=> this.user.FavoriteMovies?.includes(movie._id))
      this.favArray = this.favArray.map((movie: any)=> movie._id);
      console.log(' this.favArray ',  this.favArray );
      return this.movies;
    });
  }

  /**
   * When the user is logged the functions grab de user from local storage and add the details to the state.
   * @function getCurrentUser
   * @returns user in JSON format

   */
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
     console.log('getCurrentUse ========r', resp)
      const currentUser=resp.Username
      console.log(currentUser)
      this.user = resp;
      const currentFavs=resp.FavoriteMovies
      console.log(currentFavs)

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
    
    const token = localStorage.getItem('token');
    console.log(token)
    console.log(MovieID, this.favArray, this.favArray.includes(MovieID));
    if(!this.favArray.includes(MovieID)){
      this.fetchApiData.addFavoriteMovies(MovieID).subscribe((response: any) => {
        console.log('response',response);
        // this.favArray.push(MovieID)
      this.snackBar.open('Nice! The movie is in your list.', 'OK', { duration: 3000 })  
      });
    }else{
      this.snackBar.open('Sorry! The movie has been added to favorite.', 'OK', { duration: 3000 })
    }
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
      console.log(response);
    });
    
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


/**
 * So about the issues you have mentioned here are some things you can try to fix them:

You can do a check based on the id of the movie before adding it to the user's favorites.
 Forexample when you click the button to add a movie to favorites, you can first do a check to 
 makes sure that the user doesn't already have that movie 'id' present among their favorites
  Then about the favorites needing a reload to show up, i checked you code and it looks like you 
  are fetching and setting the movies correctly. so i think all you need to do is do a nil check. 
  so something like if favorites are present, then render favorite movies. its usually done 
  like favs && favs.map(...render fav). That way, it only renders when favs are present and wont 
  require a reload.

 */
