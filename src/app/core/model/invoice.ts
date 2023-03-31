import { Guest } from "./guest";

export interface Invoice {

  id: number,
  lateCharges: number,
  invoiceCode: string,
  invoiceTotal: number,
  paymentTotal: number,
  guest: Guest
}