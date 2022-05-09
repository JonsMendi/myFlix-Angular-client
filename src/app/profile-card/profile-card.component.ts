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

  // Under, genre dialog.
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  // Under, director dialog.
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name: name, Bio: bio, Birth: birth},
      width: '500px',
    });
  }

  // Under, synopsis dialog.
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

  // Under, get the favorites form the User database.
  getFavorites(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies?.includes(movie._id)) {
          this.favMovies.push(movie);
          this.displayElement = true;
        }
        });
      
    });
  }

  // Under, remove the movie from the list of favorites.
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

  // Under, deletes the profile from the database.
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
  

  

  

  


