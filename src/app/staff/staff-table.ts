import { Staff } from "core/model/staff";

export interface staffTable {
  content: Staff[],
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  numberOfElements: number,
}
