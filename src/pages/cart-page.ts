import { routeChange } from "./../routes/router";
import { Component } from "../core/component";
import { getItem } from "../util/storage";
import httpClient from "../service/http-client";
import { Cart } from "../components/cart";

type CartItem = {
  productId: string;
  optionId: number;
  quantity: number;
};

export default class CartPage extends Component {
  override setup(): void {
    this.state = {
      products: null,
    };

    const cartData = getItem("products-cart", []);

    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      routeChange("/");
    } else {
      this.fetchProducts(cartData);
    }
  }

  override template(): string {
    return `<div class="cart-page"></div>`;
  }

  override mounted(): void {
    const $cartPage = this.target.querySelector(
      ".cart-page"
    )! as HTMLDivElement;

    new Cart($cartPage, { state: this.state });
  }

  async fetchProducts(cartData: CartItem[]): Promise<void> {
    const products = await Promise.all(
      cartData.map(async (cartItem: CartItem) => {
        const product = await httpClient.getProductDetail(cartItem.productId);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption!.name,
          optionPrice: selectedOption!.price,
        };
      })
    );

    this.setState({
      products,
    });
  }
}
