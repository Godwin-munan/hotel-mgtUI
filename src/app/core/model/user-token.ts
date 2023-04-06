export interface UserToken {
  exp: number,
  first: string,
  iat: number,
  iss: string,
  last: string,
  scope: string[],
  sub: string
}

export const defaults: UserToken = {
  exp: 0,
  first: '',
  iat: 0,
  iss: '',
  last: '',
  scope: [],
  sub: ''
};