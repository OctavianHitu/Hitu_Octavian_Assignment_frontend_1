import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { isPropertySignature, JsxEmit } from "typescript";
import { InputFormType } from "../../assets/sass/enum/enum";
import getAxiosInstance from "../../axios-service";
import { Device, DeviceContext } from "../context/deviceList";
import { MeasurementContext } from "../context/measurementList";
import { UserContext, UserOfApp } from "../context/userList";
import "./inputForm.scss"


interface InputFormComponent{
    onClose?:any;
    FormType?:InputFormType;
    typeOfModal?: string;
}
export interface Option {
    label: string;
    value: string;
  }

export function getAllUsers(data: UserOfApp[]){
    const optionUsers: Option[]=[];
    data.map((user)=>{
        optionUsers.push({value:user.email, label:user.name});
    });
    return optionUsers;
}

export function getAllDevices(data: Device[]){
    const optionaldev: Option[]=[];
    data.map((dev)=>{
        optionaldev.push({value:dev.name, label:dev.name});
    });
    return optionaldev;
}


const InputForm: React.FC<InputFormComponent> =(props): JSX.Element =>{

    //FOR USER
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[role,setRole]=useState("USER");
    const{users,getUsers}=useContext(UserContext);
    const{devices,getDevices}=useContext(DeviceContext);
    const{ measurements, setMeasurements, getMeasurements }=useContext(MeasurementContext);


    //FOR DEVICE
    const[deviceName,setDevicename]=useState("");
    const[descr,setDescr]=useState("");
    const[addr,setAddr]=useState("");
    const[energy,setEnergy]=useState(0);
    const[userEmail,setUserEmail]=useState("");

    //FOR MEASUREMENT

    const [times,setTimes]= useState("");
    const [energyC,setEnergyC]=useState(0);
    const [measDevice,setMeasDevice]=useState("");

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setRole(value);
      };

      async function saveDevice(event:any){
        const name=deviceName;
        const description=descr;
        const adress= addr;
        const energyConsuption=energy;
        let device =JSON.stringify({name,description,adress,energyConsuption,userEmail})
        event.preventDefault();
        getAxiosInstance().post("/device",device).then(()=>{
            getDevices();
        })
      }

    async function saveUser(event:any){
    let User= JSON.stringify({name,email,password,role});
    event.preventDefault();
    getAxiosInstance().post("/user",User).then(()=>{
        getUsers();
    })}

    async function saveMeas(event:any){
        const timestamp= times;
        const energyConsumption =energyC;
        const deviceName =measDevice;

        let meas= JSON.stringify({timestamp,energyConsumption,deviceName});
        event.preventDefault();
        getAxiosInstance().post("/meas",meas).then(()=>{
            getMeasurements();
        })
    }

    return(
        <div className="modal">
        <div className="add-form">
            <form className="form">
                <div className="exit-form">
                    <button onClick={props.onClose} className="exit-form-btn">EXIT</button>   
                </div>
                <div className="form-write">
                    Add a new {props.FormType}.
                </div>
                    <div >
                    {props.typeOfModal==="User"?(
                        <div className="form-inputs">
                    <input placeholder="Name"
                     onChange={(event:any)=>{setName(event.target.value)}}/>
                    <input placeholder="Email"
                     onChange={(event:any)=>{setEmail(event.target.value)}}/>
                    <input placeholder="Password"
                     onChange={(event:any)=>{setPassword(event.target.value)}}/>
                    <select className="select-input-user"
                    onChange={selectChange}
                    >
                        <option  value={"USER"}>USER</option>

                        <option value={"ADMIN"}>ADMIN</option>
                    </select>
                    </div>)
                    :
                     props.typeOfModal==="Device"?
                    (<div>
                        <div className="form-inputs">
                            <input placeholder="Name"
                             onChange={(event:any)=>{setDevicename(event.target.value)}}/>
                            <input placeholder="Description"
                             onChange={(event:any)=>{setDescr(event.target.value)}}/>
                            <input placeholder="Address"
                             onChange={(event:any)=>{setAddr(event.target.value)}}/>
                            <input type="number" placeholder="Energy Consumption"
                             onChange={(event:any)=>{setEnergy(event.target.value)}}/>
                            <Select
                            defaultInputValue=""
                            options={getAllUsers(users)}
                            onChange={(values: any) => {
                                setUserEmail(values.value);
                              }}
                            />
                        </div>
                    </div>)
                    :
                    (<div className="form-inputs">
                        <input type="Date" placeholder="Timestamp"
                         onChange={(event:any)=>{setTimes(event.target.value)}}/>
                        <input type="number" placeholder="Energy Consuption"
                         onChange={(event:any)=>{setEnergyC(event.target.value)}}/>
                        <Select  
                        defaultInputValue=""
                        options={getAllDevices(devices)}
                        onChange={(value:any)=>{
                            setMeasDevice(value.value);
                        }}
                        />

                    </div>)}        
                </div>
                <div className="btn-form-zone">
                    {props.typeOfModal==="User"?(
                    <button className="add-btn" onClick={saveUser}>Add User</button>
                    )
                    :props.typeOfModal==="Device"?(
                    <button className="add-btn" onClick={saveDevice}>Add Device</button>

                    )
                    :
                    (
                    <button className="add-btn" onClick={saveMeas}>Add</button>

                    )}
                </div>            
            </form>
        </div>
        </div>
    )
}

export default InputForm;