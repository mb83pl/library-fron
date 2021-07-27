import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { handleError } from 'src/functions/handleError';
import { Person } from '../model/person';

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

  constructor(private http: HttpClient) {}

  // working
  getPersonList = (): Observable<Person[]> =>
    this.http.get<Person[]>(`${this.apiUrl}/person`);

  // working
  getPersonById = (id: number): Observable<any> =>
    this.http.get<Person>(`${this.apiUrl}/person/${id}`);

  // working
  createPerson(person: Person): Observable<Person> {
    let personBody = JSON.stringify(person);
    return this.http
      .post<Person>(`${this.apiUrl}/person/`, personBody, this.httpOptions)
  }

  // not working, some error of CORS policy
  updatePerson(id: number, person: Person): Observable<Person> {
    let personBody = JSON.stringify(person);
    return this.http
      .put<Person>(`${this.apiUrl}/person/${id}`, personBody, this.httpOptions)
      .pipe(catchError(handleError));
  }

  // testing
  deletePerson = (id: number): Observable<Person> =>
    this.http.delete<Person>(`${this.apiUrl}/person/${id}`, this.httpOptions)
}
