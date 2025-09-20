import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from '../services/products';
import { CartComponent } from './components/cart.component'; // ADICIONE ESTA LINHA

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, CartComponent], // ADICIONE CartComponent AQUI
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  productsService = inject(Products)

  protected products = this.productsService.getProducts()

  constructor(){
    console.log(this.products)
  }
}