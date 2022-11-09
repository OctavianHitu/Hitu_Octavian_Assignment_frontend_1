import React, { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../../axios-service";

export interface UsersType {
    users: UserOfApp[];
    setUsers: React.Dispatch<React.SetStateAction<UserOfApp[]>>;
  }
export interface UserOfApp{
    id: string;
    name: string;
    email: string;
    password:string;
    role:string;
}


export const UserContext = createContext<any>([])

export const UserProvider =(props:any) =>{
  const [users, setUsers] = useState<UserOfApp[]>([]);

  async function getUsers() {
    const {data} =await getAxiosInstance().get("/user");
    const userList=data;
    setUsers(userList);
    
  }


  useEffect(()=>{
    getUsers()
  },[])


    return(
        <UserContext.Provider value={{users,setUsers,getUsers}}>
            {props.children}
        </UserContext.Provider>
    )


}

