import jwt_decode from "jwt-decode";

export interface UserDecoded {
email: string;
role:string;
id:string;
}

export function getUSerFromLocal(name: string) {
  const jwt = sessionStorage.getItem(name || "");
  const splitted = jwt ? jwt.split(",",3) : "";
  let user: UserDecoded = { email: "", role:"", id: "" };
  user.email=splitted[0];
  user.role=splitted[1];
  user.id=splitted[2];
  return user;
}