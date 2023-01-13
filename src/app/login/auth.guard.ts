import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        this.authService.user;
        return this.authService.user.pipe(map((user)=>{

            const isAuth = !!user

            if(isAuth){
                return true;
            }

            return this.router.createUrlTree(['/login'])
        }))
    }

}