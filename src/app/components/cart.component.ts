import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private productService = inject(Products);

  protected products = this.productService.getProducts();

  protected filteredProducts = signal(this.products);

  protected paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    // ...complete sua lógica aqui...
    return this.filteredProducts().slice(startIndex, startIndex + this.itemsPerPage);
  });

  private itemsPerPage = 25;

  private totalItems = computed(() => this.filteredProducts().length);

  protected totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage));

  protected filterText = signal('');

  protected arrayOfPages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  protected currentPage = signal(1);

  protected goToPage(page: number) {
    this.currentPage.set(page);
  }

  protected addFilter(value: string) {
    this.filterText.set(value);
    this.filteredProducts.set(
      this.products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    this.currentPage.set(1);
  }
}