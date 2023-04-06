import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  View
} from "react-native";
import CardOne from "./CardOne";
import Header from "./Header";
import CardTwo from "./CardTwo";
import { useState, useEffect, useRef } from "react";
import CardThree from "./CardThree";
import CardFour from "./CardFour";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function App() {
  const [carbonIntensityData, setCarbonIntensityData] = useState([]);

  const dateString = new Date();

  const startDate = dateString.toISOString().slice(0, -5) + "Z";
  dateString.setDate(dateString.getDate() + 5);
  const endDate = dateString.toISOString().slice(0, -5) + "Z";
  const postcode = "E9";
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    fetch(
      `https://api.carbonintensity.org.uk/regional/intensity/${startDate}/${endDate}/postcode/${postcode}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setCarbonIntensityData(res.data.data);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("./vodafone.jpeg")}
          style={styles.backgroundImage}
        >
          <Header></Header>
          <CardOne carbonIntensityData={carbonIntensityData}></CardOne>
          <CardTwo carbonIntensityData={carbonIntensityData}></CardTwo>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              alignSelf: "flex-start",
              paddingBottom: 20
            }}
          >
            <CardThree />
            <CardFour />
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  }
});
