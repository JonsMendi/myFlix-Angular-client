/**
 * Synopsis Component renders information about the synopsis of a certain movie.
 * It's displayed after pressing the button 'Synopsis' in each movie card.
 * 
 * @module SynopsisCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
export class SynopsisCardComponent implements OnInit {

  constructor(

    /**
     * @param - Inject is used to get the movie details from the movie object
     *  in movie.component.ts, where this component will have access through.

     */
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
