import { Component } from "../core/component";
import { ProductOption } from "./../service/http-client";
import { SelectedOption, SelectedOptions } from "./selected-options";
import { numberCommaFormat } from "../util/util";

type ProductDetailProps = {
  state: {
    productDetail: ProductDetail;
    selectedOptions: SelectedOption[];
  };
};

export class ProductDetail extends Component {
  override setup(): void {
    const {
      state: { productDetail, selectedOptions },
    } = this.props as ProductDetailProps;

    this.state = {
      product: productDetail,
      selectedOptions,
    };
  }

  override template(): string {
    const { product } = this.state;

    if (product == null) {
      return "";
    }

    return `
        <div class="product-detail">
          <img src="${product.imageUrl}">
          <div class="product-detail__info">
            <h2>${product.name}</h2>
            <div class="product-detail__price">${numberCommaFormat(
              product.price
            )}원~</div>
            <select class="option-select">
              <option>선택하세요.</option>
              ${product.productOptions
                .map(
                  (option: ProductOption) =>
                    `<option value="${option.id}" ${
                      option.stock === 0 ? "disabled" : ""
                    }>
                    ${option.stock === 0 ? "(품절)" : ""}${product.name} ${
                      option.name
                    } ${option.price > 0 ? `(+${option.price}원)` : ""}
                  </option>`
                )
                .join("")}
            </select>
          <div class="product-detail__selected-options"></div>
        </div>`;
  }

  override mounted(): void {
    const $selectedOptions = this.target.querySelector(
      ".product-detail__selected-options"
    )! as HTMLDivElement;

    if ($selectedOptions == null) return;

    new SelectedOptions($selectedOptions, {
      state: this.state,
    });
  }

  override setEvent(): void {
    this.addEvent("change", ".product-detail", ({ target }) => {
      if (target.tagName === "SELECT") {
        const selectedOptionId = parseInt(target.value);

        const { product, selectedOptions } = this.state;

        const option = product.productOptions.find(
          (option: ProductOption) => option.id === selectedOptionId
        );

        const selectedOption = (selectedOptions || []).find(
          (selectedOption: SelectedOption) =>
            selectedOption.optionId === selectedOptionId
        );

        if (option && !selectedOption) {
          const nextSelectedOptions = [
            ...selectedOptions,
            {
              productId: product.id,
              optionId: option.id,
              optionName: option.name,
              optionPrice: option.price,
              quantity: 1,
            },
          ];

          this.props!["selectOption"](nextSelectedOptions);
        }
      }
    });
  }
}
