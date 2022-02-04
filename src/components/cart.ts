import { Component } from "../core/component";
import { numberCommaFormat } from "../util/util";
import { removeItem } from "../util/storage";
import { routeChange } from "../routes/router";

type Product = {
  imageUrl: string;
  productName: string;
  quantity: number;
  productPrice: number;
  optionName: string;
  optionPrice: number;
};

type CartProps = {
  state: {
    products: Product[];
  };
};

export class Cart extends Component {
  override setup(): void {
    const {
      state: { products },
    } = this.props as CartProps;

    this.state = {
      products,
    };
  }

  override template(): string {
    const { products } = this.state;

    if (products == null) {
      return "";
    }

    return `<div class="cart">
    <ul>
        ${this.state["products"]
          .map(
            (product: Product) => `
            <li class="cart__item">
                <img src="${product.imageUrl}">
                <div class="cart__item__desc">
                    <div>${product.productName} ${product.optionName} ${
              product.quantity
            }개</div>
                    <div>${product.productPrice + product.optionPrice}원</div>
                </div>
            </li>
        `
          )
          .join("")}
    </ul>
    <div class="cart__total-price">
      총 상품 가격 ${numberCommaFormat(this.getTotalPrice().toString())}원
    </div>
    <button class="order-button">주문하기</button></div>
       `;
  }

  override setEvent(): void {
    this.addEvent("click", ".order-button", () => {
      alert("주문 되었습니다.");
      removeItem("products-cart");
      routeChange("/");
    });
  }

  getTotalPrice(): number {
    return this.state["products"].reduce(
      (acc: number, option: Product) =>
        acc + (option.productPrice + option.optionPrice) * option.quantity,
      0
    );
  }
}
