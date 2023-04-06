import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import BatteryLevel from "./BatteryStatus";

const screenWidth = Dimensions.get("window").width;

const CardTwo = ({ carbonIntensityData }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          alignSelf: "flex-start",
          paddingBottom: 20,
        }}
      >
        <Feather name="battery-charging" size={24} color="black" />
        <Text style={styles.title}> Your next green charge window</Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          paddingBottom: 10,
        }}
      >
        {" "}
        Charge now
      </Text>
      <Text style={{ fontSize: 12, textAlign: "center", paddingBottom: 10 }}>
        {" "}
        until{" "}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          paddingBottom: 10,
        }}
      >
        {" "}
        19:00{" "}
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
      </Text>
      <BatteryLevel carbonIntensityData={carbonIntensityData} />
      <View style={{ flexDirection: "row", textAlign: "center" }}>
        <Entypo name="location-pin" size={24} color="black" />

        <Text style={{ fontSize: 12 }}> Borough London</Text>
      </View>
    </View>
  );
};

export default CardTwo;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: screenWidth * 0.9,
    borderRadius: 10,
    backgroundColor: "#ffffffaa",
    padding: 10,
    margin: screenWidth * 0.05,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
