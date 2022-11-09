import React, { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../../axios-service";

export interface Device{
    id:string;
    name:string;
    description:string;
    adress:string;
    energyConsuption: number;
    userEmail: string;
}

export interface DeviceType{
    devices: Device[];
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}


export const DeviceContext = createContext<any>([]);

export const DeviceProvider =(props:any) =>{

    const [devices,setDevices] = useState<Device[]>([]);


    async function getDevices(){
        const {data} =  await getAxiosInstance().get("/device");
        const deviceList = data;
        setDevices(deviceList);
    }

    useEffect(()=>{
        getDevices();
    },[])

    return(
        <DeviceContext.Provider value={{devices,setDevices,getDevices}}>
            {props.children}
        </DeviceContext.Provider>

    )



}
