import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../dataType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  postOrder(data: order){
    return this.http.post("http://localhost:3000/orders", data, {observe: "response"}).subscribe(result => {
      console.log(result);
      this.router.navigate(['/my-orders']);
    });
  }

  listOrder(){
    let userInfo=localStorage.getItem("user");
    let parsedUserInfo=userInfo && JSON.parse(userInfo);
    return this.http.get<order[]>(`http://localhost:3000/orders?userID=${parsedUserInfo.id}`);
  }
}
