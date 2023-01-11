
interface Base {
    movie_id: number,
    name: string
}

export interface MovieModel {
    type:string;
    title:string;
    countrys: Base[];
    date_added:string;
    release_year:string;
    rating:string;
    duration:string;
    description:string;
    directors:Base[];
    casts:Base[];
    listings:Base[];
}
