import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { addBatteryStateListener, getBatteryLevelAsync } from "expo-battery";
import ProgressCircle from "react-native-progress-circle";

const BATTERY_STATE = {
  1: "UNPLUGGED",
  2: "CHARGING",
  3: "FULL",
  0: "UNKNOWN",
};
const BatteryLevel = ({ carbonIntensityData }) => {
  let intervalId;
  const [batteryState, setBatteryState] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(0);
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

    intervalId = setInterval(async () => {
      const level = await getBatteryLevelAsync();
      setBatteryLevel(Math.floor(level * 100));
    }, 2000);

    return () => {
      batteryStateListener.remove();
      clearInterval(intervalId);
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
          marginRight: 50,
        }}
      >
        Battery State: {BATTERY_STATE[batteryState]}
      </Text>
      <View style={{ position: "absolute", top: -8, right: 0 }}>
        <ProgressCircle
          percent={batteryLevel}
          radius={15}
          borderWidth={3}
          color={
            intensityMessage.color === "red" && batteryLevel < 50
              ? "red"
              : "green"
          }
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={{ fontSize: 10 }}>{`${batteryLevel}%`}</Text>
        </ProgressCircle>
      </View>
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
