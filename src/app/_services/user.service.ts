import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product} from "../entity/product";
import {Categories} from "../entity/categories";
import {Collection} from "../entity/collection";
import {Size} from "../entity/size";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "../message.service";
import {Ordered_product} from "../entity/ordered_product";
import {TokenStorageService} from "./token-storage.service";
import {Customer} from "../entity/customer";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8082/';
  private orders: Ordered_product[]=[];


  constructor(private http: HttpClient,
              private messageService: MessageService,
              private tokenStorage: TokenStorageService) {
  }

  getPublicContent(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + 'products/');
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.API_URL + 'products/categories');
  }

  getCollection(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.API_URL + 'products/collection');
  }

  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.API_URL + 'products/sizes');
  }
  getAllOrder():Observable<Customer[]>{
     return this.http.get<Customer[]>(this.API_URL + 'api/v1/admin/orderAll');
  }


  getClothe(id: number): Observable<Product> {
    const url = this.API_URL + "products/clothes/" + id;
    return this.http.get<Product>(url);
  }


  orderClothes(
    firstName: string,
    lastName: string,
    postOffice: string,
    departmentPostOffice: string,
    numberPhone: string,
    ordersClothes: Product[]
  ) {

    let userNew = this.tokenStorage.getUser()

let user = {
  userId: userNew?.userId
}

    let customer ={
      firstName: firstName,
      lastName: lastName,
      postOffice: postOffice,
      departmentPostOffice: departmentPostOffice,
      numberPhone: numberPhone,
    } as Customer

    for (const orderClothe of ordersClothes) {

      let  order ={
        size:orderClothe.size[0],
        price:orderClothe.price,
      } as Ordered_product
      // @ts-ignore
      orderClothe.size = null //backend принимает продукт ,где size массив объектов,но у нас он объект,поэтому мы даем ему нулевое значение
      order.product = orderClothe

      this.orders.push(order)
    }


    const formData = new FormData;
    formData.append("customer", new Blob([JSON.stringify(customer)], {
      type: 'application/json'
    }))
    formData.append("user", new Blob([JSON.stringify(user)], {
      type: 'application/json'
    }))
    formData.append("orderDetails", new Blob([JSON.stringify(this.orders)], {
      type: 'application/json'
    }))

    return this.http.post(this.API_URL + "user/orderClothes",
      formData).pipe(
      tap(_ => this.log(`isTokenValid error`)),
      catchError((err) => {
        return throwError(err);
      })
    )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}

