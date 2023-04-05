import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { addBatteryStateListener } from "expo-battery";
const BATTERY_STATE = {
  1: "UNPLUGGED",
  2: "CHARGING",
  3: "FULL",
  0: "UNKNOWN",
};
const BatteryLevel = ({ carbonIntensityData }) => {
  const [batteryState, setBatteryState] = useState(1);
  const [lowIntensityData, setLowIntensityData] = useState([]);
  const [intensityMessage, setIntensityMessage] = useState("");
  console.log(carbonIntensityData);
  useEffect(() => {
    if (carbonIntensityData) {
      getLowIntensityData();
    }
    const batteryStateListener = addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
      setIntensityMessage(calculateIntensityData());
    });
    return () => {
      batteryStateListener.remove();
    };
  }, []);
  const getLowIntensityData = () => {
    const cbIntLowData = carbonIntensityData.filter(
      (cb) => cb.intensity.index == "low"
    );
    setLowIntensityData(cbIntLowData);
  };
  const calculateIntensityData = () => {
    if (lowIntensityData.length < 0) {
      return "The current time is not a low intensity time period!!!";
    }
    const currentTime = new Date().getTime();
    lowIntensityData.forEach((lID) => {
      if (
        new Date(lID.from).getTime() > currentTime &&
        new Date(lID.to).getTime() < currentTime
      ) {
        return "Nice, you are at low intensity time period !!!";
      }
    });
    return "The current time is not a low intensity time period!!!";
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "green",
          paddingBottom: 10,
        }}
      >
        Battery State: {BATTERY_STATE[batteryState]}
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "green",
          paddingBottom: 10,
        }}
      >
        {" "}
        {batteryState === 2 ? intensityMessage : ""}
      </Text>
    </View>
  );
};
export default BatteryLevel;
