export class StaffDto {

  firstName!: string;
  lastName!: string;
  email!: string;
  cardNo!: string;
  cardId!: number;
  employDate!: Date;
  terminateDate!: Date;
  genderId!: number;
  shiftId!: number;
  jobId!: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    cardNo: string,
    cardId: number,
    employDate: Date,
    terminateDate: Date,
    genderId: number,
    shiftId: number,
    jobId: number,
     ){
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.cardNo = cardNo;
      this.cardId = cardId;
      this.employDate = employDate;
      this.terminateDate = terminateDate;
      this.genderId = genderId;
      this.shiftId = shiftId;
      this.jobId = jobId
     }
}