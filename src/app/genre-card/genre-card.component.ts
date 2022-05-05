import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  constructor(
    // Under, Inject is used to get the movie details from the movie object in movie.component.ts, where this component will have access through.
     @Inject(MAT_DIALOG_DATA)
     public data: {
      Name: string;
      Description: string;
     }
  ) { }

  ngOnInit(): void {
  }

}
