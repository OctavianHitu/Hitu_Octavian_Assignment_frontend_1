import { useContext, useState } from "react";
import { InputFormType } from "../../assets/sass/enum/enum";
import getAxiosInstance from "../../axios-service";
import { Measurement, MeasurementContext } from "../context/measurementList";
import UpdateForm from "../form/updateFrom/updateForm";
import "./measurementCard.scss";

export interface MeasurementCardComponent {
  meas: Measurement;
}

const MeasurementCard: React.FC<MeasurementCardComponent> = (
  props
): JSX.Element => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { measurements, getMeasurements } = useContext(MeasurementContext);

  async function deleteMeasurement(id: string) {
    getAxiosInstance()
      .delete("/meas/delete/" + id)
      .then(() => {
        getMeasurements();
      });
  }

  return (
    <div className="meas-card-container">
      <div className="meas-card">
        <div className="meas-card-name">
          <div className="ms">Measurement for: </div> {props.meas.deviceName}
        </div>
        <div className="rest-info-meas">
          <div className="meas-rest-row">
            <div className="rs"> Timestamp :</div>
          </div>
          <div className="meas-rest-row">
            <div className="rs"> Energy consumption : </div>{" "}
            {props.meas.energyConsumption}
          </div>
        </div>
        <div className="btn-zone-meas">
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
              deleteMeasurement(props.meas.id);
            }}
          >
            DELETE
          </button>
        </div>
      </div>
      {showUpdateModal ? (
        <UpdateForm
          typeOfModal="Measurement"
          meas={props.meas}
          FormType={InputFormType.Measurement}
          onClose={() => {
            setShowUpdateModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default MeasurementCard;
