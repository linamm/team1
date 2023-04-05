import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import BatteryLevel from "./BatteryStatus";
import { Ionicons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get("window").width;

const CardThree = ({ data }) => {
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
<Ionicons name="md-leaf-outline" size={24} color="black" /><Text style= {{
    fontSize: 14,
    fontWeight: "bold"
  }}> What is carbon intensity </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "left",
          paddingBottom: 5,
          paddingLeft: 10
        }}
      >
        {" How can we minimise our carbon footprint powered by data from the Grid "}
       
      </Text>
    </View>
  );
};

export default CardThree;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: screenWidth * 0.45,

    borderRadius: 10,
    backgroundColor: "#ffffffaa",
    padding: 10,
    margin: screenWidth * 0.05,
    alignItems: "center",
  }
});
