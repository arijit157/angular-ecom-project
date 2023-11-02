import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../dataType';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})

export class SellerUpdateProductComponent {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  productInfo: product | undefined;

  productUpdateMessage: string | undefined;

  ngOnInit(): void {
    let productId: number = Number(this.route.snapshot.paramMap.get("id"));   //fetching the product ID value from url
    productId && this.productService.getProduct(productId).subscribe((result) => this.productInfo = result);
  }

  handleUpdateProducts(data: product) {
    let productId: number = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.updateProduct(productId, data).subscribe((result)=>console.log(result)
    )

    this.productUpdateMessage="Product updated successfully!";

    setTimeout(() => {
      this.productUpdateMessage=undefined;
    }, 3000);
  }
}
