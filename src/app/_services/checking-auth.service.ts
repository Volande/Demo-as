import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CheckingAuthService{
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
   role: string = "UnAuthorized";
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
    this.checking();
  }

  checking(): void {
    const user = this.tokenStorageService.getUser();
    this.isLoggedIn = (user != null);

    if (user) {
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ADMIN');
      this.showModeratorBoard = this.role.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
    }
  }
}
