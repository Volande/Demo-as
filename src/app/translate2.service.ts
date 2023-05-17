import {UserService} from "./_services/user.service";
import {Product} from "./entities/product";
import {TranslocoService} from "@ngneat/transloco";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class Translate2Service {
  clothes : Product[] = [];
  clothesLanguage:Product[] = [];
  language: string ;
  constructor(private userService: UserService,
              private translocoService: TranslocoService) {

  }
  ngOnInit(): void {
    this.getPublicContent();
    this.language = this.translocoService.getDefaultLang();
    this.clothes.forEach((clothe)=>clothe.productInformation.filter((productInfo)=>
    productInfo.language == this.language))}


  getPublicContent(): void {
    this.userService.getPublicContent()
      .subscribe(clothes => this.clothes = clothes);
  }
}
