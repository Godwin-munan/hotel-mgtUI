import { AppUser } from "core/model/app-user";

export interface AuthState{
  user: AppUser | undefined,
  token: string | undefined,
  isAuthenticated: boolean,
  isloading: boolean,
  errorMsg: string | undefined,
}