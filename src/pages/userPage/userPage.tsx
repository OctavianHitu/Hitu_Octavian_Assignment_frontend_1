import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputFormType } from "../../assets/sass/enum/enum";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import { UserContext, UserOfApp } from "../../components/context/userList";
import InputForm from "../../components/form/inputForm";
import UserCard from "../../components/userCard/userCard";
import "./userPage.scss"


const UserPage = (): JSX.Element =>{
    const navigate = useNavigate();

    const [showModal,setShowModal]= useState(false);
    const {users,setUsers} = useContext(UserContext);
    const user: UserDecoded = getUSerFromLocal("jwt");
    let helper=false;
     if(user.role==="ADMIN"){
        helper=true;
     }else{
        navigate("/clientPage");
        
     }

    return(
        <div className="userPage-big">
            {helper?        <div className="user-page">
                <div className="user-top">
                    <div className="user-write">
                        Want to add a new user ?
                    </div>
                    <button onClick={()=>{setShowModal(true)}} className="add-user-btn">Add user</button>
                </div>
                <div className="user-bottom">
                  {users.map(
                    (user: UserOfApp)=>{
                        return(
                            <UserCard
                            key={user.id}
                            user={user}
                            />
                        )
                    }
                  )}
                    
                </div>
                {showModal?
                    <InputForm typeOfModal="User" FormType={InputFormType.User} onClose={()=>{setShowModal(false)}}/>
                    : null}
        </div>:<div>NU ESTI ADMIN!!</div>}


        </div>
    )
} 

export default UserPage;