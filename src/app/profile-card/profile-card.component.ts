/**
 * The ProfileCardComponent renders the user's information, button that opens the ProfileEditCardComponent that
 * allows the user to update their profile. Another button to delete the account and finally a list
 * of the user's favorite movies.
 * 
 * @module ProfileCardComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditCardComponent } from '../profile-edit-card/profile-edit-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  // Under, gets the User information from the database.
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favs: any = null;
  favMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  // Gets the data from the Logged User
  // Gets all the movie data and maps the Logged User FavoriteMovies to currentFavoriteMoviesList. 

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  // Under, get the User from the localStorage.
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

  // Under, open the the edit dialog.
  openEditUserProfile(): void {
    this.dialog.open(ProfileEditCardComponent, {
      width: '500px'
    });
  }

  /**
   * Open's a dialog through GenreCardComponent with the Genre of a certain movie.
   * 
   * @param name {string}
   * @param description {string}
   */

  openGenreDialog(name: string, description: string): void {
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

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name: name, Bio: bio, Birth: birth},
      width: '500px',
    });
  }

  /**
   * Open's a dialog through SynopsisCardComponent with the Synopsis of a certain movie.
   * 
   * @param title {string}
   * @param imageUrl {any}
   * @param description {string}
   */
  
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
   
  }

  /**
   * Calls the API with a GET request via [[FetchApiDataService.getAllMovies]] and makes a mapping through
   * the user's Favorite List to check if any of the movies are in that list, if yes, the movie is added to the list.
   * 
   * @function getFavorites()
   * 
   */

  getFavorites(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      // movies.forEach((movie: any) => {
      //   if (this.user.FavoriteMovies?.includes(movie._id)) {
      //     this.favMovies.push(movie);
      //     // this.displayElement = true;
      //   }
      //   });
        this.favMovies = movies.filter((movie: any)=>this.user.FavoriteMovies?.includes(movie._id))
    });
  }

  /**
   * Removes a movie from a user's list of favorites with a DELETE request via 
   * [[FetchApiDataService.removeFavoriteMovies]].
   * 
   * @function removeFavorite
   * @param MovieID {string}
   */

  removeFavorite(MovieID: string): void {
    this.fetchApiData.removeFavoriteMovies(MovieID).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorite movies.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      setTimeout(() => {
        window.location.reload();
      });
      return this.favs;
    });
  }

  /**
   * Deletes the profile from database with a DELETE request via
   * [[FetchApiDataService.deleteUser]].
   */
  deleteUserProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open('The account was delete!', 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }
}
  

  

  

  


