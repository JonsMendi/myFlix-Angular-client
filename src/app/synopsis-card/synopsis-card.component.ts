import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(

    
    // Under, Inject is used to get the movie details from the movie object in movie.component.ts, where this component will have access through.
     @Inject(MAT_DIALOG_DATA)
     public data: {
       Title: string,
       ImageUrl: any,
       Description: string,
       Genre: string
     }
  ) { }

  ngOnInit(): void {
  }

}
