import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  productAddMessage: string | undefined;

  constructor(private productService: ProductService) {}

  handleAddProducts(value: product){
    this.productService.addProduct(value);
    this.productAddMessage="Product added successfully!";
    setTimeout(() => {
      this.productAddMessage=undefined;
    }, 3000);
  }
}
