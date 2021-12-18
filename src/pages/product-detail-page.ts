import { ProductDetail } from "../components/product-detail";
import { Component } from "../core/component";
import httpClient from "../service/http-client";

export class ProductDetailPage extends Component {
  override setup(): void {
    console.log("product detail page setup");
    this.state = {
      productDetail: null,
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

    new ProductDetail($productDetail, { state: this.state });
  }

  override template(): string {
    return `<div class="product-detail-page"></div>`;
  }
}
