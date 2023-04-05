
import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get('window').width;

const CardOne = ({ carbonIntensityData }) => {

  
  if (!carbonIntensityData || carbonIntensityData.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Loading Carbon Intensity Data...</Text>
      </View>
    )
  }

  console.log(carbonIntensityData[0].to)

  return (
    <View style={styles.card} >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Card One </Text>
      <Text style={{ fontSize: 14 }}> Card One Description </Text>
      
      <BarChart 
        data={{
          labels: carbonIntensityData.map(data => data.to),
          datasets: [
            carbonIntensityData.map(data => data.intensity.index)
          ]
        }}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
    </View>
  );
  };
  
  export default CardOne;

  const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        height: 300,
        borderRadius: 10, 
        backgroundColor: "red",
        padding: 10,
        margin: 10
    },
  });
