import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../interface/book';
import { Person } from '../interface/person';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonDataService {
  private readonly apiUrl: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${this.apiUrl}`,
    }),
  };

  msgTrue = false;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) {}

  // working
  getPersonList = (): Observable<Person[]> =>
    this.http.get<Person[]>(`${this.apiUrl}/person/list`);

  // working
  getPersonById = (id: number): Observable<any> =>
    this.http.get<Person>(`${this.apiUrl}/person/byid/${id}`);

  // working
  createPerson(person: Person): Observable<Person> {
    let personBody = JSON.stringify(person);
    return this.http
      .post<Person>(`${this.apiUrl}/person/add`, personBody, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // not working, some error of CORS policy
  updatePerson(id: number, person: Person): Observable<Person> {
    let personBody = JSON.stringify(person);
    return this.http
      .put<Person>(
        `${this.apiUrl}/person/update/${id}`,
        personBody,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // testing
  deletePerson = (id: number): Observable<any> =>
    this.http.delete(`${this.apiUrl}/person/delete/${id}`, this.httpOptions);
}
