import { ProductOption } from "./../service/http-client";
import { Component } from "../core/component";

export class ProductDetail extends Component {
  override template(): string {
    const { productDetail: product } = this.props.state;
    return `
        <div class="product-detail">
               <img src="${product.imageUrl}">
               <div class="product-detail__info">
                 <h2>${product.name}</h2>
                 <div class="product-detail__price">${product.price}원~</div>
                 <select>
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
             </div>`;
  }
}
