import { BaseComponent, Composable } from "../core/component";
import { Product } from "../components/product";

export class ProductListPage
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<div class="product-list-page">
            <ul class="product-list"></ul>
          </div>`);
  }

  addChild(pageItem: Product): void {
    pageItem.attachTo(this.element.querySelector(".product-list")!);
    pageItem.setOnClickListener(() => {
      console.log(pageItem);
    });
  }
}
