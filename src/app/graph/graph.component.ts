import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, } from '@angular/core';

import { ChartData } from '../shared/chartdata.model';
import { ChartComponent } from 'angular2-chartjs';
import { MoviesApiService } from '../services/movies-api.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements AfterViewInit {

  @ViewChild("ratingsBar") chart: ChartComponent| any; 
  @ViewChild("listingBar") chart2: ChartComponent| any; 
  @ViewChild("generalBar") chart3: ChartComponent| any; 

  constructor(private http:HttpClient, private movieAPIService: MoviesApiService){}

  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },

  };

  movies_year = "";

  rateingData: ChartData = {
    labels: [`${this.movies_year} Movie Ratings`],
    backgroundColor: 'blue',
    datasets: []
  };

  listingsData: ChartData = {
    labels: [`${this.movies_year} Movie Listings`],
    backgroundColor: 'red',
    datasets: []
  };

  generalData: ChartData = {
    labels: [`${this.movies_year} Total Movies`, `${this.movies_year} Movie Types`],
    backgroundColor: 'orange',
    datasets: []
  };


  ngAfterViewInit(): void {

    this.movieAPIService.getStatistics().subscribe(
      (response: any) => {

        this.movies_year = response.data.movies_year;

        if (response.data.ratings){
          response.data.ratings.map((item:any)=>{
            this.rateingData.datasets.push({
              label: item.name,
              data: [item.total],
              backgroundColor: ["#ef9b20"],
            })
          })
        }

        if (response.data.listings){
          response.data.listings.map((item:any)=>{
            console.log(item.name)
            this.listingsData.datasets.push({label: item.name, data: [item.total],  backgroundColor: ["#00bfa0"]
          })
          })
        }

        this.generalData.datasets.push({label: "", data: [response.data.total_movies],
        backgroundColor: ["#27aeef", "black"]})

        if (response.data.types){
          response.data.types.map((item:any)=>{
            this.generalData.datasets.push({label: item.name, data: [item.total],
              backgroundColor: ["#ea5545"]})
          })
        }

        // Update the three chart types, since there is new data
        this.chart.chart.update();
        this.chart2.chart.update();
        this.chart3.chart.update();

      },
      (error) => {
        console.log(error);
      });
  }


}


