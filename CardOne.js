
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

const screenWidth = Dimensions.get('window').width;

const CardOne = ({ carbonIntensityData }) => {

  
  if (!carbonIntensityData || carbonIntensityData.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Loading Carbon Intensity Data...</Text>
      </View>
    )
  }

  const labels = carbonIntensityData.map(data => data.to);
  const dataset = carbonIntensityData.map(data => data.intensity.forecast)

  return (
    <View style={styles.card} >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Card One </Text>
      <Text style={{ fontSize: 14 }}> Card One Description </Text>
      <ScrollView horizontal>
        <BarChart 
          data={{
            labels: labels.slice(0, 3),
            datasets: [
              {
                data: dataset.slice(0, 3)
              }
            ]
          }}
          width={screenWidth * 2} // from react-native
          height={220}
          yAxisInterval={1}
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
        backgroundColor: "red",
        padding: 10,
        margin: 10
    },
  });
