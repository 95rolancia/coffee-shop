import { BaseComponent, Component } from "../core/component";

type onClickListener = () => void;

interface ClickContainer extends Component {
  setOnClickListener(listener: onClickListener): void;
}

export class Product
  extends BaseComponent<HTMLLIElement>
  implements ClickContainer
{
  private clickListener?: onClickListener;
  constructor(id: string, name: string, imageUrl: string, price: string) {
    super(`<li class="product">
              <img class="product__img">
              <div class="product__info">
                <div class="product__name"></div>
                <div class="product__price"></div>
              </div>
           </li>`);

    this.element.dataset["id"] = id;

    const imageElement = this.element.querySelector(
      ".product__img"
    )! as HTMLImageElement;
    imageElement.src = imageUrl;

    const nameElement = this.element.querySelector(
      ".product__name"
    )! as HTMLHeadingElement;
    nameElement.textContent = name;

    const priceElement = this.element.querySelector(
      ".product__price"
    )! as HTMLDivElement;
    priceElement.textContent = `${price}~`;

    this.element.addEventListener("click", () => {
      this.clickListener && this.clickListener();
    });
  }

  setOnClickListener(listener: onClickListener): void {
    this.clickListener = listener;
  }
}
