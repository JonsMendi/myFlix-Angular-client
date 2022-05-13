/**
 * The NavBar displays the Movie and Profile access route and a button for the user Logout
 * 
 * @module NavbarComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void {
  }

  /**
   * Navigates to `'/movies'`  
   * This is called from a button.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to `'/profile'`  
   * This is called from a button.
   */
  goToProfilePage(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by clearing localStorage and navigating to `/welcome`  
   * This is called from a logout button.
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('Hope you enjoyed, see later!', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

}
