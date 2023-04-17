import { Role } from "./role";
import { RoleTable } from "../../shared/service/global/role-table";
import { RoomTypeTable } from "room/room-type-table";
import { RoomType } from "./room-type";

export function toRoleTable(role: Role){

  return new RoleTable(
    role.id,
    role.name.substring(5).toLowerCase()
    )
}

export function toRole(role: RoleTable){
  return new Role(
    role.id,
    `ROLE_${role.name.toUpperCase()}`,
  );

}

export function toRoomType(room: RoomTypeTable){

  let pro = '';

  room.properties.map(property => {
    pro = pro.concat(`${property}, `);
    console.log(pro)
  })

  return new RoomType(
    room.id,
    room.name,
    room.price,
    pro,
    room.description,
    room.image
  );
}

export function toRoomTypeTable(room: RoomType){

  let properties = room.property.split(',').map(property =>{
    return property.trimStart();
  })

  return new RoomTypeTable(
    room.id,
    room.name,
    room.price,
    properties,
    room.description,
    room.image
  );
}


