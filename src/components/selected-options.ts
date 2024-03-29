import { Component } from "../core/component";
import { routeChange } from "../routes/router";
import { ProductOption } from "../service/http-client";
import { getItem, setItem } from "../util/storage";
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

  override setEvent(): void {
    this.addEvent(
      "change",
      ".product-detail__selected-options",
      ({ target }) => {
        if (target.tagName === "INPUT") {
          try {
            const nextQuantity = parseInt(target.value);
            const nextSelectedOptions = [...this.state["selectedOptions"]];

            if (typeof nextQuantity === "number") {
              const { product } = this.state;

              const optionId = parseInt(target.dataset.optionid);
              const option = product.productOptions.find(
                (option: ProductOption) => option.id === optionId
              );

              const selectedOptionIndex = nextSelectedOptions.findIndex(
                (selectedOption) => selectedOption.optionId === optionId
              );

              nextSelectedOptions[selectedOptionIndex].quantity =
                option.stock >= nextQuantity ? nextQuantity : option.stock;

              this.setState({
                ...this.state,
                selectedOptions: nextSelectedOptions,
              });
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    );

    this.addEvent(
      "click",
      ".product-detail__selected-options",
      ({ target }) => {
        const { selectedOptions } = this.state;

        if (target.className === "order-button") {
          const cartData = getItem("products-cart", []);
          setItem(
            "products-cart",
            cartData.concat(
              selectedOptions.map((selectedOption: SelectedOption) => ({
                productId: selectedOption.productId,
                optionId: selectedOption.optionId,
                quantity: selectedOption.quantity,
              }))
            )
          );
          routeChange("/cart");
        }
      }
    );
  }
}
