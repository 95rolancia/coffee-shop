import { BaseComponent, Component, Composable } from "../core/component";

type onClickListener = () => void;

interface ClickContainer extends Component, Composable {
  setOnClickListener(listener: onClickListener): void;
}

export class Product
  extends BaseComponent<HTMLElement>
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

  addChild(child: Component): void {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnClickListener(listener: onClickListener): void {
    this.clickListener = listener;
  }
}
