import { createContext, useEffect, useState } from "react";
import internal from "stream";
import getAxiosInstance from "../../axios-service";

export interface Measurement {
  id: string;
  timestamp: Date;
  energyConsumption: number;
  deviceName: string;
}

export interface MeasurementType {
  meaurement: Measurement[];
  setMeasurement: React.Dispatch<React.SetStateAction<Measurement[]>>;
}

export const MeasurementContext = createContext<any>([]);

export const MeasurementProvider = (props: any) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  async function getMeasurements() {
    const { data } = await getAxiosInstance().get("/meas");
    const measurementList = data;
    setMeasurements(measurementList);
  }

  useEffect(() => {
    getMeasurements();
  },[]);

  return (
    <MeasurementContext.Provider
      value={{ measurements, setMeasurements, getMeasurements }}
    >
      {props.children}
    </MeasurementContext.Provider>
  );
};
