import { Component } from "../core/component";
import httpClient, { ProductOption } from "../service/http-client";
import { ProductDetail } from "../components/product-detail";
import { SelectedOption } from "../components/selected-options";

export class ProductDetailPage extends Component {
  override setup(): void {
    this.state = {
      productDetail: null,
      selectedOptions: [],
    };

    httpClient
      .getProductDetail(this.props!["productId"])
      .then((productDetail) => {
        this.setState({ ...this.state, productDetail });
      });
  }

  override mounted(): void {
    const $productDetail = this.target.querySelector(
      ".product-detail-page"
    )! as HTMLDivElement;

    new ProductDetail($productDetail, {
      state: this.state,
      selectOption: (options: SelectedOption[]) => this.selectOption(options),
    });
  }

  override template(): string {
    return `<div class="product-detail-page"></div>`;
  }

  get selectedOptions(): ProductOption[] {
    const { selectedOptions } = this.state;
    return selectedOptions || [];
  }

  selectOption(options: SelectedOption[]): void {
    this.setState({ ...this.state, selectedOptions: options });
  }
}
