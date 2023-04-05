
import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const CardTwo= ({ data }) => {
    return (
      <View style={styles.card}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Card Two </Text>
        <Text style={{ fontSize: 14 }}> Card Two </Text>
      </View>
    );
  };
  
  export default CardTwo;

  const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.9,
        height: 300,
        borderRadius: 10, 
        backgroundColor: "#ffffffaa",
        padding: 10,
        margin: screenWidth * 0.05
    },
  });
