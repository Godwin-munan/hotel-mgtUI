import { RoomTypeTable } from "./room-type-table";

export class RoomTable {
  
  constructor(
    public id: number,
    public code: string,
    public status: string,
    public roomType: RoomTypeTable
  ){}
}