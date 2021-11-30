import { init } from "./routes/router";
import CartPage from "./pages/cart";
import { ProductDetailPage } from "./pages/product-detail";
import { ProductListPage } from "./pages/product-list";
import "./styles.css";

export default class App {
  constructor(private readonly root: HTMLDivElement) {
    init(() => this.route());
    this.route();
    window.addEventListener("popstate", this.route);
  }

  route(): void {
    const { pathname } = location;

    this.root.innerHTML = "";

    if (pathname === "/") {
      const productListPage = new ProductListPage();
      productListPage.attachTo(this.root);
    } else if (pathname.indexOf("/products/") === 0) {
      const productDetailPage = new ProductDetailPage();
      productDetailPage.attachTo(this.root);
    } else if (pathname === "/cart") {
      const cartPage = new CartPage();
      cartPage.attachTo(this.root);
    } else {
      console.log("not found");
    }
  }
}
