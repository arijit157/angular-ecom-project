import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts: Array<product> | undefined;

  products: Array<product> | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void{
    this.productService.popularProducts(3).subscribe((result)=>{
      this.popularProducts=result;
      console.log(this.popularProducts);
    });

    this.productService.productList().subscribe((result)=>{
      this.products=result;
      console.log("Products: ", this.products);
    });
  }
}
