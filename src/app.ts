import { init, routeChange } from "./routes/router";
import { ProductListPage } from "./pages/product-list-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import CartPage from "./pages/cart-page";
import "./styles.css";

export default class App {
  constructor(readonly root: HTMLDivElement) {
    init(() => this.route());
    this.route();
    window.addEventListener("popstate", this.route);
  }

  route(): void {
    const { pathname } = location;
    this.root.innerHTML = "";

    console.log("routing");
    if (pathname === "/") {
      new ProductListPage(this.root);
    } else if (pathname.indexOf("/products/") === 0) {
      const [, , productId] = pathname.split("/");
      if (productId == null) {
        routeChange(`/`);
        return;
      }
      new ProductDetailPage(this.root, { productId });
    } else if (pathname === "/cart") {
      new CartPage(this.root);
    } else {
      console.log("not found");
    }
  }
}
