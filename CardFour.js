import React from "react";
import { View, Text, StyleSheet, Dimensions, Share, Button} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import CardView from "./CardView";

const screenWidth = Dimensions.get("window").width;

const CardFour = ({ data }) => {
    
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              "Simply Share Anything across all social media platforms, isn't it awesome",
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

  return (
    <CardView style={{marginLeft: screenWidth * 0.025}}>
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
      <Button onPress={onShare} title="Share" />
    </CardView>
  );
};

export default CardFour;

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