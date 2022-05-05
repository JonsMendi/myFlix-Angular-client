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

  movies: any = [];
  Favorites: any[] = [];
  user: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  // Under, Function to get Movies and Favorite Movies when component is initialized.
  ngOnInit(): void {
    this.getMovies();
    // this.getFavoriteMovies();
  }

  // Under, when the User logs in, getMovies() get all de movies from the server and displays in ngOnIt().
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Under, should get the favorite movies from the user
  // getFavoriteMovies(): void {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   this.fetchApiData.getUser(user).subscribe((response: any) => {
  //     this.Favorites = response.FavoriteMovies
  //   })
  // }

  // Under the function should call the addFavorites from fetchApiServer and use the id string containing the ID of the movie to be added to the User favorite list.
  // addOnFavoriteMovie(MovieId: string, title: string): void {
  //   this.fetchApiData.addFavoriteMovies(MovieId, this.user).subscribe((response: any) => {
  //     console.log(response);
  //     this.snackBar.open('The movie have been added to your Favorite List', 'OK', { duration: 4000 });
  //     this.ngOnInit();
  //   });
  //   return this.getFavoriteMovies();
  // }

  // Under, the should remove the movie from the the favorite list
  // deleteFavoriteMovie(MovieId: string, title: string): void {
  //   this.fetchApiData.removeFavoriteMovies(MovieId, this.user).subscribe((response: any) => {
  //     console.log(response);
  //     this.snackBar.open('The movie have been removed from your Favorite List', 'OK', { duration: 4000 });
  //     this.ngOnInit();
  //   });
  //   return this.getFavoriteMovies();
  // }

  // Under will be called in toggleFavorite to say if its already or not in the favorite list
  // isFavorite(MovieID: string): boolean {
  //   return this.Favorites.includes(MovieID);
  // }

  // toggleFavorite(movie: any): void {
  //   this.isFavorite(movie._id)
  //     ? this.deleteFavoriteMovie(movie._id, movie.Title)
  //     : this.addOnFavoriteMovie(movie._id, movie.Title);
  // }

  // Under, will open the Synopsis.
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

  // Under, will open the Genre.
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  // Under will open the Director.
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

  // Under, will open the Profile.
  openProfile(): void {
    this.router.navigate(['profile']);
  }

  // Under, will allow
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear()
  }

}
