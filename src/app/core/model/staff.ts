import { Gender } from "./gender";
import { IdCard } from "./id-card";
import { Job } from "./job";
import { Shift } from "./shift";

export class Staff {
 
  

  

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public cardNo: string,
    public employDate: Date,
    public terminateDate: Date,
    public card: IdCard,
    public gender: Gender,
    public shift: Shift,
    public job: Job
  ){

  }
}