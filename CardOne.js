
import React from 'react';
import { View, Text } from 'react-native';

const CardOne = ({ carbonIntensityData }) => {

  
  if (carbonIntensityData.length === 0) {
    return (
      <View>
        Loading Carbon Intensity Data...
      </View>
    )
  }

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Card One </Text>
      <Text style={{ fontSize: 14 }}> Card One Description </Text>
      <Text style={{ fontSize: 14 }}>intensity for the next half hour: {carbonIntensityData[0].intensity.index}</Text>
    </View>
  );
  };
  
  export default CardOne;