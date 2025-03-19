import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../Models/Product.model';
import { ProductService } from '../../Service/product.service';
import { CartService } from '../../Service/Cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  @ViewChild('errorModal') errorModal!: ElementRef;
  products: Product[] = [];
  BaseURlImages="http://localhost:5179/"

  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
  addToCart(product: Product) {
    const added = this.cartService.addToCart(product);
    if (!added) {
      this.showErrorModal();
    }
  }

  showErrorModal() {
    const modal = this.errorModal.nativeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  hideErrorModal() {
    const modal = this.errorModal.nativeElement;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }


  
}


