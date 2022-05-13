/**
 * This component will be the first to open when the user access the website.  
 * It will contain the access to two different components: Register and Log-in Components. 
 * Then all the routes, will be defined in 'app.module.ts'.
 * 
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
// Under, imported the two components that we need to access through 'WelcomePageComponent'.
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
// Under, uses Dialog from Material package define the UI.
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  


  ngOnInit(): void {
  }

  /**
   * Opens a dialog with a UserRegistrationFormComponent
   */ 

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  /**
   * Opens a dialog with a UserLoginFormComponent
   */ 

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

}
