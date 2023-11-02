import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../dataType';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  productData: undefined | product;
  cartData: cart[] | undefined;
  quantity: number | undefined = 1;
  isDisabled: boolean = true;
  showRemoveFromCartText: boolean = false;

  ngOnInit(): void {
    let productID = this.route.snapshot.paramMap.get("id");

    if (productID) {
      this.productService.getProduct(Number(productID)).subscribe((result) => {
        this.productData = result;
        console.warn(this.productData);
      }
      );
    }

    let user = localStorage.getItem("user");

    if (!user) {
      let cartData = localStorage.getItem("product");

      if (productID && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productID === item.id.toString());
        if (items.length) {
          this.showRemoveFromCartText = true;
        }
      }
    }
    else {
      let parsedUserInfo = JSON.parse(user);
      let userID = parsedUserInfo.id;
      let userProducts: cart[] | undefined;
      this.productService.getAllCartItems(userID).subscribe((result) => {
        userProducts = result;
      });
      setTimeout(() => {
        userProducts = userProducts?.filter((userProduct) => productID === userProduct.productID.toString());
        if (userProducts?.length) {
          this.showRemoveFromCartText = true;
        }
      }, 90);
    }
  }

  incrementQuantity(qty: string) {
    this.quantity = Number(qty) + 1;
    this.isDisabled = false;
  }

  decrementQuantity(qty: string) {
    if (Number(qty) > 1) {
      this.quantity = Number(qty) - 1;
    }

    if (Number(qty) == 1) {
      this.isDisabled = true;
    }
  }

  addToCart() {
    if (this.productData != undefined) {
      this.productData.quantity = this.quantity;
      if (!localStorage.getItem("user")) {
        this.productService.addToCartLocalStorageService(this.productData);
        this.showRemoveFromCartText = true;
      }
      else {
        let userInfo = localStorage.getItem("user");
        if (userInfo) {
          let parsedUserInfo = JSON.parse(userInfo);
          let userID = parsedUserInfo.id;
          const cartInfo: cart = {
            userID: userID,
            name: this.productData.name,
            price: this.productData.price,
            color: this.productData.color,
            category: this.productData.category,
            description: this.productData.description,
            image_url: this.productData.image_url,
            productID: this.productData.id,
            quantity: this.productData.quantity,
            id: this.productData.id
          }
          delete cartInfo.id;
          this.productService.addToCartDBService(cartInfo);
          this.showRemoveFromCartText = true;
        }
      }
    }
  }

  removeFromCart(productID: number) {
    if (!localStorage.getItem("user")) {
      this.productService.removeFromCartLocalStorageService(productID);
      this.showRemoveFromCartText = false;
    }
    else {
      let userInfo = localStorage.getItem("user");
      let cartItemID: number=0;
      if (userInfo) {
        let parsedUserInfo = JSON.parse(userInfo);
        this.productService.getAllCartItems(parsedUserInfo.id).subscribe((result) => {
          //TODO:
          this.cartData=result;
        });
        this.cartData=this.cartData?.filter((item: cart) => item.productID === productID);
        if(this.cartData?.length){
          this.productService.removeFromCartDBService(this.cartData[0].id);
          this.showRemoveFromCartText = false;
        }
      }
    }
  }
}
