import { useContext, useState } from "react";
import { JsxEmit } from "typescript";
import { InputFormType } from "../../assets/sass/enum/enum";
import getAxiosInstance from "../../axios-service";
import { UserContext, UserOfApp } from "../context/userList";
import UpdateForm from "../form/updateFrom/updateForm";
import "./userCard.scss";

export interface UserCardComponent {
  user:UserOfApp;
}

const UserCard: React.FC<UserCardComponent> = (props): JSX.Element => {
  const { getUsers } = useContext(UserContext);

  async function deleteUser(id: string) {
    getAxiosInstance()
      .delete("/user/delete/" + id)
      .then(() => {
        getUsers();
      });
  }
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className="user-card-container">
      <div className="user-card">
        <div className="user-card-name">
          <div className="nm">Name : </div> {props.user.name}
        </div>
        <div className="rest-info">
          <div className="user-rest-row">
            <span className="rs">Email : </span> {props.user.email}
          </div>
          <div className="user-rest-row">
            <div className="rs">Role : </div> {props.user.role}
          </div>
        </div>
        <div className="btn-zone-usercard">
          <button
            className="btn-zone-one"
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            EDIT
          </button>
          <button
            className="btn-zone-one"
            onClick={() => {
              deleteUser(props.user.id);
            }}
          >
            DELETE
          </button>
        </div>
      </div>
      {showUpdateModal ? (
        <UpdateForm
           typeOfModal="User"
          userApp={props.user}
          FormType={InputFormType.User}
          onClose={() => {
            setShowUpdateModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default UserCard;
