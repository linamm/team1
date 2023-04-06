import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import BatteryLevel from "./BatteryStatus";
import { Ionicons } from '@expo/vector-icons';
import CardView from "./CardView";

const screenWidth = Dimensions.get("window").width;

const CardThree = ({ data }) => {
  return (
    <CardView style={{marginRight: screenWidth * 0.025}}>
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
    </CardView>
  );
};

export default CardThree;
