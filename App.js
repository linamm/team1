import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  View,
} from "react-native";
import CardOne from "./CardOne";
import Header from "./Header";
import CardTwo from "./CardTwo";
import { useState, useEffect, useRef } from "react";
import CardThree from "./CardThree";
import CardFour from "./CardFour";

import "./ignorWarns";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" }
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(message)
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C"
//     });
//   }

//   return token;
// }

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
          Accept: "application/json",
        },
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
              paddingBottom: 20,
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
    justifyContent: "flex-start",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
