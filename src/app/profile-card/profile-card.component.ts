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
  favoriteMovies: any[] = [];
  

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  // Gets the data from the Logged User
  // Gets all the movie data and maps the Logged User FavoriteMovies to currentFavoriteMoviesList. 

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * This function grab the User from the DataBase and the makes a Loop in the FavoriteMovies list.
   * If there is any movie in the list, it's added to favoriteMovies [].
   * 
   * @function getUserProfile
   * @returns The User data object with is FavoriteMoves
   */
  // Under, get the User from the localStorage.
  getUserProfile(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
          
        }
        });
      });
    })
  }
  }

  /**
   * Removes a movie from a user's list of favorites with a DELETE request via 
   * [[FetchApiDataService.removeFavoriteMovies]].
   * 
   * @function removeFavorite
   * @param MovieID {string}
   */
  removeFavorites(MovieID: string, title: string): void {
    this.fetchApiData.removeFavoriteMovies(MovieID).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your list!`,
        'OK',
        {
          duration: 2000,
        }
      );
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
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
  

  

  

  


