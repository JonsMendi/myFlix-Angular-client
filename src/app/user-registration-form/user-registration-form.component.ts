/**
 * Renders a registration form for users to make a new account.  
 * The user must supply a valid Username, Password, Email, and 
 * Birthday (optional).
 * 
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * The input userData is empty strings by default.
   * This is updated when the suer types into the form fields.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birth: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Attempts to register the user with teh input credentials.  
   * Uses [[FetchApiDataService.userRegistration]].  
   * Upon successful registration, the user can then log in.  
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    // Logic for a successful user registration goes here! (To be implemented)
    this.dialogRef.close(); // This will close the modal on success!
    console.log(result);
    this.snackBar.open('User registered successfully', 'OK', {
        duration: 3000
    });
    }, (result) => {
      console.log(result);
      this.snackBar.open('User and Password should have at least 5 characters and should contain letters and numbers.', 'OK', {
        duration: 5000
      });
    });
  }

}
