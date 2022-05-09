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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  // Under, Function to get Movies and Favorite Movies when component is initialized.
  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  // Under, when the User logs in, getMovies() get all de movies from the server and displays in ngOnIt().
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  //Under, when the user is logged the functions grab de user from local storage and add the details to the state.
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
     console.log(resp)
      const currentUser=resp.Username
      console.log(currentUser)
      const currentFavs=resp.FavoriteMovies
      console.log(currentFavs)

    });
  }

  // Under, add the movie to favorite list of user.
  addToUserFavorites(MovieID: string): void {
    console.log(MovieID);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((response: any) => {
      console.log(response);
    this.snackBar.open('Nice! The movie is in your list.', 'OK', { duration: 3000 })
    this.ngOnInit();    
    });
  }

  // Under, removes(need to be configurated to toogle).
  removeFavorite(MovieID: string): void {
    console.log(MovieID);
      this.fetchApiData.removeFavoriteMovies(MovieID).subscribe((response: any) => {
      console.log(response);
    });
    
  }

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

}
