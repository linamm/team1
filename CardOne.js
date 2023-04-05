
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const screenWidth = Dimensions.get('window').width;

const CardOne = ({ carbonIntensityData }) => {

  
  if (!carbonIntensityData || carbonIntensityData.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Loading Carbon Intensity Data...</Text>
      </View>
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
  const dataset = carbonIntensityData.map(data => data.intensity.forecast)

  return (
    <View style={styles.card} >
    <View style={{
          flexDirection: "row",
          alignItems: "flex-start",
          alignSelf: "flex-start",
          paddingBottom: 20,
        }}><MaterialCommunityIcons name="clock-check-outline" size={24} color="black" />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Carbon Intensity Data </Text></View>
      <Text style={{ fontSize: 14 }}> Your 2 day forecast for carbon intensity </Text>
      <ScrollView horizontal>
        <BarChart 
          data={{
            labels: labels,
            datasets: [
              {
                data: dataset
              }
            ]
          }}
          width={screenWidth * 18} // from react-native
          height={240}
          chartConfig={{
            backgroundColor: "#BD0000",
            backgroundGradientFrom: "#BD0000",
            backgroundGradientTo: "#BD0000",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1, index) => {
              if (index === 1) return `rgba(0,0,0,1)`
              return `rgba(255, 255, 255, ${opacity})`
            },
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />
      </ScrollView>
    </View>
  );
  };
  
  export default CardOne;

  const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        height: 300,
        borderRadius: 10, 
        backgroundColor: "#ffffffaa",
        padding: 10,
        margin: 10,
        margin: screenWidth * 0.05
    },
  });
