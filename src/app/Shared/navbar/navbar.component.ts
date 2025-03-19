// navbar.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DarkModeService } from '../../Service/dark-mode.service.ts.js'; 
import { AuthService } from '../../Service/auth.service.js';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../Service/Cart.service.js';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../Models/Cart.model.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule,FormsModule,RouterModule],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,  AfterViewInit {

  isLoggedIn :boolean
  @ViewChild('cartDropdownButton') cartDropdownButton: ElementRef | undefined;
  ImagePath!:string
  
  cartItems: Cart[] = [];


  constructor(
    public darkMode: DarkModeService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private cd :ChangeDetectorRef
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }



    ngOnInit(): void {
       const BaseURlImages='http://localhost:5179/'
      // Subscribe to user state to update login status
      this.authService.user$.subscribe((user) => {
        this.isLoggedIn = !!user; // True if user exists, false otherwise
        this.ImagePath=user.pathURL
        if(user.pathURL!=null){
          this.ImagePath=BaseURlImages+user.pathURL
        }  
      });
      
      // Initialize login state on app load
      this.isLoggedIn = this.authService.isLoggedIn();

      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
        // Force UI update if needed
      });


    }

// Helper function to check if the current route is the cart or MyOrders page
// get isCartPage(): boolean {
//   return ['/cart', '/MyOrders'].includes(this.router.url);
// }



get isCartPage(): boolean {
  return this.router.url =='/cart'
}
    
   removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }


  

  
    toggleDarkMode() {
      this.darkMode.toggleDarkMode();
    }
  
    ngAfterViewInit(): void {
      if (this.cartDropdownButton && (window as any).Flowbite) {
        new (window as any).Dropdown(this.cartDropdownButton.nativeElement);
      }
    }
  isCartDropdownOpen = false;
 

  toggleCartDropdown(): void {
    console.log("asas")
    this.isCartDropdownOpen = !this.isCartDropdownOpen;
    this.cd.detectChanges();

  }

  
  Logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;  // Update the logged-in status after logout
    this.router.navigate([this.router.url]);
  }





}
