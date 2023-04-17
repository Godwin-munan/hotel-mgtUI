export class RoomTypeTable {

  constructor(
    public id: number, 
    public name: string,
    public price: number,
    public properties: string[],
    public description: string,
    public image:BinaryType
  ){}

}