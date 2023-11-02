import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../dataType';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartData: cart[] | undefined;
  totalAmount: number = 0;
  tax: number = 54;
  deliveryCharge: number = 40;
  discount: number = 0;
  netAmount: number = 0;
  tempID: number=0;
  isOrderPlaced: boolean=false;

  constructor(private productService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    let userInfo = localStorage.getItem("user");
    let parsedUserInfo = userInfo && JSON.parse(userInfo);
    this.productService.getAllCartItems(parsedUserInfo.id).subscribe((result: cart[]) => {
      this.cartData = result;
      console.log(this.cartData);
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
        this.deliveryCharge = 0
      }
      else {
        this.totalAmount = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
        this.discount = Math.floor((this.totalAmount * 5) / 100);
        this.netAmount = (this.totalAmount + this.tax + this.deliveryCharge) - this.discount;
      }
      // this.totalAmount = priceArr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
      // this.discount = Math.floor((this.totalAmount * 5) / 100);
      // this.netAmount = (this.totalAmount + this.tax + this.deliveryCharge) - this.discount;
    });
  }

  handleOrder(data: any) {
    let userInfo = localStorage.getItem("user");
    let parsedUserInfo = userInfo && JSON.parse(userInfo);
    this.productService.getAllCartItems(parsedUserInfo.id).subscribe((result: cart[]) => {
      this.cartData = result;
      console.log(this.cartData);
    });

    let orderObj={
      email: data.email,
      address: data.address,
      contactNumber: data.mobile_number,
      totalAmount: this.netAmount,
      userID: parsedUserInfo.id,
      orderedAt: new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(),
      id: this.cartData && this.cartData[0].id
    }

    delete orderObj.id;

    
    this.productService.postOrder(orderObj);
    
    this.cartData?.forEach((item) => {
      setTimeout(() => {
        item.id && this.productService.deleteCartItems(item.id);
      }, 600);
    });

    this.isOrderPlaced=true;

    setTimeout(() => {
      this.isOrderPlaced=false;
    }, 2000);
  }
}
