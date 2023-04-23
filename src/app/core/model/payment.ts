import { Invoice } from "./invoice";
import { PaymentMethod } from "./payment-method";

export class Payment {

  constructor(
    public id: number,
    public amount: number,
    public paymentDate: Date,
    public invoice: Invoice,
    public paymentMethod: PaymentMethod
  ){}

}