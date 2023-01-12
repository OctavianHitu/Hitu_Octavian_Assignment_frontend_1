import { stringify } from "querystring";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { isPropertySignature, JsxEmit } from "typescript";
import { InputFormType } from "../../../assets/sass/enum/enum";
import getAxiosInstance from "../../../axios-service";
import { Device, DeviceContext } from "../../context/deviceList";
import { Measurement } from "../../context/measurementList";
import { UserContext, UserOfApp } from "../../context/userList";
import { UserCardComponent } from "../../userCard/userCard";
import { getAllUsers } from "../inputForm";

import "./updateForm.scss";

interface UpdateFormComponent {
  userApp?: UserOfApp;
  device?: Device;
  meas?:Measurement;
  onClose?: any;
  FormType?: InputFormType;
  typeOfModal?: string;
}

const UpdateForm: React.FC<UpdateFormComponent> = (props): JSX.Element => {
  const [statename, setName] = useState("");
  const [stateemail, setEmail] = useState("");
  const [statepassword, setPassword] = useState("");
  const [staterole, setRole] = useState("");
  const { users, getUsers } = useContext(UserContext);



  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRole(value);
  };
  const userAux: UserOfApp | undefined = props.userApp;

  async function updateUser(event: any) {
    let id = userAux?.id;
    let name = userAux?.name;
    let email = userAux?.email;
    let password = userAux?.password;
    let role = userAux?.role;

    if (statename) {
      name = statename;
    }
    if (statepassword) {
      password = statepassword;
    }
    if (stateemail) {
      email = stateemail;
    }
    if (staterole) {
      role = staterole;
    }
    const usr = JSON.stringify({ id, name, email, password, role });
    event.preventDefault();
    getAxiosInstance()
      .post("/user/update", usr)
      .then(() => {
        getUsers();
      });
  }
  const [deviceName, setDevicename] = useState("");
  const [descr, setDescr] = useState("");
  const [addr, setAddr] = useState("");
  const [energy, setEnergy] = useState(0);
  const [userEmailA, setUserEmail] = useState("");
  const { getDevices } = useContext(DeviceContext);

  async function updateDevice(event:any) {
    let id= props.device?.id;
    let name=props.device?.name;
    let description =props.device?.description;
    let adress=props.device?.adress;
    let energyConsuption=props.device?.energyConsuption;
    let userEmail=props.device?.userEmail;

    if(deviceName){
      name=deviceName;
    }
    
    if(descr){
      description=descr;
    }
    if(addr){
      adress=addr;
    }
    if(energy){
      energyConsuption=energy;
    }
    if(userEmailA){
      userEmail=userEmailA;
    }

    const dev= JSON.stringify({id,name,description,adress,energyConsuption,userEmail});    
    event.preventDefault();
    getAxiosInstance()
      .post("/device/update", dev)
      .then(() => {
        getDevices();
      });
  }

  return (
    <div className="modal-update">
      <div className="update-form">
        <form className="form-update">
          <div className="exit-form-update">
            <button onClick={props.onClose} className="exit-form-btn-update">
              EXIT
            </button>
          </div>
          <div className="form-write-update">Update the {props.FormType}.</div>
          <div >
            {props.typeOfModal === "User" ? (
              <div className="form-inputs-update">
                <input
                  placeholder="Name"
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                />
                <input
                  placeholder="Email"
                  onChange={(event: any) => {
                    setEmail(event.target.value);
                  }}
                />
                <input
                  placeholder="Password"
                  onChange={(event: any) => {
                    setPassword(event.target.value);
                  }}
                />
                <select
                  className="select-input-user-update"
                  onChange={selectChange}
                >
                  <option value={"ADMIN"}>ADMIN</option>
                  <option value={"USER"}>USER</option>
                </select>
              </div>
            ) : props.typeOfModal === "Device" ? (
            
                <div className="form-inputs-update">
                  <input
                    placeholder="Name"
                    onChange={(event: any) => {
                      setDevicename(event.target.value);
                    }}
                  />
                  <input
                    placeholder="Description"
                    onChange={(event: any) => {
                      setDescr(event.target.value);
                    }}
                  />
                  <input
                    placeholder="Address"
                    onChange={(event: any) => {
                      setAddr(event.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Energy Consumption"
                    onChange={(event: any) => {
                      setEnergy(event.target.value);
                    }}
                  />
                  <Select
                    defaultInputValue=""
                    options={getAllUsers(users)}
                    onChange={(values: any) => {
                      setUserEmail(values.value);
                    }}
                  />
                </div>
              
            ) : (
              <div className="form-inputs-update">
                <input type="number" placeholder="Timestamp" />
                <input type="text" placeholder="Energy Consuption" />
                <input type="text" placeholder="Device Name" />
              </div>
            )}
          </div>
          <div className="btn-form-zone-update">
          {props.typeOfModal==="User"?(
                    <button className="add-btn-update" onClick={updateUser}>Update User</button>
                    )
                    :props.typeOfModal==="Device"?(
                    <button className="add-btn-update" onClick={updateDevice}>Update Device</button>

                    )
                    :
                    (
                    <button className="add-btn-update" >Update Measurement</button>

                    )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
