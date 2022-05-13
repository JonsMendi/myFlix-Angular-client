/**
 * This file contains all the functions for the API calls.
 * 
 * @module FetchApiDataService
 */

import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * The root URL for the hosted API
 */
const apiUrl = 'https://mymovies-api-jbm.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * Making the API call for the user-registration endpoint
   * 
   * @param userDetails {any}
   * @returns data from new user in JSON format
   * 
   * { _id: <string>,  
   *   Username: <string>,  
   *   Password: <string> (hashed),  
   *   Email: <string>, 
   *   Birth: <date>  
   *   FavoriteMovies: [array]  
   * }
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * API call to log-in endpoint
   * @param userDetails {any}
   * @returns data for logged user and JWToken in JSON format
   * 
   *  user: {  
   *   _id: <string>,  
   *   Username: <string>,
   *   Password: <string> (hashed),  
   *   Email: <string>,  
   *   Birth: <date>,  
   *   FavoriteMovies: [array]  
   *   },   
   *   token: <string>   
   * }
   */
  
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * API call to get all movies endpoint.
   * Grabs token from localStorage for auth.
   * @returns object containing array of data for all movies
   * 
   * {[      
   *   _id: <string>,   
   *   Title: <string>,   
   *   Description: <string>,      
   *   ImageUrl: <string>,  
   *   Genre: { Name: <string>, Description: <string> },    
   *   Director: { Name: <string>, Bio: <string>, BirthYear: <string> },  
   * ]}
   */
  
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      );
  }

  /**
   * API call a single movie endpoint.
   * 
   * @param title {any}
   * @returns object containing data for one movie.
   * 
   * {[      
   *   _id: <string>,   
   *   Title: <string>,   
   *   Description: <string>,      
   *   ImageUrl: <string>,  
   *   Genre: { Name: <string>, Description: <string> },    
   *   Director: { Name: <string>, Bio: <string>, BirthYear: <string> },  
   * ]}
   */
   
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls the directors endpoint.
   * Grabs token from localStorage for auth.
   * 
   * @param directorName {string}
   * @returns object containing data for one director.
   * { 
   * Name: <string>, 
   * Bio: <string>, 
   * BirthYear: <string>,
   * DeathYear: <string>,
   * }
   */
  
  getDirector(directorName: 'string'): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${directorName}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls the genres endpoint.
   * Grabs token from localStorage for auth.
   * 
   * @param genre {string}
   * @returns object containing data for one genre.
   * 
   * { 
   * Name: <string>, 
   * Description: <string> 
   * }
   */
  
  getGenre(genre: 'string'): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${genre}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls individual user endpoint.
   * Grabs token from localStorage.
   * 
   * @param Username {any}
   * @returns object containing user's data.
   * 
   * { _id: <string>,   
   *   Username: <string>,   
   *   Password: <string> (hashed),   
   *   Email: <string>,  
   *   Birth: <date>  
   *   FavoriteMovies: [array]  
   * }
   */
   
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API calls a user favorite list endpoint.
   * Grabs token from localStorage.
   * 
   * @param username {string}
   * @returns FavoriteMovies [array]
   */
   
  getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + '/movies', { headers: new HttpHeaders (
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API calls the add movie to favorite list endpoint.
   * 
   * @param MovieID {any}
   * @returns update user FavoriteMovies by adding[...<string>]
   */
  
  public addFavoriteMovies(MovieID: any): Observable<any> {
    
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.post(apiUrl+`users/${Username}/movies/${MovieID}`,null,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
        
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls the remove movie from favorite list endpoint.
   * Grabs Username and token from localStorage.
   * 
   * @param MovieID {any}
   * @returns updates user FavoriteMovies list by removing [<string>]
   */
  
  public removeFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${Username}/movies/${MovieID}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls the update user endpoint.
   * Grabs Username and token from localStorage
   * @param userData {any}
   * @returns updates user profile data.
   * 
   * { _id: <string>,   
   *   Username: <string>,   
   *   Password: <string> (hashed),   
   *   Email: <string>,  
   *   Birth: <date>  
   *   FavoriteMovies: [array]  
   * }
   */
  
  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${Username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API calls the delete user endpoint.
   * Grabs Username and token from localStorage
   * @returns message confirming that the user profile was deleted
   */
  
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  // Non-typed response extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

