import { AppUser } from "core/model/app-user";
import { RoleTable } from "shared/service/global/role-table";

export class UserTable {

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public role: RoleTable,
  ){}
}