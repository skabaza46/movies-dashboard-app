import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild,AfterViewInit } from '@angular/core';
import { MovieModel } from '../shared/movie.model';
import {MatTableDataSource} from '@angular/material/table';
import { PaginationModel } from '../shared/pagination.model';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';
import { MoviesApiService } from '../services/movies-api.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  implements OnInit{
  @ViewChild('search', { static: false }) search: any;

  constructor(private http:HttpClient, private authService: AuthService, private movieApiService: MoviesApiService){}

  LIMITS = [
    { key: '5', value: 5 },
    { key: '10', value: 10 },
    { key: '20', value: 20 },
    { key: '25', value: 25 },
    { key: '50', value: 50 },
    { key: '55', value: 55 },
    { key: '100', value: 100 }
  ];

  limit: number = this.LIMITS[0].value;
  rowLimits: Array<any> = this.LIMITS;

  public temp: Array<object> = [];
  public columns = [
    { name: 'title',sortable: true },
    { name: 'type',sortable: true },
    { name: 'date_added', prop: 'date_added', sortable: true},
    { name: 'date_added', prop: 'release_year',sortable: true },
    { name: 'rating',sortable: true },
    { name: 'duration', sortable: true },
    { name: 'description', sortable: true },
    { name: 'casts',props: 'casts',  sortable: false },
    { name: 'countrys', props: 'countrys', sortable: false },
    { name: 'directors', props: 'directors', sortable: false },
    { name: 'listings', props: 'listings', sortable: false },

  ];;

  loadingIndicator = true;
  reorderable = true;

  movies: MovieModel[] = [];

  dataSource = new MatTableDataSource();

  pagination = new PaginationModel();

  downloadableData =[];

  ngOnInit(): void {

    this.authService.user.pipe(take(1)).subscribe( (user)=> {

    })

    this.movies.map((key, value)=> {

      console.log(key)
      console.log(value)
    });

    this.movieApiService.getMovies(this.limit).subscribe(
      (response: any) => {
        this.movies = response.data;
        this.temp = response.data;
        this.pagination = response.pagination;
        this.loadingIndicator = false;
      },
      (error) => {
        console.log(error);
      });
  }


  updateFilter(event:any) {
    const value = event.toString().toLowerCase().trim();

    this.movieApiService.searchMovies(value).subscribe(
      (response: any) => {
        this.movies = response.data;
        this.temp = response.data;
        this.pagination = response.pagination;
        this.loadingIndicator = false;
      },
      (error) => {
        console.log(error);
      });

  }

  setPage(pageInfo: any) {
    this.loadingIndicator = true;
    var page_next = pageInfo.offset+1;

    this.movieApiService.getMovies(page_next, this.limit).subscribe(
      (response: any) => {
        this.movies = response.data;
        this.pagination = response.pagination;

        this.loadingIndicator = false;
      },
      (error) => {
        console.log(error);
      });
  }

  changeRowLimits(event:any) {
    this.authService.user.pipe(take(1)).subscribe()

    this.limit = event.target.value;
    this.pagination.size = this.limit

    const current_page = this.pagination.currentPage.split('page=')[1];

    this.movieApiService.getMovies(+current_page,this.limit).subscribe(
      (response: any) => {
        this.movies = response.data;
        this.pagination = response.pagination;

        this.loadingIndicator = false;
      },
      (error) => {
        console.log(error);
      });
  }


}
