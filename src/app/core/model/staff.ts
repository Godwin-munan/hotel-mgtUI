import { Gender } from "./gender";
import { IdCard } from "./id-card";
import { Job } from "./job";
import { Shift } from "./shift";

export interface Staff {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  cardNo: string,
  employDate: Date,
  terminateDate: Date,
  card: IdCard,
  gender: Gender,
  shift: Shift,
  job: Job
}