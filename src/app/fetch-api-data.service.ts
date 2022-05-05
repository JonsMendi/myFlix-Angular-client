import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Under, the API url that will interact with Client-Side.
const apiUrl = 'https://mymovies-api-jbm.herokuapp.com/';

const token = localStorage.getItem('token');

const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  // Making the API call for the user-registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  //Under, API call to log-in endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  //Under, the API call to get all movies endpoint.
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

  //Under, the API call a single movie endpoint.
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

  //Under, the API calls the directors endpoint.
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

  //Under, the API calls the genres endpoint.
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

  //Under, the API calls individual user endpoint.
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Under, the API calls a user favorite list endpoint.
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

  //Under, the API calls the add movie to favorite list endpoint.
  public addFavoriteMovies(id: any): Observable<any> {
    
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl+`users/${username}/movies/${id}`,null,  {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
        
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Under, the API calls the remove movie from favorite list endpoint.
  public removeFavoriteMovies(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Under, the API calls the update user endpoint.
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

  //Under, the API calls the delete user endpoint.
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

