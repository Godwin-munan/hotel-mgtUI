import { Role } from "./role";

export interface AppUser{
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  deleted:boolean,
  roles: Role[]
}
