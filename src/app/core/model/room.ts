import { RoomType } from "./room-type";

export class Room {
  

  constructor(
    public id: number,
    public code: string,
    public status: string,
    public roomType: RoomType
  ){}
}