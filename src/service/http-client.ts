export type ProductInfo = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
};

const products: ProductInfo[] = [
  {
    id: "1",
    name: "커피 컵",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/cafe_coffee_cup.png?raw=true",
    price: "10000",
  },
  {
    id: "2",
    name: "커피컵 종이홀더",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/coffee_cup_paper_sleeve.png?raw=true",
    price: "1000",
  },
  {
    id: "3",
    name: "커피 머신",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/coffee_self_service.png?raw=true",
    price: "500000",
  },
  {
    id: "4",
    name: "우유 거품기",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/cooking_milk_foamer.png?raw=true",
    price: "20000",
  },
  {
    id: "5",
    name: "우유용 컵",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/drink_cafe_milk_jag.png?raw=true",
    price: "10000",
  },
  {
    id: "6",
    name: "그렙 커피",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/drink_petbottle_coffee.png?raw=true",
    price: "3000",
  },
  {
    id: "7",
    name: "에스프레소 메이커",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/espresso_maker.png?raw=true",
    price: "50000",
  },
  {
    id: "8",
    name: "샌드위치",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/food_sandwitch.png?raw=true",
    price: "10000",
  },
  {
    id: "9",
    name: "티 메이커",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/press_tea_maker.png?raw=true",
    price: "35000",
  },
  {
    id: "10",
    name: "각설탕 묶음",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/sugar_kakuzatou.png?raw=true",
    price: "500",
  },
  {
    id: "11",
    name: "커피 시럽",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/sweets_milk_cream.png?raw=true",
    price: "500",
  },
  {
    id: "12",
    name: "에스프레소 머신",
    imageUrl:
      "https://github.com/95rolancia/coffee-shop/blob/main/images/espresso_maker_2.png?raw=true",
    price: "300000",
  },
];

export interface HttpClient {
  getProducts: () => Promise<ProductInfo[]>;
}

export class HttpClientImpl implements HttpClient {
  constructor(private readonly url: string) {}
  getProducts(): Promise<ProductInfo[]> {
    return new Promise<ProductInfo[]>((resolve) => {
      resolve(products);
    });
  }
}
