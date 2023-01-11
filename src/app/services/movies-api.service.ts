import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(private http:HttpClient) { }

  getMovies() {
    return this.http.get("http://127.0.0.1:5000/movies");
  }
}
