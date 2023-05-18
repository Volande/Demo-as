import {UserService} from "./_services/user.service";
import {Product} from "./entities/product";
import {TranslocoService} from "@ngneat/transloco";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class Translate2Service {
  language:string;
  index:number;

  constructor(private userService: UserService,
              private translocoService: TranslocoService) {

  }
  ngOnInit(): void {
    this.language = this.translocoService.getDefaultLang()

    if(this.language == "uk"){
      this.index = 0;
    }else {
      this.index = 1
    }
   }



}
