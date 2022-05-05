import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  // When the User types into to the input, the updateUserData is updated.
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' }

  // Under, gets the User information from the database.
  userFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.userFromStorage));// Puts the user from localStorage into a variable.
  currentUsername: any = this.currentUser.Username;
  currentFavoriteList: any = this.currentUser.Favorites;
  favoritesListEmpty: boolean = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  // Gets the data from the Logged User
  // Gets all the movie data and maps the Logged User FavoriteMovies to currentFavoriteMoviesList. 

  ngOnInit(): void {
    this.getCurrentUser(this.currentUsername);
  }

  getCurrentUser(currentUser: string): void {
    this.fetchApiData.getUser(currentUser).subscribe((response: any) => {
      this.currentUser = response;
      this.currentFavoriteList = this.currentUser.Favorites;
      this.checkFavoriteList();
      return this.currentUser;
    });
  }

  updateUserProfile(): void {
    const updateData = {
      Username: this.userData.Username ? this.userData.Username : this.currentUser.Username,
      Password: this.userData.Password ? this.userData.Password : this.currentUser.Password,
      Email: this.userData.Email ? this.userData.Email : this.currentUser.Email,
      Birth: this.userData.Birth ? this.userData.Birth : this.currentUser.Birth,
    }
    this.fetchApiData.updateUser(updateData).subscribe((response: any) => {
      this.snackBar.open('Profile successfully update.', 'OK', { duration: 3000 });
      localStorage.setItem('user', response.Username)
      this.getCurrentUser(this.currentUser.Username)
    }, (response: any) => {
      this.snackBar.open('Failed updating', 'OK', { duration: 3000 })
    })
  }

  checkFavoriteList(): any {
    if (this.currentFavoriteList.length == 0) {
      this.favoritesListEmpty = true;
    } else {
      this.favoritesListEmpty = false;
    }
    return this.favoritesListEmpty;
  }

  removeFavoriteMovie(MovieId: any): void {
    this.fetchApiData.removeFavoriteMovies(this.currentUsername, MovieId).subscribe((response: any) => {
      this.ngOnInit();
      this.snackBar.open('Movie successfully removed', 'OK', { duration: 3000 });
    });
    this.ngOnInit();
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }



}
