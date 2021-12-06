import { BaseComponent } from "../core/component";
import { ProductList } from "../components/product-list";

export class ProductListPage extends BaseComponent<HTMLDivElement> {
  constructor() {
    super(`<div class="product-list-page"></div>`);
    const productList = new ProductList();
    productList.attachTo(this.element);
  }
}
