import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import CardOne from './CardOne';
import Header from './Header';
import CardTwo from './CardTwo';
import { useState } from "react";

export default function App() {

  const [ carbonIntensityData, setCarbonIntensityData ] = useState([])


  const dateString = new Date()

  const startDate = dateString.toISOString().slice(0, -5) + "Z";
  dateString.setDate(dateString.getDate() + 5)
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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header></Header>
      <CardOne carbonIntensityData={carbonIntensityData}></CardOne>
      <CardTwo></CardTwo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
