import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../Service/Cart.service'; 
import { Cart } from '../../Models/Cart.model'; 
import { CommonModule } from '@angular/common';
import { invoiceH } from '../../Models/InvoiceH.model'; 
import { Router } from '@angular/router';
import { InvoiceService } from '../../Service/Invoice.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('errorModal') errorModal!: ElementRef;

  cartItems: Cart[] = [];
  totalAmount: number = 0;
  InvoiceData: invoiceH | undefined;
  showModal: boolean = false;
  modalMessage: string = '';
  isSuccess: boolean = true; // Flag to determine success or failure

  constructor(private cartService: CartService,private router: Router, private invoiceService:InvoiceService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  // updateQuantity(item: Cart, event: any) {
  //   const newQuantity = parseInt(event.target.value, 10);
  //   if (newQuantity >= 1 ) {
  //     this.cartService.updateQuantity(item.id, newQuantity);
  //     this.loadCart();
  //   }
  // }

  updateQuantity(item: Cart, event: any) {
    const newQuantity = parseInt(event.target.value, 10);
    
    if (isNaN(newQuantity)) return;
  
    if (newQuantity >= 1 && newQuantity <= item.stockQuantity) {
      this.cartService.updateQuantity(item.id, newQuantity);
      this.loadCart();
    } else {
      // Show error message
      this.showErrorModal();
      
      // Reset to valid quantity
      event.target.value = Math.min(item.stockQuantity, Math.max(1, newQuantity));
      this.cartService.updateQuantity(item.id, event.target.value);
      this.loadCart();
    }
  }
  
  MakeOrder(arg0: Cart[]) {



if (!this.cartItems || this.cartItems.length === 0) {
  this.isSuccess = false;
  this.modalMessage = 'Your cart is empty!';
  this.showModal = true;
  return;
}

// Prepare Invoice Data
const invoiceData: invoiceH = {
  invoiceHId: 0, // Assuming the API auto-generates the ID
  // invoiceName: 'New Order', // You can set dynamic values if needed
  invoiceDetails: this.cartItems.map(item => ({ 
    detailId: 0, // Assuming auto-generation by the API
    productID: item.id,
    productName: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
    invoiceHId: 0 // API should handle linking automatically

  }))
};
// Call the API to Save the Invoice
this.invoiceService.SaveInvoice(invoiceData).subscribe({
  next: (response) => {
    this.isSuccess = true;
    this.modalMessage = 'Order Placed Successfully!';
    this.showModal = true;

  },
  error: (err) => {
    console.error('Order failed:', err);
    this.isSuccess = false;
    this.modalMessage = 'Order Failed! Please try again.';
    this.showModal = true;
  }
});

    }
  
    closeModal() {
      this.showModal = false;
      if(this.isSuccess){
        this.router.navigate(['/MyOrders']).then(() => {
          
            this.cartService.clearCart();
            this.cartItems = [];
            // Reload the page to update the navbar
          window.location.reload();
        });

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
