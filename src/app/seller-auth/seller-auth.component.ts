import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { sellerLogin, sellerSignup } from '../dataType';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) {}

  showLoginForm: boolean=false;
  sellerLoggedInError: boolean=false;

  ngOnInit(): void{
    this.seller.reloadSeller();
  }

  handleSignUp(data: sellerSignup): void{
    this.seller.sellerSignupService(data);
  }

  handleLogin(data: sellerLogin): void{
    this.seller.sellerLoginService(data);
    this.seller.sellerLoggedError.subscribe((isError)=>{
      if(isError){
        this.sellerLoggedInError=true;
      }
      else{
        this.sellerLoggedInError=false;
      }
    });
  }

  launchLoginForm(){
    this.showLoginForm=true;
  }
  
  launchSignupForm(){
    this.showLoginForm=false;
  }
}
