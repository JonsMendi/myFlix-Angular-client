/**
 * Renders a login form for users to enter their Username and Password.
 * 
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Under, Router is imported to redirect the user to '/movies' after Logged.
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * The input userData is empty strings by default.  
   * This is updated when the user types into the form fields.
   */

  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Attempts to log the user in with the input credentials.  
   * Uses [[FetchApiDataService.userLogin]].  
   * Saves Username and token in localStorage and 
   * redirects to `/movies` if successful login.  
   * 
   */

  
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
    // Logic for a successful user registration goes here! (To be implemented)
    this.dialogRef.close(); // This will close the modal on success!
    console.log(response);
    //Under, will save the credentials in localStorage to keep the user logged while surfing.
    localStorage.setItem('user', response.user.Username);
    localStorage.setItem('token', response.token);
    this.snackBar.open(`Welcome to myFLix, enjoy!`, 'OK', {
        duration: 3000
    });
    this.router.navigate(['movies']); // Navigates to the movies route
    }, (responseAgain) => {
      console.log(responseAgain);
      this.snackBar.open('Sorry, we could not logged you in. Check your credentials again!', 'OK', {
        duration: 5000
      });
    });
  }

}
