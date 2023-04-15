import { Role } from "./role";

export class AppUser{
  

  constructor(
  public id: number,
  public firstName: string,
  public lastName: string,
  public username: string,
  public password: string,
  public roles: Role[]
  ){}
}
