import { BaseComponent, Composable } from "../core/component";
import { Product } from "./product";
import httpClient from "../service/http-client";
import { routeChange } from "../routes/router";

export class ProductList
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class="product-list"></ul>`);

    httpClient.getProducts().then((products) => {
      products.forEach((product) => {
        const { id, name, imageUrl, price } = product;
        this.addChild(new Product(id, name, imageUrl, price));
      });
    });
  }

  addChild(pageItem: Product): void {
    pageItem.attachTo(
      this.element.parentElement!.querySelector(".product-list")!
    );
    pageItem.setOnClickListener(() => {
      const productId = pageItem.element.dataset["id"];
      if (productId) {
        routeChange(`/products/${productId}`);
      }
    });
  }
}
