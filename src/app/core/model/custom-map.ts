import { Role } from "./role";
import { RoleTable } from "../../shared/service/global/role-table";

export function toRoleTable(role: Role){

  return new RoleTable(
    role.id,
    role.name.substring(5).toLowerCase()
    )
}

export function toRole(role: RoleTable){
  return new Role(
    role.id,
    `ROLE_${role.name.toUpperCase}`,
  );
}

