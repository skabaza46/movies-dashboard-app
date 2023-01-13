import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../shared/authresponse.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from "../shared/user.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class AuthService {
    user = new  BehaviorSubject<User|null>(null);
    isLoggedIn = new  BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient){}

    signUp = (email: string|null, first_name: string|null, last_name: string|null, password: string|null) => {

        return this.http.post<AuthResponseData>( `${environment.apiUrl}/user/register'`,{
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.data.email,
                resData.data.first_name,
                resData.data.last_name,
                resData.data.token
              );
            })
          );
    }

    signIn = (email: string|null, password: string|null) => {
        console.log(email, password)
        return this.http.post<AuthResponseData>(`${environment.apiUrl}/user/login`,{
                email: email,
                password: password
            })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                  this.handleAuthentication(
                    resData.data.email,
                    resData.data.first_name,
                    resData.data.last_name,
                    resData.data.token
                  );
                })
              );
    }

    signOut = () => {
        return this.http.post(`${environment.apiUrl}/user/logout`,{}).subscribe((response)=>{

            localStorage.removeItem('token');
            this.user.next(null);
            this.isLoggedIn.next(false);

        });
    }

    checkTokenIsValid = (token: string) => {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`});
        let options = { headers: headers };

        this.http.post<{data:User}>(`${environment.apiUrl}/user/check-token`,null,options,).subscribe((response)=>{

            const user = new User(
                response.data.email,
                response.data.first_name,
                response.data.last_name,
                response.data.token,
                true
            )
            this.user.next(user);
            this.isLoggedIn.next(true);
        },
        (error)=>{
            console.warn(error);
            this.isLoggedIn.next(false);

        });
    }

    checkUserIsLoggedIn = () => {

        const user_token = localStorage.getItem("token");

        if (user_token){
            // Check if the user token is valid
            this.checkTokenIsValid(user_token);
        }
    }

    private handleAuthentication(
        email: string,
        first_name: string,
        last_name: string,
        token: string
      ) {
        const user = new User(email, first_name, last_name,token);

        localStorage.setItem("token", token);
        this.user.next(user);
        this.isLoggedIn.next(true);
      }

      private handleError(errorRes: HttpErrorResponse) {
        let error = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(error);
        }
        return throwError(error);
      }
}