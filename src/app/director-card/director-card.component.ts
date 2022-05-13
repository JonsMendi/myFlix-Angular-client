/**
 * Director Component renders information about the director of a certain movie.
 * It's displayed after pressing the button ''Director' in each movie card.
 * 
 * @module DirectorCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  constructor(

    /**
     * @param - Inject is used to get the movie details from the movie object
     *  in movie.component.ts, where this component will have access through.

     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
