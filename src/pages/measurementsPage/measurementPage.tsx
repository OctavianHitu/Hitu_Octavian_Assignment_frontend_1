import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputFormType } from "../../assets/sass/enum/enum";
import { getUSerFromLocal, UserDecoded } from "../../assets/sass/global/userDecode";
import { Measurement, MeasurementContext } from "../../components/context/measurementList";
import InputForm from "../../components/form/inputForm";
import MeasurementCard from "../../components/measurementCard/measurementCard";
import "./measurementPage.scss"

const MeasurementPage = ():JSX.Element => {
    const [showModal,setShowModal]= useState(false);
    const {measurements,setMeasurements,getMeasurements}=useContext(MeasurementContext);
    const navigate = useNavigate();

    const user: UserDecoded = getUSerFromLocal("jwt");
    let helper=false;
     if(user.role==="ADMIN"){
        helper=true;
     }else{
        navigate("/clientPage");

     }

    return(
        <div className="measurementPage-big">
            {helper? <div className="measurement-page">
              <div className="measurement-top">
                    <div className="measurement-write">
                        Want to add a new measurement ?
                    </div>
                    <button onClick={()=>{setShowModal(true)}} className="add-measurement-btn">Add measurement</button>
                </div>
                <div className="measurement-bottom">
                {measurements.map((meas:Measurement)=>{
                    return(
                        <MeasurementCard
                        meas={meas}
                        key={meas.id}
                        />
                    )
                })}
                </div>
                {showModal?
                    <InputForm typeOfModal="Measurement" FormType={InputFormType.Measurement} onClose={()=>{setShowModal(false)}}/>
                    : null}
        </div>:<div>NU ESTI ADMIN</div>}
        </div>
       
    )
}

export default MeasurementPage;