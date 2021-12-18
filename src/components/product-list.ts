import { routeChange } from "./../routes/router";
import { Component } from "../core/component";
import { ProductInfo } from "../service/http-client";

export class ProductList extends Component {
  override template(): string {
    const { products } = this.props.state;

    return `<ul>
        ${products
          .map(
            (product: ProductInfo) =>
              `
                <li class="product" data-product-id="${product.id}">
                    <img src="${product.imageUrl}">
                    <div class="product__info">
                        <div>${product.name}</div>
                        <div>${product.price}~</div>
                    </div>
                </li>
            `
          )
          .join("")}
          </ul>`;
  }

  override setEvent(): void {
    this.addEvent("click", ".product", ({ target }) => {
      const realTarget = target.closest(".product")! as HTMLLIElement;
      const { productId } = realTarget.dataset;

      console.log(productId);

      if (productId) {
        routeChange(`/products/${productId}`);
      }
    });
  }
}
