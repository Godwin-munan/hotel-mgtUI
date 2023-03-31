import { Gender } from "./gender";
import { idCard } from "./id-card";
import { Job } from "./job";
import { Shift } from "./shift";

export interface Staff {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  cardNo: string,
  joinDate: Date,
  leaveDate: Date,
  card: idCard,
  gender: Gender,
  shift: Shift,
  job: Job
}