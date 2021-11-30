import { BaseComponent, Composable } from "../core/component";
import { Product } from "../components/product";
import httpClient from "../service/http-client";
import { routeChange } from "../routes/router";

export class ProductListPage
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<div class="product-list-page">
            <ul class="product-list"></ul>
          </div>`);

    httpClient.getProducts().then((products) => {
      products.forEach((product) => {
        const { id, name, imageUrl, price } = product;
        this.addChild(new Product(id, name, imageUrl, price));
      });
    });
  }

  addChild(pageItem: Product): void {
    pageItem.attachTo(this.element.querySelector(".product-list")!);
    pageItem.setOnClickListener(() => {
      const productId = pageItem.element.dataset["id"];
      if (productId) {
        routeChange(`/products/${productId}`);
      }
    });
  }
}
