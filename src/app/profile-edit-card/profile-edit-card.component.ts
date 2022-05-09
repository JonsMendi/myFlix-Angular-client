import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-edit-card',
  templateUrl: './profile-edit-card.component.html',
  styleUrls: ['./profile-edit-card.component.scss']
})
export class ProfileEditCardComponent implements OnInit {

  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = { 
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birth: this.user.Birth
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditCardComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  // Under, grabs the user from localStorage to allow to update.
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user
    });
  }

  // Under, updates the user.
  updateUserProfile(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open(resp, 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
