import { BaseComponent } from "../core/component";
import { ProductDetailType, ProductOption } from "../service/http-client";

type State = {
  product: ProductDetailType;
  selectedOptions: ProductOption[];
};

export class SelectedOptions extends BaseComponent<HTMLDivElement> {
  prop: State;
  constructor({
    product,
    selectedOptions,
  }: {
    product: ProductDetailType;
    selectedOptions: ProductOption[];
  }) {
    super(`<div class="product-detail__selected-options"></div>`);

    this.prop = { product, selectedOptions };
    this.render();
  }

  getTotalPrice(): number {
    const { price: productPrice } = this.product;

    return this.selectedOptions.reduce(
      (acc, option) => acc + (productPrice + option.price) * option.stock,
      0
    );
  }

  setState(nextState: State): void {
    this.state = nextState;
    this.render();
  }

  render(): void {
    if (this.product && this.selectedOptions) {
      this.element.innerHTML = ` <h3>선택된 상품</h3>
      <ul>
        ${this.selectedOptions
          .map(
            (selectedOption) => `
          <li>
            ${selectedOption.name} ${
              this.product.price + selectedOption.price
            }원
            <input type="text" data-optionId="${selectedOption.id}" value="${
              selectedOption.stock
            }">
          </li>
        `
          )
          .join("")}
      </ul>
      <div class="product-detail__total-price">${this.getTotalPrice()}원</div>`;
    }
  }
}
