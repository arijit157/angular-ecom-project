import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';
import { Router } from '@angular/router';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  // productList: undefined | product[];

  productList: Array<product> | undefined = [];   //this statement is same as above

  deleteProductMessage: string | undefined;

  icon=faTrash;
  updateIcon=faPenToSquare;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.showProducts();
  }

  deleteProduct(productID: number) {
    this.productService.deleteProduct(productID).subscribe((result) => {
      console.log(result);
      console.log(`Product ${productID} deleted!`);
      this.deleteProductMessage = `Product ${productID} deleted!`;
      this.showProducts();
    });

    setTimeout(() => {
      this.deleteProductMessage = undefined;
    }, 3000);
  }

  showProducts() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
      console.log(this.productList);
    });
  }
}
