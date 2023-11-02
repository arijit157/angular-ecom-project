import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../dataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cartData: cart[] | undefined;
  totalAmount: number = 0;
  tax: number = 54;
  deliveryCharge: number = 40;
  discount: number = 0;
  netAmount: number = 0;
  isDisabled: boolean=true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    let userInfo = localStorage.getItem("user");
    let parsedUserInfo = userInfo && JSON.parse(userInfo);
    this.productService.getAllCartItems(parsedUserInfo.id).subscribe((result: cart[]) => {
      this.cartData = result;
      let initialValue: number = 0;
      let priceArr: number[] = [];   //initializing an empty array
      this.cartData.forEach((cartItem) => {
        let quantity = cartItem.quantity;
        if (quantity) {
          priceArr.push(Number(cartItem.price * quantity));
        }
      });
      if (this.cartData.length===0) {
        // console.log(this.cartData);
        this.totalAmount = 0;
        this.discount = 0;
        this.netAmount = 0;
        this.tax = 0;
        this.deliveryCharge = 0;
      }
      else {
        this.totalAmount = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
        this.discount = Math.floor((this.totalAmount * 5) / 100);
        this.netAmount = (this.totalAmount + this.tax + this.deliveryCharge) - this.discount;
        this.isDisabled=false;
      }

    });
  }

  gotoCheckoutPage() {
    this.router.navigate(["checkout"]);
  }
}
