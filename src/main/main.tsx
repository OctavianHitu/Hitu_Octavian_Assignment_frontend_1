import { Route, Routes } from "react-router-dom";
import { DeviceProvider } from "../components/context/deviceList";
import { MeasurementProvider } from "../components/context/measurementList";
import { UserProvider } from "../components/context/userList";
import Header from "../components/header/header";
import ClientPage from "../pages/clientPage/clientPage";
import DevicePage from "../pages/devicePage/devicePage";
import LoginPage from "../pages/Login/loginPage";
import MeasurementPage from "../pages/measurementsPage/measurementPage";
import UserPage from "../pages/userPage/userPage";
import "./main.scss";

const Main = () => {
  return (
    <div className="main">
      <MeasurementProvider>
        <DeviceProvider>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/clientPage" element={<ClientPage/>}/>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/userPage" element={<UserPage />} />
              <Route path="/devicePage" element={<DevicePage />} />
              <Route path="/measurementPage" element={<MeasurementPage />} />
            </Routes>
          </UserProvider>
        </DeviceProvider>
      </MeasurementProvider>
    </div>
  );
};

export default Main;
