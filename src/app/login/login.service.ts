import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private _username: string = "";
  private _password: string = "";
  isAuthenticated$: any;
  constructor(private http: HttpClient) {

  }



  public signout(): Observable<any> {
    let jwtToken: String = this.getUserSecurityToken(),
      headers: HttpHeaders = new HttpHeaders({
        "authorization": "Bearer " + jwtToken,
      }),
      options = { headers: headers };
    return this.http.post<any>(environment.apiBaseUrl + "signOut", null, options);
  }

  public setSessionCurrentUser(userToAdd: any): void {
    if (userToAdd != null &&
      userToAdd.userId &&
      userToAdd.userId.trim() !== "" &&
      userToAdd.tokenValue &&
      userToAdd.tokenValue.trim() !== "") {
      if (sessionStorage.getItem("currentUser") != null) {
        sessionStorage.removeItem("currentUser");
      }

      sessionStorage.setItem("currentUser", JSON.stringify(userToAdd));
    }
  }

  public removeSessionCurrentUser(): void {
    if (sessionStorage.getItem("currentUser") != null) {
      sessionStorage.removeItem("currentUser");
    }
  }

  public checkUserLoggedIn(): Boolean {
    let retVal: Boolean = false,
      currUserObj: any = null,
      currUser: any;
    if (sessionStorage.getItem("currentUser") != null) {
      currUserObj = sessionStorage.getItem("currentUser");
      if (currUserObj != null && currUserObj.toString() != null && currUserObj.toString().trim() !== "") {
        currUser = JSON.parse(currUserObj.toString());
        if (currUser &&
          currUser.userId &&
          currUser.userId.trim() !== "") {
          retVal = currUser.tokenValue != null && currUser.tokenValue.trim() !== "";
        }
      }
    }

    return retVal;
  }

  public getLoggedinUser(): any | null {
    let retVal: any | null = null,
      currUser: any | null = null,
      currUserObj: any = null;

    if (sessionStorage.getItem("currentUser") != null) {
      currUserObj = sessionStorage.getItem("currentUser");
      if (currUserObj != null && currUserObj.toString() != null && currUserObj.toString().trim() !== "") {
        currUser = JSON.parse(currUserObj.toString());
        if (currUser &&
          currUser.userId &&
          currUser.userId.trim() !== "") {
          retVal = currUser;
        }
      }
    }

    return retVal;
  }

  public getUserSecurityToken(): String
  {
    let retVal: String = "",
      currUser: any | null = null,
      currUserObj: any = null;

    if (sessionStorage.getItem("currentUser") != null) {
      currUserObj = sessionStorage.getItem("currentUser");
      if (currUserObj != null && currUserObj.toString() != null && currUserObj.toString().trim() !== "") {
        currUser = JSON.parse(currUserObj.toString());
        if (currUser &&
          currUser.userId &&
          currUser.userId.trim() !== "") {
          retVal = currUser.tokenValue;
        }
      }
    }

    return retVal;
  }
}
