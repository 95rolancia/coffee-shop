import { Component } from "../core/component";
import { ProductList } from "../components/product-list";

import httpClient from "../service/http-client";

export class ProductListPage extends Component {
  override setup(): void {
    this.state = {
      products: [],
    };

    httpClient.getProducts().then((products) => {
      this.setState({ products });
    });
  }

  override template(): string {
    return `<div class="product-list-page"></div>`;
  }

  override mounted(): void {
    const $productList = this.target.querySelector(
      ".product-list-page"
    )! as HTMLDivElement;

    new ProductList($productList, { state: this.state });
  }
}
