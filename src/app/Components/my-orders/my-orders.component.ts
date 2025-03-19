import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { invoiceH } from '../../Models/InvoiceH.model';
import { InvoiceService } from '../../Service/Invoice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [FormsModule,CommonModule,NgxPaginationModule,RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  invoices: invoiceH[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  statusFilter = '';
  durationFilter = '';
  expandedInvoiceId: number | null = null;

  constructor(private invoiceService: InvoiceService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadInvoicesPages();
  }

  toggleInvoiceDetails(invoiceId: number) {
    this.expandedInvoiceId = this.expandedInvoiceId === invoiceId ? null : invoiceId;
  }
  loadInvoices(): void {
    this.invoiceService.getInvoicesHD().subscribe({
      next: (data) => {
        console.log(data)
        this.invoices = data;
        this.totalItems = data.length;
      },
      error: (error) => console.error('Error loading invoices:', error)
    });
  }

  loadInvoicesPages(): void {
    this.invoiceService.getInvoicesHDPages(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        console.log(response);  // Response will have totalCount and data
        this.invoices = response.data;  // Assign the data part
        this.totalItems = response.totalCount;  // Assign the totalCount part
      },
      error: (error) => console.error('Error loading invoices:', error)
    });
  }
  calculateTotal(invoice: invoiceH): number {
    return invoice.invoiceDetails.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }

  getStatusClass(status?: number): string {
    switch (status) {
      case 0: return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300';
      case 1: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 2: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 3: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }

  getStatusText(status?: number): string {
    switch (status) {
      case 0: return 'Pre-order';
      case 1: return 'In transit';
      case 2: return 'Confirmed';
      case 3: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadInvoicesPages();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadInvoicesPages();
      // Trigger change detection manually
  this.cd.detectChanges();

  }
}