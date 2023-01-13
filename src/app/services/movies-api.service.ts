import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(private http:HttpClient) { }

  getMovies(page:number=1, limit: number=5) {
    return this.http.get(`${environment.apiUrl}/movies?size=${limit}&page=${page}`);

  }

  searchMovies(value: string) {
    if (value){
      return this.http.get(`${environment.apiUrl}/search/${value}`);
    }
    return this.http.get(`${environment.apiUrl}/search/`);

  }

  getStatistics(){
    return this.http.get(`${environment.apiUrl}/statistics`);
  }

}
