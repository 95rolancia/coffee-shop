import { Component } from "../core/component";
import { ProductList } from "../components/product-list";
import httpClient from "../service/http-client";

export class ProductListPage extends Component {
  override setup(): void {
    console.log("page setup");
    this.state = {
      products: [],
    };

    httpClient.getProducts().then((products) => {
      this.setState({ products });
    });
  }

  override template(): string {
    console.log("page template");
    return `<div class="product-list-page"></div>`;
  }

  override mounted(): void {
    console.log("page mounted");
    console.log(this.state);
    const $productList = this.target.querySelector(
      ".product-list-page"
    )! as HTMLDivElement;

    new ProductList($productList, { state: this.state });
  }
}
