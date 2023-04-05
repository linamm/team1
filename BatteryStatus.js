import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import {
  addBatteryLevelListener,
  addBatteryStateListener,
  getBatteryLevelAsync,
} from "expo-battery";

const BATTERY_STATE = {
  1: "UNPLUGGED",
  2: "CHARGING",
  3: "FULL",
  0: "UNKNOWN",
};

const BatteryLevel = () => {
  const [batteryState, setBatteryState] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    (async () => {
      setBatteryLevel(await getBatteryLevelAsync());
    })();

    const batteryStateListener = addBatteryStateListener((bt) => {
      console.log(bt, batteryLevel);
      setBatteryState(bt.batteryState);
    });
    return () => {
      batteryStateListener.remove();
    };
  }, [batteryState]);

  return (
    <>
      <Text>Battery State: {BATTERY_STATE[batteryState]}</Text>
      <Text>{`${Math.floor(batteryLevel * 100)}%`}</Text>
    </>
  );
};

export default BatteryLevel;
