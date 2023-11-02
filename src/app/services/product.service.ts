import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../dataType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }

  cartData = new EventEmitter<product[] | []>();
  dbCartData = new EventEmitter<cart[] | []>();

  addProduct(product: product) {
    return this.http.post("http://localhost:3000/products", product, { observe: "response" }).subscribe((result) => {
      console.log(result.body);
    });
  }

  productList() {
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(productID: number) {
    return this.http.delete(`http://localhost:3000/products/${productID}`);
  }

  getProduct(productID: number) {
    return this.http.get<product>(`http://localhost:3000/products/${productID}`);
  }

  updateProduct(productID: number, productInfo: product) {
    return this.http.put(`http://localhost:3000/products/${productID}`, productInfo);
  }

  popularProducts(limit: number) {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=${limit}`);
  }

  searchedProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  addToCartLocalStorageService(productInfo: product) {
    let cartData: product[] = [];
    let product = localStorage.getItem("product");
    if (!product) {
      localStorage.setItem("product", JSON.stringify([productInfo]));
    }
    else {
      cartData = JSON.parse(product);
      cartData.push(productInfo);
      localStorage.setItem("product", JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  addToCartDBService(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData, { observe: "response" }).subscribe((result) => {
      console.log(result);

      // let cartData: cart[] | undefined;
      // let user = localStorage.getItem("user");
      // let parsedUserInfo = user && JSON.parse(user);
      // this.getAllCartItems(parsedUserInfo.id).subscribe((result: cart[]) => {
      //   cartData = result;
      //   console.warn(cartData);
      // });
      // this.dbCartData.emit(cartData);
    }
    );
  }

  removeFromCartLocalStorageService(productID: number) {
    let cartData = localStorage.getItem("product");
    if (cartData) {
      let parsedCartData = JSON.parse(cartData);
      let afterRemove = parsedCartData.filter((item: product) => item.id != productID);
      localStorage.setItem("product", JSON.stringify(afterRemove));
      this.cartData.emit(afterRemove);
      console.log(`Item ${productID} removed from cart!`);
    }
  }

  removeFromCartDBService(cartID: number | undefined) {
    return this.http.delete(`http://localhost:3000/cart/${cartID}`).subscribe((result) => console.warn(`cart item: ${cartID} deleted successfully!`));
  }

  getAllCartItems(userID: number) {
    return this.http.get<cart[]>(`http://localhost:3000/cart?userID=${userID}`);
  }

  postOrder(data: order){
    return this.http.post("http://localhost:3000/orders", data, {observe: "response"}).subscribe(result => {
      console.log(result);
      // this.router.navigate(['/my-orders']);
    });
  }

  listOrder(){
    let userInfo=localStorage.getItem("user");
    let parsedUserInfo=userInfo && JSON.parse(userInfo);
    return this.http.get<order[]>(`http://localhost:3000/orders?userID=${parsedUserInfo.id}`);
  }

  deleteCartItems(cartID: number){
    return this.http.delete(`http://localhost:3000/cart/${cartID}`, {observe: "response"}).subscribe((result) => {
      if(result){
        this.cartData.emit([]);
      }
    });
  }

  deleteOrder(orderID: number){
    return this.http.delete(`http://localhost:3000/orders/${orderID}`, {observe: "response"}).subscribe((result) => {
      console.warn("Order canceled successfully!");
    });
  }
}
