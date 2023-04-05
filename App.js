
import BatteryStatus from "./BatteryStatus";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import CardOne from './CardOne';
import Header from './Header';
import CardTwo from './CardTwo';
import { useState } from "react";


export default function App() {

  const [ carbonIntensityData, setCarbonIntensityData ] = useState([])


  const dateString = new Date()

  const startDate = dateString.toISOString().slice(0, -5) + "Z";
  dateString.setDate(dateString.getDate() + 1)
  const endDate = dateString.toISOString().slice(0, -5) + "Z";
  const postcode = 'E9'

  fetch(`https://api.carbonintensity.org.uk/regional/intensity/${startDate}/${endDate}/postcode/${postcode}`, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    setCarbonIntensityData(res.data.data)
  })

  return (
  <ImageBackground source={require('./vodafone.jpeg')} style={styles.backgroundImage}>
      <Header></Header>
      <CardOne carbonIntensityData={carbonIntensityData}></CardOne>
      <CardTwo></CardTwo>
      <BatteryStatus />
    </ImageBackground>
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
    resizeMode: 'cover', // or 'stretch'
  },
});
