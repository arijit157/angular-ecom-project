import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private productService: ProductService) { }

  sellerName: string = "";
  userName: string="";
  menuType: string = "default";
  searchItem: string = "";
  searchResult: Array<product> | undefined;
  totalCartItems=0;

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {

        if (localStorage.getItem("seller") && val.url.includes("seller")) {
          // console.log("in seller area");
          this.menuType = "seller";
          let sellerStore = localStorage.getItem("seller");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }

        else if(localStorage.getItem("user")){
          // console.log("in user area");
          this.menuType="user";
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
        }

        else {
          // console.log("outside of seller area");
          this.menuType = "default";
        }
        
      }
    });

    if(!localStorage.getItem("user")){
      let productsOfCart=localStorage.getItem("product");
      if(productsOfCart){
        this.totalCartItems=JSON.parse(productsOfCart).length;
        this.productService.cartData.subscribe((cartData)=>{
          this.totalCartItems=cartData.length;
        })
      }
    }
    else{
      let userInfo=localStorage.getItem("user");
      let parsedUserInfo=userInfo && JSON.parse(userInfo);
      let user_ID=parsedUserInfo.id;

      this.productService.getAllCartItems(user_ID).subscribe((result)=>{
        this.totalCartItems=result.length;
      });

      // this.productService.dbCartData.subscribe((cartData) => {
      //   console.log(cartData);
      //   this.totalCartItems=cartData.length;  //TODO: fix the bug of cart count
      // });
    }
  }

  logout(): void {
    localStorage.removeItem("seller");
    this.router.navigate([""]);
  }

  userLogout(){
    localStorage.removeItem("user");
    this.router.navigate(["user-auth"]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.searchItem = element.value;
      this.productService.searchedProducts(this.searchItem).subscribe((result) => {
        this.searchResult = result;
        if (this.searchResult.length > 5) {
          this.searchResult.length = 5;
        }
      }
      );
    }
  }

  removeSearchResult() {
    this.searchResult = undefined;
  }

  search(){
   this.router.navigate([`search/${this.searchItem}`]);
  }

  redirectToDetails(id: number){
    this.router.navigate([`product/${id}`]);
  }
}
