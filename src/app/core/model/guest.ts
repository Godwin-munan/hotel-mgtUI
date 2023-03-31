import { Gender } from "./gender";
import { Room } from "./room";

export interface Guest {
  id: number,
  firstName: string,
  lastName: string,
  deleted: boolean,
  email: string,
  guestCode: string,
  checkIn: Date,
  expireDate: Date,
  checkOut: Date,
  gender: Gender,
  rooms: Room[]
}