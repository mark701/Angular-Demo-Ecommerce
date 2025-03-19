import { InvoiceD } from "./InvoiceD.model";

export interface invoiceH{
    invoiceHId: number;
    invoiceName?: string;
    status?: number;
    createDateAndTime? : Date;
    userId?: number;
    totalAmount?:number;
    invoiceDetails: InvoiceD[];
  }
