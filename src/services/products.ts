import { Injectable, signal } from '@angular/core';
import productsJson from '../../products.json'

interface IProduct {
  id: number
  name: string
  price: number
  description: string
  category: string
  photo: string
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Products {
  private products = signal<IProduct[]>(
    productsJson.map(product => ({
      ...product,
      quantity: 0 // Adiciona a propriedade quantity
    }))
  );

  getProducts() {
    return this.products();
  } 
}
