import { useContext, useState } from "react";
import { JsxEmit } from "typescript";
import { InputFormType } from "../../assets/sass/enum/enum";
import getAxiosInstance from "../../axios-service";
import { Device, DeviceContext } from "../context/deviceList";
import UpdateForm from "../form/updateFrom/updateForm";
import "./deviceCard.scss";
export interface DeviceCardComponent {
  device: Device;
  isAdmin: boolean;
}

const DeviceCard: React.FC<DeviceCardComponent> = (props): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { getDevices } = useContext(DeviceContext);

  async function deleteDevice(id: string) {
    getAxiosInstance()
      .delete("/device/delete/" + id)
      .then(() => {
        getDevices();
      });
  }
  return (
    <div className="device-card-container">
      <div className="device-card">
        <div className="device-name">
          <div className="name">NAME : </div> {props.device.name}
        </div>
        <div className="rest-info-device">
          <div className="device-row">
            <div className="wr">Description : </div> {props.device.description}
          </div>
          <div className="device-row">
            <div className="wr">Address : </div> {props.device.adress}
          </div>
          <div className="device-row">
            <div className="wr">Energy consumption : </div>{" "}
            {props.device.energyConsuption}
          </div>
          <div className="device-row">
            <div className="wr">Owner Email : </div>
            {props.device.userEmail}
          </div>
        </div>
        <div className="button-device">
          {props.isAdmin?<button
            className="btn-device"
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            EDIT
          </button>:null}
          {props.isAdmin?<button
            className="btn-device"
            onClick={() => {
              deleteDevice(props.device.id);
            }}
          >
            DELETE
          </button>:null}
          
        </div>
      </div>
      {showUpdateModal ? (
        <UpdateForm
          typeOfModal="Device"
          device={props.device}
          FormType={InputFormType.Device}
          onClose={() => {
            setShowUpdateModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default DeviceCard;
