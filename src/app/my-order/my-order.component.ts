import { Component } from '@angular/core';
import { order } from '../dataType';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  orderData: order[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    this.productService.listOrder().subscribe((result) => {
      this.orderData=result;
      console.log(this.orderData);
    });
  }

  cancelOrder(orderID: number | undefined){
    orderID && this.productService.deleteOrder(orderID);

    this.productService.listOrder().subscribe((result) => {
      this.orderData=result;
      console.log(this.orderData);
    });
  }
}
