import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { InputFormType } from "../../assets/sass/enum/enum";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import { Device, DeviceContext } from "../../components/context/deviceList";
import DeviceCard from "../../components/deviceCard/deviceCard";
import InputForm from "../../components/form/inputForm";
import "./devicePage.scss"



const DevicePage = (): JSX.Element =>{
    const navigate = useNavigate();

    const [showModal,setShowModal]= useState(false);
    const {devices,setDevices,getDevices} = useContext(DeviceContext);
    console.log(devices);
    const user: UserDecoded = getUSerFromLocal("jwt");
    let helper=false;
     if(user.role==="ADMIN"){
        helper=true;
     }else{
        navigate("/clientPage");
     }


    return(
        <div className="devicePage-big">
            {helper?
              <div className="device-page">
              <div className="device-top">
                  <div className="device-write">
                      Insert a new device. <button onClick={()=>{setShowModal(true)}}  className="add-device-btn">Add Device</button>
                  </div> 
              </div>
              <div className="device-bottom">
                  {devices.map((device:Device)=>{
                      return(
                          <DeviceCard 
                          isAdmin={true}
                          key={device.id}
                          device={device}
                          />
                      )
                  })}
              </div>
              {showModal?
                      <InputForm typeOfModal="Device" FormType={InputFormType.Device} onClose={()=>{setShowModal(false)}}/>
                      : null}
  
          </div>:<div>NU ESTI ADMIN</div>}
        </div>
      
    )
} 

export default DevicePage;