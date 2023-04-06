import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ToastAndroid } from 'react-native';
import { StackedBarChart } from "react-native-chart-kit";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import CardView from './CardView';

const screenWidth = Dimensions.get('window').width;

const CardTwo = ({ carbonIntensityData }) => {

  if (!carbonIntensityData || carbonIntensityData.length === 0) {
      return (
          <CardView>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Loading Carbon Intensity Data...</Text>
          </CardView>
      )
  }

  const labels = carbonIntensityData.map((data, index) => {
    const now = new Date(data.to);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hour = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const formattedTime = `${hour}:${minutes}`;
    if (index === 0 || formattedTime === "00:00") return `${day}/${month} ${hour}:${minutes}`
    return formattedTime
  });
  const dataset = carbonIntensityData.map(data => {
  
    if (data.intensity.forecast <= 39) return [ data.intensity.forecast ] // Very Low

    if (data.intensity.forecast <= 119) {
      return [ 39, data.intensity.forecast - 39 ] // Low
    }

    if (data.intensity.forecast <= 199) return [ 39, 80, data.intensity.forecast - 119 ] // Medium

    return [ 39, 80, 80, data.intensity.forecast - 199 ] // High
  });

  const carbonIntensityHighAndLow = carbonIntensityData.filter(data => (new Date(data.to)).getDay() === (new Date()).getDay()).reduce((range, data) => {
    let toTime = new Date(data.to);
    let hour = ('0' + toTime.getHours()).slice(-2);
    let minutes = ('0' + toTime.getMinutes()).slice(-2);
    toTime = `${hour}:${minutes}`

    let fromTime = new Date(data.from);
    hour = ('0' + fromTime.getHours()).slice(-2);
    minutes = ('0' + fromTime.getMinutes()).slice(-2);
    fromTime = `${hour}:${minutes}`

    if (range[0].toTime === undefined || range[0].value < data.intensity.forecast) range[0] = { toTime, fromTime, value: data.intensity.forecast };
    if (range[1].toTime === undefined || range[1].value > data.intensity.forecast) range[1] = { toTime, fromTime, value: data.intensity.forecast };
    return range;
  }, [{}, {}])

  const data = {
    labels,
    legend: ["Carbon Intensity"],
    data: dataset,
    barColors: ["#00d700", "#94a200", "#ba6500", "#bd0000"]
  };

  setTimeout(() => ToastAndroid.show(`Looks like around ${carbonIntensityHighAndLow[1].fromTime}-${carbonIntensityHighAndLow[1].toTime} would be the best time to charge today`, ToastAndroid.LONG), 30000);
  

  return (
    <View style={styles.card} >
      <View style={{
            flexDirection: "row",
            alignItems: "flex-start",
            alignSelf: "flex-start",
            paddingBottom: 20,
          }}>
        <MaterialCommunityIcons name="clock-check-outline" size={24} color="black" />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Carbon Intensity Data </Text>
      </View>
      <Text style={{ fontSize: 14 }}> Your 2 day forecast for carbon intensity </Text>
      <ScrollView horizontal>
        <StackedBarChart
          data={data}
          width={screenWidth * 20}
          height={240}
          chartConfig={{
            backgroundColor: "rgba(0,0,0,0)",
            backgroundGradientToOpacity: 0,
            backgroundGradientFromOpacity: 0,
            barPercentage: 1,
            color: () => "#000000"
          }}
        />
      </ScrollView>
      
      <Text style={{ fontSize: 14 }}>Today's High and Low Carbon Intensity</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'green' }}><AntDesign name="arrowdown" size={14} color="green" />{carbonIntensityHighAndLow[1].value} {carbonIntensityHighAndLow[1].fromTime}-{carbonIntensityHighAndLow[1].toTime}</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'red' }}><AntDesign name="arrowup" size={14} color="red" />{carbonIntensityHighAndLow[0].value} {carbonIntensityHighAndLow[0].fromTime}-{carbonIntensityHighAndLow[0].toTime}</Text>
      <Text style={{ fontSize: 12 }}>Use this as a guide to decide when to use power in your region to minimise your environmental impact</Text>

    </View>
  );
};
  
export default CardTwo;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    height: 400,
    borderRadius: 10,
    backgroundColor: "#ffffffaa",
    padding: 10,
    margin: 10,
    margin: screenWidth * 0.05
  }
});
