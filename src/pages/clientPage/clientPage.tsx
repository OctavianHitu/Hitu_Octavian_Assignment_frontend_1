import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import { Device, DeviceContext } from "../../components/context/deviceList";
import { MeasurementContext } from "../../components/context/measurementList";
import { UserContext } from "../../components/context/userList";
import DeviceCard from "../../components/deviceCard/deviceCard";
import UserCard from "../../components/userCard/userCard";
import "./clientPage.scss"

const ClientPage = (): JSX.Element =>{
    const navigate = useNavigate();

    const user: UserDecoded = getUSerFromLocal("jwt");
    let helper=false;
     if(user.role==="USER"){
        helper=true;
    
     }else{
        navigate("/userPage");
     }

     console.log(user);
    const {devices,setDevices,getDevices} = useContext(DeviceContext);
     
    const devs: Device[]=[];
    console.log("devices",devices)
    devices.forEach((dev:Device) => {
        if(dev.userEmail===user.email){
            devs.push(dev);
        }
        
    });

    console.log(devs);

     function logout(){
        navigate("/");
        sessionStorage.clear();

    }
    return(
        <div>
            <div className="wl-us">
            Welcome , {user.email} !
            <div>
            <button onClick={()=>{
                navigate("/chat")
            }}>CHAT</button>
            <button onClick={()=>{
                logout();
            }}>LOG OUT</button>
            </div></div>
            {helper?
            <div className="clientPage-big">
                {devs.map((dev:Device)=>{
                    return(
                        <DeviceCard key={dev.id} device={dev} isAdmin={false}/>
                    )
                })}


            </div>
            :
            <div>NU ESTI CLIENT</div>}
        </div>
    )
}

export default ClientPage;