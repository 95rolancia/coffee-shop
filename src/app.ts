import { Component, Composable } from './core/component';
import { ProductListPage } from './pages/product-list';
import { HttpClient, HttpClientImpl } from './service/http-client';
import { IMAGE_DOMAIN_ENDPOINT } from './config/config';
import { Product } from './components/product';
import './styles.css';

class App {
  productListPage: Component & Composable;
  constructor(private readonly root: HTMLDivElement, private readonly httpClient: HttpClient) {
    this.productListPage = new ProductListPage();
    this.productListPage.attachTo(this.root);

    this.httpClient.getProducts().then((products) => {
      products.forEach((product) => {
        const { id, name, imageUrl, price } = product;
        this.productListPage.addChild(new Product(id, name, imageUrl, price));
      });
    });
  }
}

new App(
  document.querySelector('#root')! as HTMLDivElement,
  new HttpClientImpl(IMAGE_DOMAIN_ENDPOINT)
);
