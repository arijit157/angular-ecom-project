import { Component } from '@angular/core';
import { cart, product, sellerLogin, sellerSignup } from '../dataType';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(private userService: UserService, private productService: ProductService) { }

  showLoginForm: boolean=false;
  showLoginErrorMessage: boolean=false;

  ngOnInit(): void{
    this.userService.userAuthReload();
  }

  handleSignUp(data: sellerSignup){
    this.userService.userSignUpService(data);
  }

  handleLogin(data: sellerLogin){
    this.userService.userLoginService(data);
    this.userService.userLoginError.subscribe((isError)=>{
      if(isError){
        this.showLoginErrorMessage=true;
      }
      else{
        // this.showLoginErrorMessage=false;
        this.localToRemoteCart();
      }
    })
  }

  launchLoginForm(){
    this.showLoginForm=true;
  }

  launchSignupForm(){
    this.showLoginForm=false;
  }

  //TODO:
  localToRemoteCart(){
    let userInfo=localStorage.getItem("user");
    let data=localStorage.getItem("product");
    if(data){
      let parsedData: product[]=JSON.parse(data);
      let parsedUserInfo=userInfo && JSON.parse(userInfo);
      let userID: number=parsedUserInfo.id;
      parsedData.forEach((item: product)=>{
        let cartInfo: cart={
          ...item,
          userID,
          productID: item.id
        }

        setTimeout(() => {
          this.productService.addToCartDBService(cartInfo);
        }, 500);   //setTimeout is necessary here to protect the JSON server from hanging
      });
      localStorage.removeItem("product");
    }
  }
}
