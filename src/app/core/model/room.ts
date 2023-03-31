import { RoomType } from "./room-type";

export interface Room {
  id: number,
  code: string,
  deleted: boolean,
  status: string,
  roomType: RoomType
}