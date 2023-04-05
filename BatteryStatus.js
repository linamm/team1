import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  const [intensityMessage, setIntensityMessage] = useState({
    msg: "",
    color: "green",
  });
  const [upcomingLowIntensityTime, setUpcomingLowIntensityTime] = useState({});
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
    calculateIntensityData(cbIntLowData);
    if (cbIntLowData.length > 0) {
      const currentTime = new Date().getTime();
      cbIntLowData.forEach((lID) => {
        if (new Date(lID.from).getTime() > currentTime) {
          setUpcomingLowIntensityTime({
            startDate: lID.from,
            endDate: lID.to,
          });
        }
        return;
      });
    }
  };

  const calculateIntensityData = (data = []) => {
    if (data.length < 0) {
      return {
        msg: `You are not yet currenlty in an optimum 
        green charging window for your region`,
        color: "red",
      };
    }
    const currentTime = new Date().getTime();
    data.forEach((lID) => {
      if (
        new Date(lID.from).getTime() > currentTime &&
        new Date(lID.to).getTime() < currentTime
      ) {
        return {
          msg: `You are currenlty in an optimum
           green charging window for your region`,
          color: "green",
        };
      }
    });
    return {
      msg: `You are not yet currenlty in an optimum 
      green charging window for your region`,
      color: "red",
    };
  };
  const style = styles(intensityMessage.color).viewStyle;
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
      <View style={{ flexDirection: "row" }}>
        <Text style={style}> {intensityMessage.msg}</Text>
      </View>
    </View>
  );
};
const styles = (color) =>
  StyleSheet.create({
    viewStyle: {
      color: color,
      fontSize: 12,
      textAlign: "center",
      paddingBottom: 10,
      flex: 1,
      flexWrap: "wrap",
    },
  });
export default BatteryLevel;
