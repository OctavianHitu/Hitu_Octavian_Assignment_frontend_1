import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import getAxiosInstance from "../../axios-service";
import UserCard from "../../components/userCard/userCard";
import "./loginPage.scss"



const LoginPage =(): JSX.Element =>{

    const [email,setLoginUserName]=useState("");
    const [password,setLoginPass]=useState("");
    const navigate = useNavigate();


   async  function getLogin(event:any){
    event.preventDefault();
     const {data} = await getAxiosInstance().post("/login",JSON.stringify({email,password}));
     sessionStorage.setItem("jwt",data);

     const user: UserDecoded = getUSerFromLocal("jwt");

     if(user.role==="ADMIN"){
        navigate("/userPage")
     }else{
        if(user.role==="USER"){
            navigate("/clientPage");
        }
     }
     
    }


    return(
        <div className="login-page">
            <div className="form-container">
                <form className="form-login">
                    <div className="login-wr">
                        LOGIN
                    </div>
                        <input className="in-log" placeholder=" Insert username"
                        onChange={(event:any)=>{setLoginUserName(event.target.value)}}/>
                        <input className="in-log" type="password" placeholder=" Insert password"
                        onChange={(event:any)=>{setLoginPass(event.target.value)}}/>
                    <button className="login-button" onClick={getLogin}>Login</button>
                </form>
            </div>

        </div>
    )
}

export default LoginPage;