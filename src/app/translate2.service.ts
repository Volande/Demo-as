import {UserService} from "./_services/user.service";
import {Product} from "./entities/product";
import {LangChangedEvent, TranslocoService} from "@ngneat/transloco";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class Translate2Service {
  language:string;
  index:number;

  constructor(private userService: UserService,
              private translocoService: TranslocoService) {

  }
  ngOnInit(): void {

   }


}
