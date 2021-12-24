import { Component } from "../core/component";
import { ProductDetail } from "./product-detail";

export type SelectedOption = {
  productId: number;
  optionId: number;
  optionName: string;
  optionPrice: number;
  quantity: number;
};

type SelectedOptionsProps = {
  state: { product: ProductDetail; selectedOptions: SelectedOption[] };
};

export class SelectedOptions extends Component {
  override setup(): void {
    const {
      state: { product, selectedOptions },
    } = this.props as SelectedOptionsProps;

    this.state = {
      product,
      selectedOptions,
    };
  }

  override template(): string {
    const { product, selectedOptions } = this.state;
    console.log(this.state);

    if (product && selectedOptions.length > 0) {
      return `<h3>선택된 상품</h3>
              <ul>
                ${selectedOptions
                  .map(
                    (selectedOption: SelectedOption) =>
                      `
                  <li>
                    ${selectedOption.optionName} ${
                        product.price + selectedOption.optionPrice
                      }원
                    <input type="text" data-optionId="${
                      selectedOption.optionId
                    }" value="${selectedOption.quantity}">
                  </li>
                `
                  )
                  .join("")}
              </ul>
              <div class="product-detail__total-price">${this.getTotalPrice()}원</div>
              <button class="order-button">주문하기</button>`;
    }
    return "<div></div>";
  }

  getTotalPrice(): number {
    const {
      product: { price: productPrice },
      selectedOptions,
    } = this.state;

    return selectedOptions.reduce(
      (acc: number, option: SelectedOption) =>
        acc + (productPrice + option.optionPrice) * option.quantity,
      0
    );
  }
}
