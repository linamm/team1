import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { addBatteryStateListener } from "expo-battery";

const BATTERY_STATE = {
  1: "UNPLUGGED",
  2: "CHARGING",
  3: "FULL",
  0: "UNKNOWN",
};

const BatteryLevel = () => {
  const [batteryState, setBatteryState] = useState(null);

  useEffect(() => {
    const batteryStateListener = addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
    });

    return () => {
      batteryStateListener.remove();
    };
  }, []);

  return <Text>Battery State: {BATTERY_STATE[batteryState]}</Text>;
};

export default BatteryLevel;
