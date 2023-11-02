import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../dataType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  productArr: Array<product> | undefined;
  message: string | undefined;

  ngOnInit(): void {
    let searchedItem = this.route.snapshot.paramMap.get("query");
    console.log(searchedItem);
    if (searchedItem != null) {
      this.productService.searchedProducts(searchedItem).subscribe((result) => {
        this.productArr = result;
        if(this.productArr.length==0){
          this.message="No item found"
        }
        console.warn(this.productArr);
      });
    }
  }

}
