import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponseData } from "../shared/authresponse.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { User } from "../shared/user.model";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class AuthService {
    user = new  BehaviorSubject<User|null>(null);

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
        console.log("Signing out of the system")
        return this.http.post(`${environment.apiUrl}/user/logout`,{}).subscribe((response)=>{
            console.log("response: "+response)
            console.log("Logged out !");
        });
    }


    private handleAuthentication(
        email: string,
        first_name: string,
        last_name: string,
        token: string
      ) {
        const user = new User(email, first_name, last_name,token);
        this.user.next(user);
      }

      private handleError(errorRes: HttpErrorResponse) {
        let error = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(error);
        }
        return throwError(error);
      }
}