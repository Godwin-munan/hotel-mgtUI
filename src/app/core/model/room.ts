import { RoomType } from "./room-type";

export interface Room {
  id: number,
  code: string,
  status: string,
  roomType: RoomType
}