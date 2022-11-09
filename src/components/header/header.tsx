
import { useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import "./header.scss"

interface HeaderComponent {}
const Header: React.FC<HeaderComponent> =(): JSX.Element =>{
    const user: UserDecoded = getUSerFromLocal("jwt");
    let helper=false;
     if(user.role==="ADMIN"){
        helper=true;
     }
     const navigate = useNavigate();

     function logout(){
        navigate("/");
        localStorage.clear();

    }

    return(
        <div>
            {helper?
            <header className="header">
            <div className="logo">
                <div className="image-logo">
                <img  style={{height: "70px"}} src={logo}/> 
                </div>
                <div className="logo-write">SD PROJECT</div>
            </div>
            <div className="navigation-and-user">
                <div className="navigator">
                    <NavLink  to="/userPage">USERS</NavLink>
                    <NavLink to="/devicePage">DEVICES</NavLink>
                    <NavLink to="/measurementPage">MEASUREMENTS</NavLink>
                </div>
                <div>
                <button className="btn-logout" onClick={()=>{
                logout();
            }}>LOG OUT</button>
                </div>
            </div>
        </header>
        :
        null}
        </div>
    )
}

export default Header;