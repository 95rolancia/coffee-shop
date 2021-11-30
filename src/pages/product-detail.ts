import { BaseComponent } from "../core/component";

export class ProductDetailPage extends BaseComponent<HTMLDivElement> {
  constructor() {
    super(`<div class="product-detail-page">
            상세 정보
          </div>`);
  }
}
