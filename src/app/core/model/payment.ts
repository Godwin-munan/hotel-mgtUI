import { Invoice } from "./invoice";
import { PaymentMethod } from "./payment-method";

export interface Payment {
  id: number,
  amount: number,
  paymentDate: Date,
  invoice: Invoice,
  paymentMethod: PaymentMethod
}