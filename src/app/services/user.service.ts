import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product, sellerLogin, sellerSignup } from '../dataType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

//TODO:
  constructor(private http: HttpClient, private router: Router) { }

  userLoginError=new EventEmitter<boolean>(false);

  userSignUpService(data: sellerSignup){
    return this.http.post(`http://localhost:3000/user`, data, {observe: "response"}).subscribe((result)=>{
      localStorage.setItem("user", JSON.stringify(result.body));
      this.router.navigate(['']);
    });
  }

  userLoginService(data: sellerLogin){
    return this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`).subscribe((result: any)=>{
      if(result && result.length>0){
        localStorage.setItem("user", JSON.stringify(result[0]));
        this.userLoginError.emit(false);
        this.router.navigate(['']);
      }
      else{
        this.userLoginError.emit(true);
      }
    });
  }

  userAuthReload(){
    if(localStorage.getItem("user")){
      this.router.navigate(['']);
    }
  }

}
